# Module 5: Frontend Screens

> **Phase**: 5 of 6
> **Status**: Not Started
> **Dependencies**: Module 4 (Frontend Components)

## Overview

This module covers the integration of notification components into existing screens, including AppBar updates, Settings page notifications tab, and deep linking configuration.

## Update: AppBar Component

### Location
`src/components/ui/app-bar.tsx`

### Changes
Add notification badge and center modal integration.

### Implementation

```typescript
// src/components/ui/app-bar.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Pressable, StatusBar, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TextComponent } from './text';
import { NotificationBadge, NotificationCenter } from '@/components/notifications';
import { colors, spacing } from '@/theme';

interface AppBarProps {
  title?: string;
  showMenu?: boolean;
  showNotifications?: boolean;
  rightContent?: React.ReactNode;
}

export function AppBar({
  title,
  showMenu = true,
  showNotifications = true,
  rightContent,
}: AppBarProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [notificationCenterVisible, setNotificationCenterVisible] = useState(false);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotificationPress = () => {
    setNotificationCenterVisible(true);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <BlurView
        style={[styles.container, { paddingTop: insets.top }]}
        blurType="dark"
        blurAmount={20}
        reducedTransparencyFallbackColor={colors.background}
      >
        <View style={styles.content}>
          {/* Left section */}
          <View style={styles.leftSection}>
            {showMenu && (
              <Pressable onPress={handleMenuPress} style={styles.iconButton}>
                <Icon name="menu" size={24} color={colors.foreground} />
              </Pressable>
            )}
            {title && (
              <TextComponent variant="h3" style={styles.title}>
                {title}
              </TextComponent>
            )}
          </View>

          {/* Right section */}
          <View style={styles.rightSection}>
            {rightContent}
            {showNotifications && (
              <NotificationBadge onPress={handleNotificationPress} />
            )}
          </View>
        </View>
      </BlurView>

      {/* Notification Center Modal */}
      <NotificationCenter
        visible={notificationCenterVisible}
        onClose={() => setNotificationCenterVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: spacing.xs,
  },
  title: {
    color: colors.foreground,
    marginLeft: spacing.sm,
  },
});
```

---

## Create: NotificationSettings Component

### Location
`src/components/settings/NotificationSettings.tsx`

### Implementation

