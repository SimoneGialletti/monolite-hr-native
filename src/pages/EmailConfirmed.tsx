import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, withRepeat } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { TextComponent } from '@/components/ui/text';
import { supabase } from '@/integrations/supabase/client';
import { colors, spacing, borderRadius, goldGlowIntense } from '@/theme';

export default function EmailConfirmed() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [checking, setChecking] = useState(true);

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 700 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    }, 100);

    // Pulse animation
    pulseScale.value = withRepeat(
      withTiming(1.1, { duration: 2000 }),
      -1,
      true
    );

    checkCompanyInvitation();
  }, []);

  const checkCompanyInvitation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setChecking(false);
        return;
      }

      const { data: userCompany, error } = await supabase
        .from('user_companies')
        .select('id, role_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking user company:', error);
        setChecking(false);
        return;
      }

      setChecking(false);

      if (!userCompany) {
        setTimeout(() => {
          // PendingInvitation is inside MainStack, so navigate through Main
          navigation.reset({
            index: 0,
            routes: [{
              name: 'Main',
              state: {
                routes: [{ name: 'PendingInvitation' }],
              },
            }],
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error in checkCompanyInvitation:', error);
      setChecking(false);
    }
  };

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Animated Checkmark */}
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <Animated.View style={[styles.pulseContainer, pulseAnimatedStyle]}>
            <Icon name="check-circle" size={96} color={colors.gold} />
          </Animated.View>
        </Animated.View>

        {/* Thank You Message */}
        <Animated.View style={[styles.textContainer, contentAnimatedStyle]}>
          <TextComponent variant="h1" style={styles.title}>
            {t('emailConfirmed.thankYou')}
          </TextComponent>
          <TextComponent variant="body" style={styles.message}>
            {t('emailConfirmed.successMessage')}
          </TextComponent>
        </Animated.View>

        {/* Continue Button */}
        <Animated.View style={[styles.buttonContainer, contentAnimatedStyle]}>
          <Button
            onPress={() => {
              // User is already authenticated after email verification
              // Navigate to Main which will check for company association
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            }}
            style={styles.continueButton}
          >
            <TextComponent variant="body" style={styles.buttonText}>
              {t('emailConfirmed.continue')}
            </TextComponent>
          </Button>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    marginBottom: spacing.xl,
    position: 'relative',
  },
  pulseContainer: {
    ...goldGlowIntense,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  title: {
    color: colors.foreground,
    textAlign: 'center',
  },
  message: {
    color: colors.mutedForeground,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    paddingTop: spacing.md,
  },
  continueButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    ...goldGlowIntense,
  },
  buttonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
    fontSize: 18,
  },
});
