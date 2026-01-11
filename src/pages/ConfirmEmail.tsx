import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { TextComponent } from '@/components/ui/text';
import { supabase } from '@/integrations/supabase/client';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';

export default function ConfirmEmail() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [resending, setResending] = useState(false);
  const userEmail = route.params?.email || t('confirmEmail.yourEmail');

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 700 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    }, 100);
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handleResendEmail = async () => {
    if (!route.params?.email) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('confirmEmail.emailNotFound'),
      });
      return;
    }

    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: route.params.email,
      });

      if (error) throw error;

      Toast.show({
        type: 'success',
        text1: t('confirmEmail.emailSent'),
        text2: t('confirmEmail.emailResentSuccess'),
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: error.message || t('confirmEmail.failedResendEmail'),
      });
    } finally {
      setResending(false);
    }
  };

  const handleOpenEmailApp = () => {
    Linking.openURL('https://mail.google.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Animated Email Icon */}
          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <View style={styles.iconCircle}>
              <Icon name="email-outline" size={48} color={colors.primary} />
            </View>
          </Animated.View>

          {/* Title and Message */}
          <Animated.View style={[styles.textContainer, contentAnimatedStyle]}>
            <TextComponent variant="h1" style={styles.title}>
              {t('confirmEmail.checkYourEmail')}
            </TextComponent>
            <TextComponent variant="body" style={styles.message}>
              {t('confirmEmail.sentConfirmationTo')}{' '}
              <TextComponent variant="body" style={styles.emailText}>
                {userEmail}
              </TextComponent>
              . {t('confirmEmail.clickLinkToConfirm')}
            </TextComponent>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View style={[styles.actionsContainer, contentAnimatedStyle]}>
            <Button
              onPress={handleResendEmail}
              disabled={resending}
              loading={resending}
              style={styles.resendButton}
            >
              <Icon name="email-outline" size={20} color={colors.primaryForeground} />
              <TextComponent variant="body" style={styles.buttonText}>
                {resending ? t('confirmEmail.sending') : t('confirmEmail.resendEmail')}
              </TextComponent>
            </Button>

            <Button
              variant="outline"
              onPress={handleOpenEmailApp}
              style={styles.emailAppButton}
            >
              <TextComponent variant="body" style={styles.outlineButtonText}>
                {t('confirmEmail.openEmailApp')}
              </TextComponent>
            </Button>

            <Pressable
              onPress={() => navigation.navigate('Auth')}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={16} color={colors.mutedForeground} />
              <TextComponent variant="caption" style={styles.backButtonText}>
                {t('confirmEmail.returnToLogin')}
              </TextComponent>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  content: {
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: borderRadius['2xl'],
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    ...goldGlow,
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
    lineHeight: 24,
  },
  emailText: {
    color: colors.primary,
    fontWeight: '600',
  },
  actionsContainer: {
    width: '100%',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  resendButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    ...goldGlow,
  },
  buttonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  emailAppButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary + '50',
  },
  outlineButtonText: {
    color: colors.foreground,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  backButtonText: {
    color: colors.mutedForeground,
  },
});