```typescript
// src/components/settings/NotificationSettings.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextComponent } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import {
  useNotificationPreferences,
  NotificationPreferences,
} from '@/hooks/useNotificationPreferences';
import { NotificationPermissionPrompt } from '@/components/notifications';
import { colors, spacing, borderRadius } from '@/theme';

interface SettingRowProps {
  icon: string;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

function SettingRow({
  icon,
  label,
  description,
  value,
  onValueChange,
  disabled = false,
}: SettingRowProps) {
  return (
    <View style={[styles.settingRow, disabled && styles.settingRowDisabled]}>
      <View style={styles.settingIconContainer}>
        <Icon
          name={icon}
          size={20}
          color={disabled ? colors.mutedForeground : colors.foreground}
        />
      </View>
      <View style={styles.settingContent}>
        <TextComponent
          variant="body"
          style={[styles.settingLabel, disabled && styles.settingLabelDisabled]}
        >
          {label}
        </TextComponent>
        {description && (
          <TextComponent variant="caption" style={styles.settingDescription}>
            {description}
          </TextComponent>
        )}
      </View>
      <Switch
        checked={value}
        onCheckedChange={onValueChange}
        disabled={disabled}
      />
    </View>
  );
}

export function NotificationSettings() {
  const { t } = useTranslation();
  const { permissionStatus } = usePushNotifications();
  const { preferences, loading, updatePreference } = useNotificationPreferences();

  const isPushDisabled = !preferences.push_enabled || permissionStatus !== 'granted';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  const handleToggle = (
    key: keyof NotificationPreferences,
    value: boolean
  ) => {
    updatePreference(key, value);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Permission prompt if not granted */}
      {permissionStatus !== 'granted' && (
        <NotificationPermissionPrompt variant="card" />
      )}

      {/* Master Push Toggle */}
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <TextComponent variant="h3" style={styles.sectionTitle}>
            {t('notifications.settings.pushNotifications')}
          </TextComponent>

          <SettingRow
            icon="bell-ring-outline"
            label={t('notifications.settings.enablePush')}
            description={t('notifications.settings.enablePushDesc')}
            value={preferences.push_enabled}
            onValueChange={(value) => handleToggle('push_enabled', value)}
            disabled={permissionStatus !== 'granted'}
          />
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <TextComponent variant="h3" style={styles.sectionTitle}>
            {t('notifications.settings.notificationTypes')}
          </TextComponent>

          <SettingRow
            icon="check-circle-outline"
            label={t('notifications.settings.requestApproved')}
            description={t('notifications.settings.requestApprovedDesc')}
            value={preferences.notify_request_approved}
            onValueChange={(value) => handleToggle('notify_request_approved', value)}
            disabled={isPushDisabled}
          />

          <SettingRow
            icon="close-circle-outline"
            label={t('notifications.settings.requestRejected')}
            description={t('notifications.settings.requestRejectedDesc')}
            value={preferences.notify_request_rejected}
            onValueChange={(value) => handleToggle('notify_request_rejected', value)}
            disabled={isPushDisabled}
          />

          <SettingRow
            icon="bullhorn-outline"
            label={t('notifications.settings.announcements')}
            description={t('notifications.settings.announcementsDesc')}
            value={preferences.notify_announcements}
            onValueChange={(value) => handleToggle('notify_announcements', value)}
            disabled={isPushDisabled}
          />

          <SettingRow
            icon="clock-alert-outline"
            label={t('notifications.settings.documentExpiring')}
            description={t('notifications.settings.documentExpiringDesc')}
            value={preferences.notify_document_expiring}
            onValueChange={(value) => handleToggle('notify_document_expiring', value)}
            disabled={isPushDisabled}
          />
        </CardContent>
      </Card>

      {/* Manager Settings (conditionally shown) */}
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <TextComponent variant="h3" style={styles.sectionTitle}>
            {t('notifications.settings.managerSettings')}
          </TextComponent>

          <SettingRow
            icon="clipboard-list-outline"
            label={t('notifications.settings.dailySummary')}
            description={t('notifications.settings.dailySummaryDesc')}
            value={preferences.batch_notifications_enabled}
            onValueChange={(value) =>
              handleToggle('batch_notifications_enabled', value)
            }
            disabled={isPushDisabled}
          />

          {preferences.batch_notifications_enabled && (
            <View style={styles.timePickerContainer}>
              <Icon
                name="clock-outline"
                size={20}
                color={colors.mutedForeground}
              />
              <TextComponent variant="body" style={styles.timeLabel}>
                {t('notifications.settings.summaryTime')}
              </TextComponent>
              <TextComponent variant="body" style={styles.timeValue}>
                {preferences.batch_notification_time || '08:00'}
              </TextComponent>
              {/* TODO: Add time picker modal */}
            </View>
          )}
        </CardContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingVertical: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  cardContent: {
    padding: spacing.md,
  },
  sectionTitle: {
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingRowDisabled: {
    opacity: 0.5,
  },
  settingIconContainer: {
    width: 32,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: spacing.sm,
    marginRight: spacing.md,
  },
  settingLabel: {
    color: colors.foreground,
  },
  settingLabelDisabled: {
    color: colors.mutedForeground,
  },
  settingDescription: {
    color: colors.mutedForeground,
    marginTop: 2,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingLeft: 32 + spacing.sm,
  },
  timeLabel: {
    color: colors.mutedForeground,
    marginLeft: spacing.sm,
    flex: 1,
  },
  timeValue: {
    color: colors.gold,
    fontWeight: '600',
  },
});
```

---

## Update: Settings Page

### Location
`src/pages/Settings.tsx`

### Changes
Add "Notifications" tab to the existing tabs.

### Implementation Diff

```typescript
// In Settings.tsx, add to imports:
import { NotificationSettings } from '@/components/settings/NotificationSettings';

// Add to the tabs array (after existing tabs):
const TABS = [
  { key: 'profile', label: t('settings.tabs.profile'), icon: 'account-outline' },
  { key: 'documents', label: t('settings.tabs.documents'), icon: 'file-document-outline' },
  { key: 'notifications', label: t('settings.tabs.notifications'), icon: 'bell-outline' }, // NEW
  { key: 'preferences', label: t('settings.tabs.preferences'), icon: 'cog-outline' },
];

// Add to the tab content rendering:
{activeTab === 'notifications' && <NotificationSettings />}
```

---

## i18n Translations

### English (`src/i18n/locales/en.json`)

Add to existing file:

```json
{
  "notifications": {
    "title": "Notifications",
    "noNotifications": "No notifications",
    "noNotificationsDesc": "You're all caught up! New notifications will appear here.",
    "markAllRead": "Mark all read",
    "enablePrompt": "Enable notifications to stay updated",
    "enable": "Enable",
    "openSettings": "Open Settings",
    "stayUpdated": "Stay Updated",
    "enableDescription": "Get notified about request approvals, important announcements, and document expirations.",
    "enableNotifications": "Enable Notifications",
    "settings": {
      "pushNotifications": "Push Notifications",
      "enablePush": "Enable Push Notifications",
      "enablePushDesc": "Receive notifications on your device",
      "notificationTypes": "Notification Types",
      "requestApproved": "Request Approved",
      "requestApprovedDesc": "When your requests are approved",
      "requestRejected": "Request Not Approved",
      "requestRejectedDesc": "When your requests are not approved",
      "announcements": "Announcements",
      "announcementsDesc": "Company announcements and news",
      "documentExpiring": "Document Expiring",
      "documentExpiringDesc": "When your documents are about to expire",
      "managerSettings": "Manager Settings",
      "dailySummary": "Daily Summary",
      "dailySummaryDesc": "Receive a daily summary of pending items",
      "summaryTime": "Summary Time"
    }
  },
  "settings": {
    "tabs": {
      "profile": "Profile",
      "documents": "Documents",
      "notifications": "Notifications",
      "preferences": "Preferences"
    }
  },
  "common": {
    "notNow": "Not Now"
  }
}
```

