import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
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

export default function UpdatePassword() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('auth.fillAllFields'),
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('auth.passwordMinLength'),
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('auth.passwordsDoNotMatch'),
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('auth.passwordUpdated'),
      });

      await supabase.auth.signOut();
      navigation.navigate('Auth');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: error.message || t('auth.failedUpdatePassword'),
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
                {t('auth.updatePassword')}
              </TextComponent>
            </CardTitle>
            <CardDescription>
              <TextComponent variant="body" style={styles.description}>
                {t('auth.enterNewPassword')}
              </TextComponent>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.form}>
              <View>
                <Input
                  label={t('auth.newPassword')}
                  placeholder={t('auth.minPassword')}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  disabled={loading}
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={colors.mutedForeground}
                  />
                </Pressable>
              </View>
              <View>
                <Input
                  label={t('auth.confirmPassword')}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  disabled={loading}
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={colors.mutedForeground}
                  />
                </Pressable>
              </View>
              <Button
                onPress={handleUpdatePassword}
                loading={loading}
                style={styles.submitButton}
              >
                {loading ? t('auth.updating') : t('auth.updatePasswordButton')}
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
  eyeButton: {
    position: 'absolute',
    right: spacing.md,
    top: 40,
    padding: spacing.xs,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
});
