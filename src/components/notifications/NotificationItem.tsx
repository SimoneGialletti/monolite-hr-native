import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '@/theme';
import type { Database } from '@/integrations/supabase/types';

type Notification = Database['public']['Tables']['notifications']['Row'];

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
  onMarkAsRead: () => void;
  onDelete: () => void;
}

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'request_submitted':
      return 'file-document-outline';
    case 'request_approved':
      return 'check-circle-outline';
    case 'request_rejected':
      return 'close-circle-outline';
    case 'request_pending_approval':
      return 'clock-outline';
    case 'document_expiring':
      return 'alert-circle-outline';
    case 'announcement':
      return 'bullhorn-outline';
    case 'message':
      return 'message-outline';
    default:
      return 'bell-outline';
  }
};

const getNotificationColor = (type: string): string => {
  switch (type) {
    case 'request_approved':
      return '#22C55E'; // green
    case 'request_rejected':
      return '#EF4444'; // red
    case 'document_expiring':
      return '#F59E0B'; // amber
    case 'request_pending_approval':
      return colors.gold;
    default:
      return colors.mutedForeground;
  }
};

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

export function NotificationItem({
  notification,
  onPress,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const isUnread = !notification.read_at;
  const iconName = getNotificationIcon(notification.notification_type);
  const iconColor = getNotificationColor(notification.notification_type);

  return (
    <TouchableOpacity
      style={[styles.container, isUnread && styles.unreadContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          {isUnread && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.body} numberOfLines={2}>
          {notification.body}
        </Text>

        <Text style={styles.time}>
          {formatTimeAgo(notification.created_at)}
        </Text>
      </View>

      <View style={styles.actions}>
        {isUnread && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onMarkAsRead}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="check" size={20} color={colors.mutedForeground} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="close" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  unreadContainer: {
    backgroundColor: `${colors.gold}10`,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.foreground,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
    marginLeft: 8,
  },
  body: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 20,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});
