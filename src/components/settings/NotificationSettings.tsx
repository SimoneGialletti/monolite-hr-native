import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { colors, spacing } from '@/theme';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { usePushNotificationContext } from '@/components/providers/PushNotificationProvider';
import type { Database } from '@/integrations/supabase/types';

const APP_ID = 'monolite-hr';

type NotificationPreference = Database['public']['Tables']['notification_preferences']['Row'];

export function NotificationSettings() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { checkNotificationStatus, requestPermission, openNotificationSettings } =
    usePushNotificationContext();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [preferences, setPreferences] = useState<Partial<NotificationPreference>>({
    push_enabled: true,
    notify_request_approved: true,
    notify_request_rejected: true,
    notify_announcements: true,
    notify_document_expiring: true,
    batch_notifications_enabled: false,
    batch_notification_time: '08:00',
  });

  // Check notification permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      const status = await checkNotificationStatus();
      setHasPermission(status);
    };
    checkPermission();
  }, [checkNotificationStatus]);

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('notification_preferences')
          .select('*')
          .eq('user_id', user.id)
          .eq('app_id', APP_ID)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 = no rows returned
          console.error('Error fetching notification preferences:', error);
        }

        if (data) {
          setPreferences(data);
        }
      } catch (error) {
        console.error('Error fetching notification preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [user?.id]);

  // Save preferences
  const savePreferences = useCallback(
    async (newPreferences: Partial<NotificationPreference>) => {
      if (!user?.id) return;

      setSaving(true);
      try {
        const { error } = await supabase.from('notification_preferences').upsert(
          {
            user_id: user.id,
            app_id: APP_ID,
            ...newPreferences,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'user_id,app_id',
          }
        );

        if (error) {
          console.error('Error saving notification preferences:', error);
          Toast.show({
            type: 'error',
            text1: t('common.error'),
            text2: error.message,
          });
        } else {
          setPreferences(newPreferences);
          Toast.show({
            type: 'success',
            text1: t('notifications.settings.saved'),
          });
        }
      } catch (error) {
        console.error('Error saving notification preferences:', error);
      } finally {
        setSaving(false);
      }
    },
    [user?.id, t]
  );

  // Handle toggle changes
  const handleToggle = useCallback(
    (key: keyof NotificationPreference, value: boolean) => {
      const newPreferences = { ...preferences, [key]: value };
      setPreferences(newPreferences);
      savePreferences(newPreferences);
    },
    [preferences, savePreferences]
  );

  // Handle request permission
  const handleRequestPermission = useCallback(async () => {
    const granted = await requestPermission();
    setHasPermission(granted);
  }, [requestPermission]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.gold} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Permission Warning */}
      {!hasPermission && (
        <View style={styles.warningCard}>
          <Icon name="bell-off-outline" size={24} color={colors.destructive} />
          <Text style={styles.warningText}>
            {t('notifications.settings.permissionRequired')}
          </Text>
          <TouchableOpacity style={styles.enableButton} onPress={handleRequestPermission}>
            <Text style={styles.enableButtonText}>
              {t('notifications.settings.openSettings')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Push Enabled Toggle */}
      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Icon name="bell-ring-outline" size={24} color={colors.gold} />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>
              {t('notifications.settings.pushEnabled')}
            </Text>
            <Text style={styles.settingDescription}>
              {t('notifications.settings.pushEnabledDesc')}
            </Text>
          </View>
        </View>
        <Switch
          value={preferences.push_enabled ?? true}
          onValueChange={(value) => handleToggle('push_enabled', value)}
          trackColor={{ false: colors.muted, true: colors.gold }}
          thumbColor={colors.foreground}
          disabled={saving}
        />
      </View>

      {/* Individual Settings */}
      {preferences.push_enabled && (
        <>
          <View style={styles.divider} />

          {/* Approval Updates */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="check-circle-outline" size={24} color={colors.mutedForeground} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  {t('notifications.settings.notifyApprovals')}
                </Text>
                <Text style={styles.settingDescription}>
                  {t('notifications.settings.notifyApprovalsDesc')}
                </Text>
              </View>
            </View>
            <Switch
              value={
                (preferences.notify_request_approved ?? true) ||
                (preferences.notify_request_rejected ?? true)
              }
              onValueChange={(value) => {
                handleToggle('notify_request_approved', value);
                handleToggle('notify_request_rejected', value);
              }}
              trackColor={{ false: colors.muted, true: colors.gold }}
              thumbColor={colors.foreground}
              disabled={saving}
            />
          </View>

          {/* Announcements */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="bullhorn-outline" size={24} color={colors.mutedForeground} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  {t('notifications.settings.notifyAnnouncements')}
                </Text>
                <Text style={styles.settingDescription}>
                  {t('notifications.settings.notifyAnnouncementsDesc')}
                </Text>
              </View>
            </View>
            <Switch
              value={preferences.notify_announcements ?? true}
              onValueChange={(value) => handleToggle('notify_announcements', value)}
              trackColor={{ false: colors.muted, true: colors.gold }}
              thumbColor={colors.foreground}
              disabled={saving}
            />
          </View>

          {/* Document Alerts */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="file-alert-outline" size={24} color={colors.mutedForeground} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  {t('notifications.settings.notifyDocuments')}
                </Text>
                <Text style={styles.settingDescription}>
                  {t('notifications.settings.notifyDocumentsDesc')}
                </Text>
              </View>
            </View>
            <Switch
              value={preferences.notify_document_expiring ?? true}
              onValueChange={(value) => handleToggle('notify_document_expiring', value)}
              trackColor={{ false: colors.muted, true: colors.gold }}
              thumbColor={colors.foreground}
              disabled={saving}
            />
          </View>

          <View style={styles.divider} />

          {/* Batch Notifications */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="calendar-clock" size={24} color={colors.mutedForeground} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  {t('notifications.settings.batchNotifications')}
                </Text>
                <Text style={styles.settingDescription}>
                  {t('notifications.settings.batchNotificationsDesc')}
                </Text>
              </View>
            </View>
            <Switch
              value={preferences.batch_notifications_enabled ?? false}
              onValueChange={(value) => handleToggle('batch_notifications_enabled', value)}
              trackColor={{ false: colors.muted, true: colors.gold }}
              thumbColor={colors.foreground}
              disabled={saving}
            />
          </View>
        </>
      )}

      {saving && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="small" color={colors.gold} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningCard: {
    backgroundColor: `${colors.destructive}15`,
    padding: spacing.lg,
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  warningText: {
    fontSize: 14,
    color: colors.foreground,
    textAlign: 'center',
    lineHeight: 20,
  },
  enableButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  enableButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    gap: spacing.md,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: colors.mutedForeground,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },
  savingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
