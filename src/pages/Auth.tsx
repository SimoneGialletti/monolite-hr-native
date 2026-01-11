import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectOption } from '@/components/ui/select';
import { TextComponent } from '@/components/ui/text';
import { supabase } from '@/integrations/supabase/client';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';
import { useAuth } from '@/hooks/useAuth';

export default function Auth() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // City search
  const [citySearch, setCitySearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);

  // Terms and Privacy Policy acceptance
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      checkUserCompany();
    }
  }, [user]);

  const checkUserCompany = async () => {
    if (!user) return;

    try {
      const { data: userCompany } = await supabase
        .from('user_companies')
        .select('id, role_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!userCompany) {
        navigation.navigate('PendingInvitation');
      } else {
        navigation.navigate('Main');
      }
    } catch (error: any) {
      if (error?.name === 'AbortError' || error?.message?.includes('aborted')) {
        return;
      }
      console.error('Error checking user company:', error);
    }
  };

  // Search cities
  useEffect(() => {
    if (citySearch.length > 2) {
      const searchCities = async () => {
        try {
          const { data, error } = await supabase
            .from('cities_search')
            .select('*')
            .or(`city_name_lower.ilike.%${citySearch.toLowerCase()}%,full_location_name_lower.ilike.%${citySearch.toLowerCase()}%`)
            .limit(10);

          if (!error && data) {
            const options: SelectOption[] = data.map((city: any) => ({
              label: city.full_location_name || city.city_name,
              value: city.id.toString(),
            }));
            setCityOptions(options);
          }
        } catch (error: any) {
          if (error?.name === 'AbortError' || error?.message?.includes('aborted')) {
            return;
          }
          console.error('Error searching cities:', error);
        }
      };
      searchCities();
    } else {
      setCityOptions([]);
    }
  }, [citySearch]);

  const handleSignUp = async () => {
    if (!email || !password || !name || !surname || !phone || !selectedCity) {
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

    if (!acceptTerms) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('auth.mustAcceptTerms'),
      });
      return;
    }

    if (!acceptPrivacy) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('auth.mustAcceptPrivacy'),
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            surname,
            phone,
            city_id: selectedCity,
          },
        },
      });

      if (error) throw error;

      // Redirect to confirm email page
      navigation.navigate('ConfirmEmail', { email });

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: error.message || t('auth.failedCreateAccount'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: t('auth.fillAllFieldsError'),
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      Toast.show({
        type: 'success',
        text1: t('auth.welcomeBack'),
        text2: t('auth.loginSuccess'),
      });

      const user = data.user;
      if (user) {
        // Check if user has a company
        const { data: userCompany } = await supabase
          .from('user_companies')
          .select('id, role_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!userCompany) {
          navigation.navigate('PendingInvitation');
        } else {
          navigation.navigate('Main');
        }
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('auth.error'),
        text2: error.message || t('auth.failedSignIn'),
      });
    } finally {
      setLoading(false);
    }
  };

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

      Toast.show({
        type: 'success',
        text1: t('auth.checkEmail'),
        text2: t('auth.resetLinkSent'),
      });
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

  const tabs = [
    { value: 'signin', label: t('auth.signIn') },
    { value: 'signup', label: t('auth.signUp') },
    { value: 'reset', label: t('auth.reset') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Card style={styles.card}>
              <CardHeader>
                <View style={styles.iconContainer}>
                  <View style={styles.iconCircle}>
                    <TextComponent variant="h2" style={styles.iconText}>
                      🏗️
                    </TextComponent>
                  </View>
                </View>
                <CardTitle>
                  <TextComponent variant="h2" style={styles.title}>
                    {t('auth.title')}
                  </TextComponent>
                </CardTitle>
                <CardDescription>
                  <TextComponent variant="body" style={styles.subtitle}>
                    {t('auth.subtitle')}
                  </TextComponent>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  tabs={tabs}
                >
                  {activeTab === 'signin' && (
                    <View style={styles.form}>
                      <Input
                        label={t('auth.email')}
                        placeholder={t('auth.emailPlaceholder')}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                      <Input
                        label={t('auth.password')}
                        placeholder={t('auth.password')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoComplete="password"
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.showPasswordButton}
                      >
                        <TextComponent variant="caption" style={styles.showPasswordText}>
                          {showPassword ? 'Hide' : 'Show'} Password
                        </TextComponent>
                      </Pressable>
                      <Button
                        onPress={handleSignIn}
                        loading={loading}
                        style={styles.submitButton}
                      >
                        {loading ? t('auth.signingIn') : t('auth.signIn')}
                      </Button>
                    </View>
                  )}

                  {activeTab === 'signup' && (
                    <View style={styles.form}>
                      <Input
                        label={t('auth.email')}
                        placeholder={t('auth.emailPlaceholder')}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                      <Input
                        label={t('auth.password')}
                        placeholder={t('auth.password')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoComplete="password"
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.showPasswordButton}
                      >
                        <TextComponent variant="caption" style={styles.showPasswordText}>
                          {showPassword ? 'Hide' : 'Show'} Password
                        </TextComponent>
                      </Pressable>
                      <Input
                        label={t('auth.name')}
                        placeholder={t('auth.namePlaceholder')}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                      />
                      <Input
                        label={t('auth.surname')}
                        placeholder={t('auth.surnamePlaceholder')}
                        value={surname}
                        onChangeText={setSurname}
                        autoCapitalize="words"
                      />
                      <Input
                        label={t('auth.phone')}
                        placeholder={t('auth.phonePlaceholder')}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                      />
                      <Input
                        label={t('auth.city')}
                        placeholder={t('auth.searchCity')}
                        value={citySearch}
                        onChangeText={setCitySearch}
                      />
                      {cityOptions.length > 0 && (
                        <Select
                          placeholder={t('auth.selectCity')}
                          value={selectedCity}
                          onValueChange={setSelectedCity}
                          options={cityOptions}
                        />
                      )}
                      <View style={styles.checkboxes}>
                        <Checkbox
                          value={acceptTerms}
                          onValueChange={setAcceptTerms}
                          label={
                            <TextComponent variant="body">
                              {t('auth.iAccept')}{' '}
                              <TextComponent
                                variant="body"
                                style={styles.link}
                                onPress={() => navigation.navigate('TermsAndConditions')}
                              >
                                {t('auth.termsAndConditions')}
                              </TextComponent>
                            </TextComponent>
                          }
                        />
                        <Checkbox
                          value={acceptPrivacy}
                          onValueChange={setAcceptPrivacy}
                          label={
                            <TextComponent variant="body">
                              {t('auth.iAccept')}{' '}
                              <TextComponent
                                variant="body"
                                style={styles.link}
                                onPress={() => navigation.navigate('PrivacyPolicy')}
                              >
                                {t('auth.privacyPolicy')}
                              </TextComponent>
                            </TextComponent>
                          }
                        />
                      </View>
                      <Button
                        onPress={handleSignUp}
                        loading={loading}
                        style={styles.submitButton}
                      >
                        {loading ? t('auth.creatingAccount') : t('auth.signUp')}
                      </Button>
                    </View>
                  )}

                  {activeTab === 'reset' && (
                    <View style={styles.form}>
                      <Input
                        label={t('auth.email')}
                        placeholder={t('auth.emailPlaceholder')}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                      <Button
                        onPress={handleResetPassword}
                        loading={loading}
                        style={styles.submitButton}
                      >
                        {loading ? t('auth.sending') : t('auth.sendResetLink')}
                      </Button>
                    </View>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  card: {
    ...goldGlow,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
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
  iconText: {
    fontSize: 32,
  },
  title: {
    textAlign: 'center',
    color: colors.gold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.mutedForeground,
  },
  form: {
    gap: spacing.md,
  },
  showPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
  },
  showPasswordText: {
    color: colors.gold,
  },
  searchInput: {
    marginTop: -spacing.md,
  },
  checkboxes: {
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  link: {
    color: colors.gold,
    textDecorationLine: 'underline',
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
