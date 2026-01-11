import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TextComponent } from '@/components/ui/text';
import { Loading } from '@/components/ui/loading';
import { supabase } from '@/integrations/supabase/client';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';

type InvitationStatus = 'loading' | 'valid' | 'invalid' | 'expired' | 'accepted' | 'rejected' | 'error';

interface InvitationData {
  invitation_id: string;
  email: string;
  name: string;
  surname: string;
  company_id: string;
  role_id: string;
  role_display_name: string | null;
  invited_by_full_name: string | null;
  status: string | null;
  is_expired: boolean | null;
  expires_at: string | null;
  days_until_expiry: number | null;
}

interface CompanyData {
  id: string;
  name: string;
}

export default function AcceptInvitation() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const token = route.params?.token;

  const [invitationStatus, setInvitationStatus] = useState<InvitationStatus>('loading');
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setInvitationStatus('invalid');
        setErrorMessage(t('acceptInvitation.errors.noToken'));
        return;
      }

      try {
        const { data, error } = await supabase
          .from('v_worker_invitations')
          .select('*')
          .eq('invitation_token', token)
          .maybeSingle();

        if (error) {
          console.error('Error fetching invitation:', error);
          setInvitationStatus('error');
          setErrorMessage(t('acceptInvitation.errors.fetchError'));
          return;
        }

        if (!data) {
          setInvitationStatus('invalid');
          setErrorMessage(t('acceptInvitation.errors.invalidToken'));
          return;
        }

        const status = data.status || data.computed_status;

        if (status === 'accepted') {
          setInvitationStatus('accepted');
          setErrorMessage(t('acceptInvitation.errors.alreadyAccepted'));
          return;
        }

        if (status === 'rejected' || status === 'cancelled') {
          setInvitationStatus('rejected');
          setErrorMessage(t('acceptInvitation.errors.noLongerValid'));
          return;
        }

        if (data.is_expired) {
          setInvitationStatus('expired');
          setErrorMessage(t('acceptInvitation.errors.expired'));
          return;
        }

        setInvitation({
          invitation_id: data.invitation_id!,
          email: data.email!,
          name: data.name!,
          surname: data.surname!,
          company_id: data.company_id!,
          role_id: data.role_id!,
          role_display_name: data.role_display_name,
          invited_by_full_name: data.invited_by_full_name,
          status: status,
          is_expired: data.is_expired,
          expires_at: data.expires_at,
          days_until_expiry: data.days_until_expiry,
        });

        if (data.company_id) {
          const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .select('id, name')
            .eq('id', data.company_id)
            .single();

          if (!companyError && companyData) {
            setCompany(companyData);
          }
        }

        setInvitationStatus('valid');
      } catch (err) {
        console.error('Unexpected error:', err);
        setInvitationStatus('error');
        setErrorMessage(t('acceptInvitation.errors.unexpected'));
      }
    };

    validateToken();
  }, [token, t]);

  const handleSubmit = async () => {
    if (!invitation) return;

    if (!password || password.length < 6) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('auth.passwordMinLength'),
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('acceptInvitation.errors.passwordMismatch'),
      });
      return;
    }

    if (!acceptTerms) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('auth.mustAcceptTerms'),
      });
      return;
    }

    if (!acceptPrivacy) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('auth.mustAcceptPrivacy'),
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: invitation.email,
        password,
        options: {
          data: {
            name: invitation.name,
            surname: invitation.surname,
            invitation_token: token,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          Toast.show({
            type: 'error',
            text1: t('common.error'),
            text2: t('acceptInvitation.errors.emailInUse'),
          });
        } else {
          throw error;
        }
        return;
      }

      if (data.user) {
        Toast.show({
          type: 'success',
          text1: t('common.success'),
          text2: t('acceptInvitation.success'),
        });

        navigation.navigate('ConfirmEmail', { email: invitation.email });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error.message || t('acceptInvitation.errors.registrationFailed'),
      });
    } finally {
      setLoading(false);
    }
  };

  if (invitationStatus === 'loading') {
    return (
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <CardContent style={styles.loadingContent}>
            <Loading size="large" message={t('acceptInvitation.validating')} />
          </CardContent>
        </Card>
      </SafeAreaView>
    );
  }

  if (invitationStatus !== 'valid') {
    const getErrorIcon = () => {
      switch (invitationStatus) {
        case 'expired':
          return <Icon name="clock-outline" size={32} color="#FF9500" />;
        case 'accepted':
          return <Icon name="check-circle" size={32} color="#34C759" />;
        case 'rejected':
          return <Icon name="close-circle" size={32} color={colors.destructive} />;
        default:
          return <Icon name="alert-circle" size={32} color={colors.destructive} />;
      }
    };

    const getErrorTitle = () => {
      switch (invitationStatus) {
        case 'expired':
          return t('acceptInvitation.errors.expiredTitle');
        case 'accepted':
          return t('acceptInvitation.errors.acceptedTitle');
        case 'rejected':
          return t('acceptInvitation.errors.rejectedTitle');
        default:
          return t('acceptInvitation.errors.invalidTitle');
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={[styles.card, styles.errorCard]}>
            <CardHeader style={styles.header}>
              <View style={styles.iconContainer}>
                <View style={styles.errorIconCircle}>
                  {getErrorIcon()}
                </View>
              </View>
              <CardTitle>
                <TextComponent variant="h2" style={styles.title}>
                  {getErrorTitle()}
                </TextComponent>
              </CardTitle>
              <CardDescription>
                <TextComponent variant="body" style={styles.errorMessage}>
                  {errorMessage}
                </TextComponent>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.errorContent}>
                {invitationStatus === 'accepted' && (
                  <TextComponent variant="caption" style={styles.hint}>
                    {t('acceptInvitation.alreadyAcceptedHint')}
                  </TextComponent>
                )}
                {invitationStatus === 'expired' && (
                  <TextComponent variant="caption" style={styles.hint}>
                    {t('acceptInvitation.expiredHint')}
                  </TextComponent>
                )}
                <Button
                  onPress={() => navigation.navigate('Auth')}
                  style={styles.button}
                >
                  {t('acceptInvitation.goToLogin')}
                </Button>
              </View>
            </CardContent>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
                <Icon name="account-plus" size={32} color={colors.primary} />
              </View>
            </View>
            <CardTitle>
              <TextComponent variant="h2" style={styles.title}>
                {t('acceptInvitation.title')}
              </TextComponent>
            </CardTitle>
            <CardDescription>
              <TextComponent variant="body" style={styles.subtitle}>
                {t('acceptInvitation.subtitle')}
              </TextComponent>
            </CardDescription>
          </CardHeader>

          <CardContent style={styles.content}>
            {/* Invitation Details */}
            <View style={styles.detailsSection}>
              <DetailRow
                label={t('acceptInvitation.company')}
                value={company?.name || 'N/A'}
                icon="office-building"
              />
              <DetailRow
                label={t('acceptInvitation.role')}
                value={invitation.role_display_name || 'N/A'}
                icon="briefcase"
              />
              {invitation.invited_by_full_name && (
                <DetailRow
                  label={t('acceptInvitation.invitedBy')}
                  value={invitation.invited_by_full_name}
                  icon="account"
                />
              )}
              {invitation.days_until_expiry !== null && (
                <DetailRow
                  label={t('acceptInvitation.expiresIn', { days: invitation.days_until_expiry })}
                  value=""
                  icon="clock-outline"
                />
              )}
            </View>

            {/* Registration Form */}
            <View style={styles.form}>
              <Input
                label={t('auth.email')}
                value={invitation.email}
                editable={false}
                style={styles.disabledInput}
              />
              <View>
                <Input
                  label={t('auth.password')}
                  placeholder={t('auth.minPassword')}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
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
                onPress={handleSubmit}
                loading={loading}
                style={styles.submitButton}
              >
                {t('acceptInvitation.createAccount')}
              </Button>

              <Pressable
                onPress={() => navigation.navigate('Auth')}
                style={styles.loginLink}
              >
                <TextComponent variant="body" style={styles.loginLinkText}>
                  {t('acceptInvitation.alreadyHaveAccount')}
                </TextComponent>
              </Pressable>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow: React.FC<{ label: string; value: string; icon: string }> = ({
  label,
  value,
  icon,
}) => (
  <View style={detailRowStyles.row}>
    <Icon name={icon} size={20} color={colors.gold} />
    <View style={detailRowStyles.textContainer}>
      <TextComponent variant="caption" style={detailRowStyles.label}>
        {label}
      </TextComponent>
      <TextComponent variant="body" style={detailRowStyles.value}>
        {value}
      </TextComponent>
    </View>
  </View>
);

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
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    ...goldGlow,
  },
  errorCard: {
    borderColor: colors.destructive + '80',
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.lg,
  },
  iconContainer: {
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
  errorIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.destructive + '20',
    borderWidth: 2,
    borderColor: colors.destructive + '50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
  content: {
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  detailsSection: {
    backgroundColor: colors.muted + '50',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  disabledInput: {
    opacity: 0.6,
  },
  eyeButton: {
    position: 'absolute',
    right: spacing.md,
    top: 40,
    padding: spacing.xs,
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
    marginTop: spacing.sm,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginLinkText: {
    color: colors.gold,
  },
  loadingContent: {
    paddingVertical: spacing['3xl'],
  },
  errorContent: {
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  errorMessage: {
    textAlign: 'center',
    color: colors.mutedForeground,
  },
  hint: {
    textAlign: 'center',
    color: colors.mutedForeground,
  },
  button: {
    width: '100%',
  },
});

const detailRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.foreground,
    fontWeight: '600',
  },
});
