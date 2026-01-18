# Module 4: Frontend Components

> **Phase**: 4 of 6
> **Status**: Not Started
> **Dependencies**: Module 3 (Frontend Hooks)

## Overview

This module covers the UI components for the notification center, including the modal, notification list items, and related UI elements.

## Component: NotificationCenter

### Purpose
Modal component displaying the user's notification history with actions.

### Location
`src/components/notifications/NotificationCenter.tsx`

### Implementation

```typescript
// src/components/notifications/NotificationCenter.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { TextComponent } from '@/components/ui/text';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { colors, spacing, borderRadius } from '@/theme';
import { NotificationItem } from './NotificationItem';

interface NotificationCenterProps {
  visible: boolean;
  onClose: () => void;
}

export function NotificationCenter({ visible, onClose }: NotificationCenterProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    refetch,
  } = useNotifications();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleNotificationPress = async (notification: Notification) => {
    // Mark as read if unread
    if (!notification.read_at) {
      await markAsRead(notification.id);
    }

    // Close modal
    onClose();

    // Navigate based on deep_link_path
    if (notification.deep_link_path) {
      const path = notification.deep_link_path;

      if (path.startsWith('/activities')) {
        navigation.navigate('MyActivities');
      } else if (path.startsWith('/settings')) {
        navigation.navigate('Settings');
      } else if (path.startsWith('/messages') || path.startsWith('/communications')) {
        navigation.navigate('Communications');
      } else if (path.startsWith('/home')) {
        navigation.navigate('Home');
      }
    }
  };

  const handleDismiss = async (notificationId: string) => {
    await dismissNotification(notificationId);
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <NotificationItem
      notification={item}
      onPress={() => handleNotificationPress(item)}
      onDismiss={() => handleDismiss(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="bell-off-outline" size={64} color={colors.mutedForeground} />
      <TextComponent variant="h3" style={styles.emptyTitle}>
        {t('notifications.noNotifications')}
      </TextComponent>
      <TextComponent variant="body" style={styles.emptyText}>
        {t('notifications.noNotificationsDesc')}
      </TextComponent>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Pressable onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.foreground} />
        </Pressable>
        <TextComponent variant="h2" style={styles.headerTitle}>
          {t('notifications.title')}
        </TextComponent>
      </View>
      <View style={styles.headerRight}>
        {unreadCount > 0 && (
          <Pressable onPress={markAllAsRead} style={styles.markAllButton}>
            <Icon name="check-all" size={20} color={colors.gold} />
            <TextComponent variant="caption" style={styles.markAllText}>
              {t('notifications.markAllRead')}
            </TextComponent>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {renderHeader()}

        {loading && notifications.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.gold} />
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={[
              styles.list,
              notifications.length === 0 && styles.listEmpty,
            ]}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={colors.gold}
                colors={[colors.gold]}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  headerTitle: {
    color: colors.foreground,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  markAllText: {
    color: colors.gold,
    marginLeft: spacing.xs,
  },
  list: {
    paddingVertical: spacing.sm,
  },
  listEmpty: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    color: colors.foreground,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  emptyText: {
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
```

---

## Component: NotificationItem

### Purpose
Individual notification row component with type-based icon and swipe-to-dismiss.

### Location
`src/components/notifications/NotificationItem.tsx`

### Implementation

```typescript
// src/components/notifications/NotificationItem.tsx
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDistanceToNow } from 'date-fns';
import { it, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { TextComponent } from '@/components/ui/text';
import { Notification } from '@/hooks/useNotifications';
import { colors, spacing, borderRadius } from '@/theme';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
  onDismiss: () => void;
}

const NOTIFICATION_ICONS: Record<string, string> = {
  request_submitted: 'file-document-outline',
  request_approved: 'check-circle-outline',
  request_rejected: 'close-circle-outline',
  announcement: 'bullhorn-outline',
  document_expiring: 'clock-alert-outline',
  document_expired: 'alert-circle-outline',
  invitation: 'account-plus-outline',
  batch_summary: 'clipboard-list-outline',
};

const NOTIFICATION_COLORS: Record<string, string> = {
  request_submitted: colors.primary,
  request_approved: colors.success,
  request_rejected: colors.destructive,
  announcement: colors.gold,
  document_expiring: colors.warning,
  document_expired: colors.destructive,
  invitation: colors.primary,
  batch_summary: colors.secondary,
};

export function NotificationItem({
  notification,
  onPress,
  onDismiss,
}: NotificationItemProps) {
  const { i18n } = useTranslation();
  const isUnread = !notification.read_at;

  const iconName = NOTIFICATION_ICONS[notification.notification_type] || 'bell-outline';
  const iconColor = isUnread
    ? NOTIFICATION_COLORS[notification.notification_type] || colors.gold
    : colors.mutedForeground;

  const locale = i18n.language === 'it' ? it : enUS;
  const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
    addSuffix: true,
    locale,
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isUnread && styles.unreadContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <TextComponent
            variant="body"
            style={[styles.title, isUnread && styles.unreadTitle]}
            numberOfLines={1}
          >
            {notification.title}
          </TextComponent>
          {isUnread && <View style={styles.unreadDot} />}
        </View>

        <TextComponent
          variant="caption"
          style={styles.body}
          numberOfLines={2}
        >
          {notification.body}
        </TextComponent>

        <TextComponent variant="caption" style={styles.time}>
          {timeAgo}
        </TextComponent>
      </View>

      <Pressable
        style={styles.dismissButton}
        onPress={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="close" size={18} color={colors.mutedForeground} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  unreadContainer: {
    backgroundColor: colors.muted + '15',
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.foreground,
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
    marginLeft: spacing.sm,
  },
  body: {
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  time: {
    color: colors.mutedForeground,
    fontSize: 12,
  },
  dismissButton: {
    padding: spacing.xs,
    marginTop: spacing.xs,
  },
});
```