### Italian (`src/i18n/locales/it.json`)

Add to existing file:

```json
{
  "notifications": {
    "title": "Notifiche",
    "noNotifications": "Nessuna notifica",
    "noNotificationsDesc": "Sei aggiornato! Le nuove notifiche appariranno qui.",
    "markAllRead": "Segna tutte come lette",
    "enablePrompt": "Abilita le notifiche per restare aggiornato",
    "enable": "Abilita",
    "openSettings": "Apri Impostazioni",
    "stayUpdated": "Resta Aggiornato",
    "enableDescription": "Ricevi notifiche su approvazioni richieste, annunci importanti e scadenze documenti.",
    "enableNotifications": "Abilita Notifiche",
    "settings": {
      "pushNotifications": "Notifiche Push",
      "enablePush": "Abilita Notifiche Push",
      "enablePushDesc": "Ricevi notifiche sul tuo dispositivo",
      "notificationTypes": "Tipi di Notifica",
      "requestApproved": "Richiesta Approvata",
      "requestApprovedDesc": "Quando le tue richieste vengono approvate",
      "requestRejected": "Richiesta Non Approvata",
      "requestRejectedDesc": "Quando le tue richieste non vengono approvate",
      "announcements": "Annunci",
      "announcementsDesc": "Annunci e novità aziendali",
      "documentExpiring": "Documento in Scadenza",
      "documentExpiringDesc": "Quando i tuoi documenti stanno per scadere",
      "managerSettings": "Impostazioni Manager",
      "dailySummary": "Riepilogo Giornaliero",
      "dailySummaryDesc": "Ricevi un riepilogo giornaliero delle attività in sospeso",
      "summaryTime": "Orario Riepilogo"
    }
  },
  "settings": {
    "tabs": {
      "profile": "Profilo",
      "documents": "Documenti",
      "notifications": "Notifiche",
      "preferences": "Preferenze"
    }
  },
  "common": {
    "notNow": "Non Ora"
  }
}
```

---

## Deep Linking Configuration

### iOS Configuration

#### `ios/MonoliteHRNative/Info.plist`

Add URL schemes and universal links:

```xml
<!-- URL Schemes -->
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.monolite.hr</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>monolite-hr</string>
    </array>
  </dict>
</array>

<!-- Universal Links (optional - requires Apple Developer setup) -->
<key>com.apple.developer.associated-domains</key>
<array>
  <string>applinks:monolite.hr</string>
</array>
```

### Android Configuration

#### `android/app/src/main/AndroidManifest.xml`

Add intent filters to MainActivity:

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask"
  android:exported="true"
  ...>

  <!-- Existing intent-filter -->
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>

  <!-- Deep Link Intent Filter -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="monolite-hr" />
  </intent-filter>

  <!-- Universal Links (optional) -->
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
      android:scheme="https"
      android:host="monolite.hr"
      android:pathPrefix="/app" />
  </intent-filter>
</activity>
```

### React Navigation Linking Config

#### `src/navigation/linking.ts`

Create new file:

```typescript
// src/navigation/linking.ts
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: ['monolite-hr://', 'https://monolite.hr/app'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          MyActivities: 'activities',
          Communications: 'messages',
          Settings: 'settings',
        },
      },
      LogHours: 'log-hours',
      MaterialRequest: 'material-request',
      LeaveRequest: 'leave-request',
    },
  },
};
```

#### Update `src/navigation/AppNavigator.tsx`

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './linking';

// In the component:
<NavigationContainer linking={linking}>
  {/* ... rest of navigation */}
</NavigationContainer>
```

---

## Initialize Push Notifications

### Update `App.tsx` or main entry

```typescript
// At the top level of your app (App.tsx or AppNavigator.tsx)
import { usePushNotifications } from '@/hooks/usePushNotifications';

function AppContent() {
  // Initialize push notification handlers
  usePushNotifications();

  return (
    // ... your app content
  );
}
```

This ensures:
- Permission status is checked on app start
- FCM token is registered when permissions are granted
- Notification tap handlers are set up
- Deep linking is ready to handle notification navigation
