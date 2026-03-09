import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, withRepeat } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { TextComponent } from '@/components/ui/text';
import { colors, spacing, goldGlowIntense } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

export default function EmailChangeConfirmed() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'EmailChangeConfirmed'>>();
  const step = route.params?.step || 'first';
  const otherEmail = route.params?.otherEmail || '';
  const isComplete = step === 'complete';

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 700 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    }, 100);

    pulseScale.value = withRepeat(
      withTiming(1.1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

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
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <Animated.View style={[styles.pulseContainer, pulseAnimatedStyle]}>
            <Icon
              name={isComplete ? 'email-check-outline' : 'email-alert-outline'}
              size={96}
              color={colors.gold}
            />
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, contentAnimatedStyle]}>
          <TextComponent variant="h1" style={styles.title}>
            {isComplete
              ? t('emailChangeConfirmed.title')
              : t('emailChangeConfirmed.firstStepTitle')}
          </TextComponent>
          <TextComponent variant="body" style={styles.message}>
            {isComplete
              ? t('emailChangeConfirmed.message')
              : t('emailChangeConfirmed.firstStepMessage')}
          </TextComponent>
          {!isComplete && otherEmail ? (
            <TextComponent variant="body" style={styles.emailHighlight}>
              {otherEmail}
            </TextComponent>
          ) : null}
        </Animated.View>

        <Animated.View style={[styles.buttonContainer, contentAnimatedStyle]}>
          <Button
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            }}
            style={styles.continueButton}
          >
            <TextComponent variant="body" style={styles.buttonText}>
              {t('emailChangeConfirmed.continue')}
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
  emailHighlight: {
    color: colors.gold,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
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