---

## Component: NotificationBadge

### Purpose
Badge component showing unread count, used in AppBar.

### Location
`src/components/notifications/NotificationBadge.tsx`

### Implementation

```typescript
// src/components/notifications/NotificationBadge.tsx
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextComponent } from '@/components/ui/text';
import { useNotifications } from '@/hooks/useNotifications';
import { colors, spacing } from '@/theme';

interface NotificationBadgeProps {
  onPress: () => void;
  size?: number;
}

export function NotificationBadge({ onPress, size = 24 }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications();

  const displayCount = unreadCount > 99 ? '99+' : unreadCount.toString();

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Icon name="bell-outline" size={size} color={colors.foreground} />

      {unreadCount > 0 && (
        <View style={styles.badge}>
          <TextComponent variant="caption" style={styles.badgeText}>
            {displayCount}
          </TextComponent>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
});
```

---

## Component: NotificationPermissionPrompt

### Purpose
Prompt component to request notification permissions.

### Location
`src/components/notifications/NotificationPermissionPrompt.tsx`

### Implementation

```typescript
// src/components/notifications/NotificationPermissionPrompt.tsx
import React from 'react';
import { View, StyleSheet, Pressable, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { TextComponent } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { colors, spacing, borderRadius } from '@/theme';

interface NotificationPermissionPromptProps {
  onDismiss?: () => void;
  variant?: 'banner' | 'card';
}

export function NotificationPermissionPrompt({
  onDismiss,
  variant = 'card',
}: NotificationPermissionPromptProps) {
  const { t } = useTranslation();
  const { permissionStatus, requestPermission } = usePushNotifications();

  // Don't show if already granted or still loading
  if (permissionStatus === 'granted' || permissionStatus === 'loading') {
    return null;
  }

  const handleEnable = async () => {
    if (permissionStatus === 'denied') {
      // Permission was denied, need to open settings
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
    } else {
      await requestPermission();
    }
  };

  if (variant === 'banner') {
    return (
      <View style={styles.banner}>
        <Icon name="bell-ring-outline" size={24} color={colors.gold} />
        <View style={styles.bannerContent}>
          <TextComponent variant="body" style={styles.bannerText}>
            {t('notifications.enablePrompt')}
          </TextComponent>
        </View>
        <Button
          variant="outline"
          size="sm"
          onPress={handleEnable}
        >
          {permissionStatus === 'denied'
            ? t('notifications.openSettings')
            : t('notifications.enable')}
        </Button>
        {onDismiss && (
          <Pressable onPress={onDismiss} style={styles.dismissButton}>
            <Icon name="close" size={20} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardIconContainer}>
        <Icon name="bell-ring-outline" size={48} color={colors.gold} />
      </View>

      <TextComponent variant="h3" style={styles.cardTitle}>
        {t('notifications.stayUpdated')}
      </TextComponent>

      <TextComponent variant="body" style={styles.cardDescription}>
        {t('notifications.enableDescription')}
      </TextComponent>

      <View style={styles.cardActions}>
        <Button
          variant="default"
          onPress={handleEnable}
          style={styles.enableButton}
        >
          {permissionStatus === 'denied'
            ? t('notifications.openSettings')
            : t('notifications.enableNotifications')}
        </Button>

        {onDismiss && (
          <Button variant="ghost" onPress={onDismiss}>
            {t('common.notNow')}
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bannerContent: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  bannerText: {
    color: colors.foreground,
  },
  dismissButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  cardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gold + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  cardDescription: {
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  cardActions: {
    width: '100%',
  },
  enableButton: {
    marginBottom: spacing.sm,
  },
});
```

---

## Index Export

### Location
`src/components/notifications/index.ts`

```typescript
// src/components/notifications/index.ts
export { NotificationCenter } from './NotificationCenter';
export { NotificationItem } from './NotificationItem';
export { NotificationBadge } from './NotificationBadge';
export { NotificationPermissionPrompt } from './NotificationPermissionPrompt';
```

---

## Usage Examples

### In AppBar

```typescript
import { useState } from 'react';
import { NotificationBadge, NotificationCenter } from '@/components/notifications';

function AppBar() {
  const [notificationCenterVisible, setNotificationCenterVisible] = useState(false);

  return (
    <View style={styles.appBar}>
      {/* ... other content ... */}

      <NotificationBadge
        onPress={() => setNotificationCenterVisible(true)}
      />

      <NotificationCenter
        visible={notificationCenterVisible}
        onClose={() => setNotificationCenterVisible(false)}
      />
    </View>
  );
}
```

### Permission Prompt in Home Screen

```typescript
import { NotificationPermissionPrompt } from '@/components/notifications';

function HomeScreen() {
  const [showPrompt, setShowPrompt] = useState(true);

  return (
    <View>
      {showPrompt && (
        <NotificationPermissionPrompt
          variant="banner"
          onDismiss={() => setShowPrompt(false)}
        />
      )}
      {/* ... rest of home screen ... */}
    </View>
  );
}
```
