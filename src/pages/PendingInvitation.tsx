import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextComponent } from '@/components/ui/text';
import { supabase } from '@/integrations/supabase/client';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';
import { useAuth } from '@/hooks/useAuth';
import { usePendingInvitations, PendingInvitation as InvitationType } from '@/hooks/usePendingInvitations';
import { InvitationModal } from '@/components/InvitationModal';

export default function PendingInvitation() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  // Invitation modal state
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const {
    invitations,
    loading: invitationsLoading,
    fetchInvitations,
    acceptInvitation,
    declineInvitation,
    processingId,
  } = usePendingInvitations();

  // Check for pending invitations on mount
  useEffect(() => {
    const checkInvitations = async () => {
      if (user) {
        const pendingInvitations = await fetchInvitations(user.email || '', user.id);
        if (pendingInvitations.length > 0) {
          setShowInvitationModal(true);
        }
      }
    };

    checkInvitations();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('Auth');
  };

  const handleOpenDashboard = () => {
    Linking.openURL('https://monolite-building.lovable.app/');
  };

  // Handle accepting an invitation
  const handleAcceptInvitation = async (invitation: InvitationType) => {
    if (!user) return;

    const success = await acceptInvitation(invitation, user.id);

    if (success) {
      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('invitationModal.acceptSuccess'),
      });

      // If no more invitations, close modal and navigate to Main
      if (invitations.length <= 1) {
        setShowInvitationModal(false);
        navigation.navigate('Main');
      }
    }
  };

  // Handle declining an invitation
  const handleDeclineInvitation = async (invitationId: string) => {
    const success = await declineInvitation(invitationId);

    if (success) {
      Toast.show({
        type: 'info',
        text1: t('invitationModal.declineSuccess'),
      });

      // If no more invitations, close modal (stay on this page since no company)
      if (invitations.length <= 1) {
        setShowInvitationModal(false);
      }
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
                <Icon name="office-building" size={32} color={colors.primary} />
              </View>
            </View>
            <CardTitle>
              <TextComponent variant="h2" style={styles.title}>
                {t('pendingInvitation.title')}
              </TextComponent>
            </CardTitle>
            <CardDescription>
              <TextComponent variant="body" style={styles.subtitle}>
                {t('pendingInvitation.subtitle')}
              </TextComponent>
            </CardDescription>
          </CardHeader>

          <CardContent style={styles.content}>
            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Icon name="email-outline" size={20} color={colors.primary} />
                <View style={styles.infoText}>
                  <TextComponent variant="body" style={styles.infoTitle}>
                    {t('pendingInvitation.waitingForInvitation')}
                  </TextComponent>
                  <TextComponent variant="caption" style={styles.infoDescription}>
                    {t('pendingInvitation.invitationDescription')}
                  </TextComponent>
                </View>
              </View>
            </View>

            {/* Options */}
            <View style={styles.optionsSection}>
              <TextComponent variant="caption" style={styles.optionsTitle}>
                {t('pendingInvitation.options')}
              </TextComponent>

              {/* Create Company Button */}
              <Button
                onPress={handleOpenDashboard}
                style={styles.createButton}
                size="lg"
              >
                <View style={styles.buttonContent}>
                  <Icon name="office-building" size={20} color={colors.primaryForeground} />
                  <TextComponent variant="body" style={styles.buttonText}>
                    {t('pendingInvitation.createCompany')}
                  </TextComponent>
                  <Icon name="open-in-new" size={16} color={colors.primaryForeground} />
                </View>
              </Button>
              <TextComponent variant="caption" style={styles.buttonDescription}>
                {t('pendingInvitation.createCompanyDescription')}
              </TextComponent>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <TextComponent variant="caption" style={styles.dividerText}>
                  {t('common.or')}
                </TextComponent>
                <View style={styles.dividerLine} />
              </View>

              {/* Wait for Invitation */}
              <View style={styles.waitSection}>
                <TextComponent variant="caption" style={styles.waitText}>
                  {t('pendingInvitation.waitInstructions')}
                </TextComponent>
              </View>
            </View>

            {/* Logout Button */}
            <View style={styles.logoutSection}>
              <Button variant="outline" onPress={handleLogout} style={styles.logoutButton}>
                {t('profile.logout')}
              </Button>
            </View>
          </CardContent>
        </Card>
      </ScrollView>

      {/* Pending Invitations Modal */}
      <InvitationModal
        visible={showInvitationModal}
        invitations={invitations}
        loading={invitationsLoading}
        processingId={processingId}
        onAccept={handleAcceptInvitation}
        onDecline={handleDeclineInvitation}
      />
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
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: colors.primary,
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
  title: {
    textAlign: 'center',
    color: colors.primary,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
  content: {
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  infoSection: {
    backgroundColor: colors.muted + '80',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  infoText: {
    flex: 1,
    gap: spacing.xs,
  },
  infoTitle: {
    fontWeight: '600',
  },
  infoDescription: {
    color: colors.mutedForeground,
  },
  optionsSection: {
    gap: spacing.md,
  },
  optionsTitle: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.mutedForeground,
  },
  createButton: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    flex: 1,
    color: colors.primaryForeground,
    fontWeight: '600',
  },
  buttonDescription: {
    color: colors.mutedForeground,
    paddingHorizontal: spacing.xs,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background,
    color: colors.mutedForeground,
    textTransform: 'uppercase',
  },
  waitSection: {
    backgroundColor: colors.muted + '50',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  waitText: {
    textAlign: 'center',
    color: colors.mutedForeground,
  },
  logoutSection: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logoutButton: {
    width: '100%',
  },
});
