import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextComponent } from '@/components/ui/text';
import { supabase } from '@/integrations/supabase/client';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('auth.enterEmail'),
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'monolite-hr://reset-password',
      });

      if (error) throw error;

      // Try to send custom email via Edge Function
      try {
        await supabase.functions.invoke('send-password-reset-email', {
          body: {
            email,
            resetUrl: 'monolite-hr://reset-password',
          },
        });
      } catch (functionError) {
        console.error('Error sending email via Brevo:', functionError);
        // Don't throw - we still want to show success if Supabase part worked
      }

      Toast.show({
        type: 'success',
        text1: t('auth.checkEmail'),
        text2: t('auth.resetLinkSent'),
      });

      setTimeout(() => {
        navigation.navigate('Auth');
      }, 2000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: error.message || t('auth.failedResetLink'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <CardHeader style={styles.header}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Icon name="hard-hat" size={32} color={colors.primary} />
              </View>
            </View>
            <CardTitle>
              <TextComponent variant="h1" style={styles.title}>
                {t('auth.reset')}
              </TextComponent>
            </CardTitle>
            <CardDescription>
              <TextComponent variant="body" style={styles.description}>
                Enter your email address and we'll send you a link to reset your password
              </TextComponent>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.form}>
              <Input
                label={t('auth.email')}
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                disabled={loading}
              />
              <Button
                onPress={handleResetPassword}
                loading={loading}
                style={styles.submitButton}
              >
                {loading ? t('auth.sending') : t('auth.sendResetLink')}
              </Button>
              <Button
                variant="ghost"
                onPress={() => navigation.navigate('Auth')}
                style={styles.backButton}
              >
                <Icon name="arrow-left" size={16} color={colors.foreground} />
                <TextComponent variant="body" style={styles.backButtonText}>
                  Back to Sign In
                </TextComponent>
              </Button>
            </View>
          </CardContent>
        </Card>
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
  card: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    ...goldGlow,
  },
  header: {
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + '20',
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...goldGlow,
  },
  title: {
    color: colors.foreground,
    textAlign: 'center',
  },
  description: {
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  form: {
    gap: spacing.md,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  backButtonText: {
    color: colors.foreground,
  },
});
