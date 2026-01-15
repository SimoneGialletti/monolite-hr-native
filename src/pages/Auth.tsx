import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectOption } from '@/components/ui/select';
import { CitySearchInput } from '@/components/ui/city-search-input';
import { TextComponent } from '@/components/ui/text';
import { supabase } from '@/integrations/supabase/client';
import { colors, spacing, borderRadius } from '@/theme';
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
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCityLabel, setSelectedCityLabel] = useState<string>('');

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

  // Search cities function using RPC for better fuzzy matching
  const searchCities = async (query: string) => {
    try {
      console.log('Searching cities with query:', query);
      const { data, error } = await supabase
        .rpc('search_cities', {
          search_query: query,
          result_limit: 20,
        });

      if (error) {
        console.error('Supabase error searching cities:', error);
        return [];
      }

      console.log('Cities search results:', data?.length || 0, 'results');

      if (data && data.length > 0) {
        return data.map((city: any) => ({
          label: city.full_location_name || city.city_name,
          value: city.id.toString(),
        }));
      }
      return [];
    } catch (error: any) {
      if (error?.name === 'AbortError' || error?.message?.includes('aborted')) {
        return [];
      }
      console.error('Error searching cities:', error);
      return [];
    }
  };

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

  const handleAppleSignIn = async () => {
    // TODO: Implement Apple Sign In
    // This would typically use @invertase/react-native-apple-authentication
    // or a similar library to trigger the Apple sign-in flow
    Toast.show({
      type: 'info',
      text1: 'Apple Sign In',
      text2: 'Apple Sign In will be implemented soon',
    });
  };

  const segmentedOptions = [
    { value: 'signin', label: t('auth.signIn') },
    { value: 'signup', label: t('auth.signUp') },
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Icon name="hard-hat" size={40} color={colors.foreground} />
              </View>
            </View>

            {/* Title */}
            <TextComponent variant="h1" style={styles.title}>
              {t('auth.title')}
            </TextComponent>

            {/* Subtitle */}
            <TextComponent variant="body" style={styles.subtitle}>
              {t('auth.subtitle')}
            </TextComponent>

            {/* Segmented Control */}
            <View style={styles.segmentedControlContainer}>
              <SegmentedControl
                value={activeTab}
                onValueChange={setActiveTab}
                options={segmentedOptions}
              />
            </View>

            {/* Form */}
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
                <View style={styles.passwordContainer}>
                  <View style={styles.passwordLabelRow}>
                    <TextComponent variant="body" style={styles.passwordLabel}>
                      {t('auth.password')}
                    </TextComponent>
                    <Pressable onPress={handleResetPassword}>
                      <TextComponent variant="body" style={styles.forgotPasswordLink}>
                        {t('auth.forgotPassword')}
                      </TextComponent>
                    </Pressable>
                  </View>
                  <Input
                    placeholder={t('auth.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    rightIcon={
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                          name={showPassword ? 'eye-off' : 'eye'}
                          size={20}
                          color={colors.mutedForeground}
                        />
                      </Pressable>
                    }
                    containerStyle={styles.passwordInputContainer}
                  />
                </View>
                <Button
                  onPress={handleSignIn}
                  loading={loading}
                  style={styles.submitButton}
                  textStyle={styles.signInButtonText}
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
                <View style={styles.passwordContainer}>
                  <TextComponent variant="body" style={styles.passwordLabel}>
                    {t('auth.password')}
                  </TextComponent>
                  <Input
                    placeholder={t('auth.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    rightIcon={
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                          name={showPassword ? 'eye-off' : 'eye'}
                          size={20}
                          color={colors.mutedForeground}
                        />
                      </Pressable>
                    }
                    containerStyle={styles.passwordInputContainer}
                  />
                </View>
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
                <CitySearchInput
                  label={t('auth.city')}
                  placeholder={t('auth.searchCity')}
                  value={selectedCity}
                  onValueChange={(value, label) => {
                    setSelectedCity(value);
                    setSelectedCityLabel(label || '');
                  }}
                  onSearch={searchCities}
                  selectedCityLabel={selectedCityLabel}
                />
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

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <TextComponent variant="caption" style={styles.dividerText}>
                OR CONTINUE WITH
              </TextComponent>
              <View style={styles.dividerLine} />
            </View>

            {/* Apple Sign In Button */}
            <Button
              onPress={handleAppleSignIn}
              variant="ghost"
              style={styles.appleButton}
            >
              <Icon name="apple" size={20} color={colors.foreground} style={styles.appleIcon} />
              <TextComponent variant="body" style={styles.appleButtonText}>
                Sign in with Apple
              </TextComponent>
            </Button>
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
    padding: spacing.lg,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingTop: spacing.xl,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.foreground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: colors.foreground,
    marginBottom: spacing.xs,
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.foreground,
    marginBottom: spacing.xl,
    opacity: 0.8,
  },
  segmentedControlContainer: {
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  passwordContainer: {
    marginBottom: spacing.md,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  passwordLabel: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: '500',
  },
  forgotPasswordLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  passwordInputContainer: {
    marginBottom: 0,
  },
  checkboxes: {
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  submitButton: {
    marginTop: spacing.md,
  },
  signInButtonText: {
    color: '#000000',
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.foreground,
    marginHorizontal: spacing.md,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  appleButton: {
    backgroundColor: '#000000',
    marginBottom: spacing.xl,
  },
  appleIcon: {
    marginRight: 0,
  },
  appleButtonText: {
    color: colors.foreground,
    fontWeight: '600',
    marginLeft: spacing.sm,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 20,
  },
});
