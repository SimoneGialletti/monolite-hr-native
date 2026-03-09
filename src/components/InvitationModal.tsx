import React from 'react';
import { View, StyleSheet, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TextComponent } from './ui/text';
import { colors, spacing, borderRadius, goldGlow } from '@/theme';
import { PendingInvitation } from '@/hooks/usePendingInvitations';

interface InvitationModalProps {
  visible: boolean;
  invitations: PendingInvitation[];
  loading: boolean;
  processingId: string | null;
  onAccept: (invitation: PendingInvitation) => void;
  onDecline: (invitationId: string) => void;
}

export const InvitationModal: React.FC<InvitationModalProps> = ({
  visible,
  invitations,
  loading,
  processingId,
  onAccept,
  onDecline,
}) => {
  const { t } = useTranslation();

  if (!visible || invitations.length === 0) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Card style={styles.modalCard}>
          <CardHeader style={styles.header}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Icon name="office-building" size={32} color={colors.primary} />
              </View>
            </View>
            <CardTitle>
              <TextComponent variant="h2" style={styles.title}>
                {t('invitationModal.title')}
              </TextComponent>
            </CardTitle>
            <TextComponent variant="body" style={styles.subtitle}>
              {t('invitationModal.subtitle')}
            </TextComponent>
          </CardHeader>

          <CardContent style={styles.content}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <TextComponent variant="body" style={styles.loadingText}>
                  {t('common.loading')}
                </TextComponent>
              </View>
            ) : (
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {invitations.map((invitation) => (
                  <InvitationCard
                    key={invitation.invitation_id}
                    invitation={invitation}
                    isProcessing={processingId === invitation.invitation_id}
                    onAccept={() => onAccept(invitation)}
                    onDecline={() => onDecline(invitation.invitation_id)}
                  />
                ))}
              </ScrollView>
            )}
          </CardContent>
        </Card>
      </View>
    </Modal>
  );
};

interface InvitationCardProps {
  invitation: PendingInvitation;
  isProcessing: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const InvitationCard: React.FC<InvitationCardProps> = ({
  invitation,
  isProcessing,
  onAccept,
  onDecline,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.invitationCard}>
      {/* Company Name */}
      <View style={styles.companyHeader}>
        <Icon name="domain" size={24} color={colors.gold} />
        <TextComponent variant="h3" style={styles.companyName}>
          {invitation.company_name}
        </TextComponent>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <DetailRow
          icon="briefcase"
          label={t('invitationModal.role')}
          value={invitation.role_display_name || '-'}
        />
        {invitation.invited_by_full_name && (
          <DetailRow
            icon="account"
            label={t('invitationModal.invitedBy')}
            value={invitation.invited_by_full_name}
          />
        )}
        {invitation.days_until_expiry !== null && invitation.days_until_expiry >= 0 && (
          <DetailRow
            icon="clock-outline"
            label={t('invitationModal.expiresIn')}
            value={t('invitationModal.daysLeft', { count: invitation.days_until_expiry })}
            isWarning={invitation.days_until_expiry <= 3}
          />
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          variant="outline"
          size="sm"
          onPress={onDecline}
          disabled={isProcessing}
          style={styles.declineButton}
        >
          {isProcessing ? t('invitationModal.declining') : t('invitationModal.decline')}
        </Button>
        <Button
          size="sm"
          onPress={onAccept}
          disabled={isProcessing}
          loading={isProcessing}
          style={styles.acceptButton}
        >
          {isProcessing ? t('invitationModal.accepting') : t('invitationModal.accept')}
        </Button>
      </View>
    </View>
  );
};

interface DetailRowProps {
  icon: string;
  label: string;
  value: string;
  isWarning?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value, isWarning }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} size={18} color={isWarning ? '#FF9500' : colors.mutedForeground} />
    <TextComponent variant="caption" style={styles.detailLabel}>
      {label}:
    </TextComponent>
    <TextComponent
      variant="body"
      style={[styles.detailValue, isWarning && styles.warningText]}
    >
      {value}
    </TextComponent>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    maxWidth: 480,
    width: '100%',
    maxHeight: '90%',
    borderWidth: 2,
    borderColor: colors.primary,
    ...goldGlow,
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
    color: colors.mutedForeground,
    marginTop: spacing.sm,
  },
  content: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.mutedForeground,
  },
  scrollView: {
    maxHeight: 400,
  },
  scrollContent: {
    gap: spacing.md,
  },
  invitationCard: {
    backgroundColor: colors.muted + '50',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  companyName: {
    flex: 1,
    color: colors.foreground,
  },
  detailsContainer: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailLabel: {
    color: colors.mutedForeground,
  },
  detailValue: {
    flex: 1,
    color: colors.foreground,
    fontWeight: '500',
  },
  warningText: {
    color: '#FF9500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  declineButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1,
  },
});
