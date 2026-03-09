import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TextComponent } from '@/components/ui/text';
import { AppBar } from '@/components/ui/app-bar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useUserCompany } from '@/hooks/useUserCompany';
import { usePendingInvitations, PendingInvitation } from '@/hooks/usePendingInvitations';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';
import { toLocalDateString } from '@/utils/dateLocale';

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const { hasCompany, loading: companyLoading } = useUserCompany();
  const [userName, setUserName] = useState('');
  const [todayHours, setTodayHours] = useState(0);
  const [showNoCompanyDialog, setShowNoCompanyDialog] = useState(false);

  // Pending invitations
  const {
    invitations,
    loading: invitationsLoading,
    fetchInvitations,
    acceptInvitation,
    declineInvitation,
    processingId,
  } = usePendingInvitations();

  useEffect(() => {
    if (user) {
      if (user.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    }
  }, [user]);

  // Fetch pending invitations when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchInvitations(user.email || '', user.id);
      }
    }, [user])
  );

  const handleAcceptInvitation = async (invitation: PendingInvitation) => {
    if (!user) return;

    const success = await acceptInvitation(invitation, user.id);

    if (success) {
      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('invitationModal.acceptSuccess'),
      });
    }
  };

  const handleDeclineInvitation = async (invitationId: string) => {
    const success = await declineInvitation(invitationId);

    if (success) {
      Toast.show({
        type: 'info',
        text1: t('invitationModal.declineSuccess'),
      });
    }
  };

  // Refetch hours when screen comes into focus (e.g., after returning from LogHours)
  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadTodayHours(user.id);
      }
    }, [user])
  );

  const loadTodayHours = async (userId: string) => {
    try {
      const localDate = toLocalDateString(new Date());

      const { data, error } = await (supabase as any)
        .rpc('get_worker_hours_for_date', {
          p_user_id: userId,
          p_work_date: localDate,
        });

      if (error) {
        console.error("Error loading today's hours:", error);
        setTodayHours(0);
        return;
      }

      setTodayHours(data || 0);
    } catch (err) {
      console.error('Error:', err);
      setTodayHours(0);
    }
  };

  const companyRequiredPaths = ['LogHours', 'MaterialRequest', 'LeaveRequest'];

  const navigateWithCompanyCheck = (path: string, params?: any) => {
    if (companyLoading) return;
    if (companyRequiredPaths.includes(path) && !hasCompany) {
      setShowNoCompanyDialog(true);
      return;
    }
    navigation.navigate(path, params);
  };

  const mainActions = [
    {
      icon: 'clock-outline',
      label: t('home.logHours'),
      description: t('home.logHoursDesc'),
      path: 'LogHours',
    },
    {
      icon: 'package-variant',
      label: t('home.materialRequest'),
      description: t('home.materialRequestDesc'),
      path: 'MaterialRequest',
    },
    {
      icon: 'calendar-outline',
      label: t('home.leaveRequest'),
      description: t('home.leaveRequestDesc'),
      path: 'LeaveRequest',
    },
  ];

  return (
    <>
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <TextComponent variant="h3" style={styles.title}>
              {t('home.title')}, {userName}
            </TextComponent>
            <TextComponent variant="caption" style={styles.subtitle}>
              {t('home.subtitle')}
            </TextComponent>
          </View>
        </View>

        {/* Pending Invitations Section */}
        {invitations.length > 0 && (
          <Card style={styles.invitationsCard}>
            <CardHeader>
              <View style={styles.invitationsHeader}>
                <Icon name="email-outline" size={24} color={colors.gold} />
                <TextComponent variant="h3" style={styles.invitationsTitle}>
                  {t('invitationModal.title')}
                </TextComponent>
              </View>
            </CardHeader>
            <CardContent style={styles.invitationsContent}>
              {invitationsLoading ? (
                <ActivityIndicator size="small" color={colors.gold} />
              ) : (
                invitations.map((invitation) => (
                  <View key={invitation.invitation_id} style={styles.invitationItem}>
                    <View style={styles.invitationInfo}>
                      <TextComponent variant="body" style={styles.invitationCompany}>
                        {invitation.company_name}
                      </TextComponent>
                      <TextComponent variant="caption" style={styles.invitationRole}>
                        {invitation.role_display_name || t('invitationModal.role')}
                      </TextComponent>
                      {invitation.invited_by_full_name && (
                        <TextComponent variant="caption" style={styles.invitationInvitedBy}>
                          {t('invitationModal.invitedBy')}: {invitation.invited_by_full_name}
                        </TextComponent>
                      )}
                      {invitation.days_until_expiry !== null && (
                        <TextComponent variant="caption" style={styles.invitationExpiry}>
                          {t('invitationModal.daysLeft', { count: invitation.days_until_expiry })}
                        </TextComponent>
                      )}
                    </View>
                    <View style={styles.invitationActions}>
                      <Pressable
                        style={[
                          styles.invitationButton,
                          styles.acceptButton,
                          processingId === invitation.invitation_id && styles.buttonDisabled,
                        ]}
                        onPress={() => handleAcceptInvitation(invitation)}
                        disabled={processingId === invitation.invitation_id}
                      >
                        {processingId === invitation.invitation_id ? (
                          <ActivityIndicator size="small" color={colors.primaryForeground} />
                        ) : (
                          <Icon name="check" size={20} color={colors.primaryForeground} />
                        )}
                      </Pressable>
                      <Pressable
                        style={[
                          styles.invitationButton,
                          styles.declineButton,
                          processingId === invitation.invitation_id && styles.buttonDisabled,
                        ]}
                        onPress={() => handleDeclineInvitation(invitation.invitation_id)}
                        disabled={processingId === invitation.invitation_id}
                      >
                        <Icon name="close" size={20} color={colors.destructive} />
                      </Pressable>
                    </View>
                  </View>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Daily Hours Indicator */}
        <Pressable
          onPress={() => navigateWithCompanyCheck('LogHours', { initialDate: new Date().toISOString() })}
        >
          <Card style={styles.hoursCard}>
            <View style={styles.hoursContainer}>
              <View style={styles.hoursRow}>
                <TextComponent variant="h1" style={styles.hoursText}>
                  {todayHours.toFixed(1)}
                </TextComponent>
                <TextComponent variant="h3" style={styles.hoursUnit}>
                  h
                </TextComponent>
              </View>
              <TextComponent variant="caption" style={styles.hoursLabel}>
                {t('home.todaysHours')}
              </TextComponent>
              {todayHours > 8 && (
                <View style={styles.overtimeButton}>
                  <TextComponent variant="caption" style={styles.overtimeText}>
                    {t('logHours.overtime')}: {(todayHours - 8).toFixed(1)}h
                  </TextComponent>
                </View>
              )}
            </View>
          </Card>
        </Pressable>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          {mainActions.map((action) => (
            <Pressable
              key={action.path}
              onPress={() => {
                if (action.path === 'LogHours') {
                  navigateWithCompanyCheck('LogHours', { initialDate: new Date().toISOString() });
                } else {
                  navigateWithCompanyCheck(action.path);
                }
              }}
              style={styles.actionCard}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <Icon name={action.icon} size={32} color={colors.gold} />
                </View>
                <View style={styles.actionText}>
                  <TextComponent variant="h4" style={styles.actionTitle}>
                    {action.label}
                  </TextComponent>
                  <TextComponent variant="caption" style={styles.actionDescription}>
                    {action.description}
                  </TextComponent>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* My Activities Card */}
        <Card style={styles.activitiesCard}>
          <CardHeader>
            <View style={styles.activitiesHeader}>
              <Icon name="file-document-outline" size={24} color={colors.gold} />
              <TextComponent variant="h3" style={styles.activitiesTitle}>
                {t('myActivities.title')}
              </TextComponent>
            </View>
          </CardHeader>
          <CardContent>
            <Pressable
              style={styles.activitiesButton}
              onPress={() => navigation.navigate('MyActivities')}
            >
              <Icon name="clipboard-list" size={20} color={colors.gold} />
              <TextComponent variant="body" style={styles.activitiesButtonText}>
                {t('myActivities.title')}
              </TextComponent>
            </Pressable>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>

    {/* No Company Dialog */}
    <AlertDialog open={showNoCompanyDialog} onOpenChange={setShowNoCompanyDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('noCompany.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('noCompany.message')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onPress={() => setShowNoCompanyDialog(false)}>
            {t('noCompany.close')}
          </AlertDialogCancel>
          <AlertDialogAction onPress={() => {
            setShowNoCompanyDialog(false);
            Linking.openURL('https://monolite-building.lovable.app/');
          }}>
            {t('noCompany.createCompany')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: 100, // Space for blurred app bar
    paddingBottom: spacing['3xl'], // Space for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerText: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    color: colors.foreground,
    marginBottom: spacing.xs,
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.mutedForeground,
    fontSize: 14,
    marginBottom: 0,
  },
  hoursCard: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  hoursContainer: {
    alignItems: 'center',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  hoursText: {
    fontSize: 60,
    fontWeight: '700',
    color: colors.gold,
  },
  hoursUnit: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.gold + 'CC',
    marginLeft: spacing.xs,
  },
  hoursLabel: {
    color: colors.mutedForeground,
    marginTop: spacing.sm,
  },
  overtimeButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gold,
    borderRadius: borderRadius.full,
  },
  overtimeText: {
    color: colors.primaryForeground,
    fontWeight: '600',
  },
  actionsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius['2xl'],
    padding: spacing.lg,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionIconContainer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  actionDescription: {
    color: colors.mutedForeground,
  },
  activitiesCard: {
    marginBottom: spacing.lg,
  },
  activitiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  activitiesTitle: {
    color: colors.foreground,
  },
  activitiesButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    gap: spacing.sm,
  },
  activitiesButtonText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '600',
  },
  // Invitation styles
  invitationsCard: {
    marginBottom: spacing.xl,
    borderColor: colors.gold,
    borderWidth: 1,
  },
  invitationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  invitationsTitle: {
    color: colors.gold,
  },
  invitationsContent: {
    gap: spacing.md,
  },
  invitationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  invitationInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  invitationCompany: {
    fontWeight: '600',
    color: colors.foreground,
  },
  invitationRole: {
    color: colors.mutedForeground,
  },
  invitationInvitedBy: {
    color: colors.mutedForeground,
    fontSize: 12,
  },
  invitationExpiry: {
    color: colors.gold,
    fontSize: 12,
  },
  invitationActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  invitationButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: colors.gold,
  },
  declineButton: {
    backgroundColor: colors.muted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
