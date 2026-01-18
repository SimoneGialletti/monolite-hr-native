# Module 3: Frontend Hooks

> **Phase**: 3 of 6
> **Status**: Not Started
> **Dependencies**: Module 1 (Database Schema), Module 2 (Backend Functions)

## Overview

This module covers the React Native hooks for push notification handling and notification data management.

## Prerequisites: Firebase Setup

### Install Dependencies

```bash
npm install @react-native-firebase/app @react-native-firebase/messaging react-native-device-info

# iOS
cd ios && pod install && cd ..
```

### iOS Configuration

1. **Add capability in Xcode**:
   - Open `ios/MonoliteHRNative.xcworkspace`
   - Select target → Signing & Capabilities → + Capability → Push Notifications
   - + Capability → Background Modes → Remote notifications

2. **Add to `ios/MonoliteHRNative/AppDelegate.mm`**:

```objc
#import <Firebase.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  // ... rest of method
}
```

3. **Add `GoogleService-Info.plist`**:
   - Download from Firebase Console
   - Add to `ios/MonoliteHRNative/` via Xcode

### Android Configuration

1. **Add `google-services.json`**:
   - Download from Firebase Console
   - Place in `android/app/google-services.json`

2. **Update `android/build.gradle`**:

```gradle
buildscript {
  dependencies {
    // ... existing
    classpath 'com.google.gms:google-services:4.4.0'
  }
}
```

3. **Update `android/app/build.gradle`**:

```gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
  // ... existing
  implementation platform('com.google.firebase:firebase-bom:32.7.0')
  implementation 'com.google.firebase:firebase-messaging'
}
```

4. **Update `android/app/src/main/AndroidManifest.xml`**:

```xml
<application>
  <!-- ... existing -->

  <!-- Default notification channel -->
  <meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="monolite_hr_notifications" />

  <!-- Notification icon -->
  <meta-data
    android:name="com.google.firebase.messaging.default_notification_icon"
    android:resource="@mipmap/ic_notification" />

  <!-- Notification color -->
  <meta-data
    android:name="com.google.firebase.messaging.default_notification_color"
    android:resource="@color/notification_color" />
</application>
```

5. **Create notification channel** in `android/app/src/main/java/.../MainApplication.java`:

```java
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

@Override
public void onCreate() {
  super.onCreate();
  // ... existing

  // Create notification channel for Android 8+
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    NotificationChannel channel = new NotificationChannel(
      "monolite_hr_notifications",
      "Monolite HR Notifications",
      NotificationManager.IMPORTANCE_HIGH
    );
    channel.setDescription("Notifications from Monolite HR");

    NotificationManager manager = getSystemService(NotificationManager.class);
    manager.createNotificationChannel(channel);
  }
}
```

---

## Hook: usePushNotifications

### Purpose
Handles FCM permission requests, token registration, and notification event handling.

### Location
`src/hooks/usePushNotifications.ts`

### Implementation

```typescript
// src/hooks/usePushNotifications.ts
import { useEffect, useCallback, useRef, useState } from 'react';
import { Platform, PermissionsAndroid, AppState, AppStateStatus } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const APP_ID = 'monolite-hr';

interface NotificationData {
  notification_id?: string;
  notification_type?: string;
  entity_type?: string;
  entity_id?: string;
  deep_link_path?: string;
}

export interface UsePushNotificationsReturn {
  permissionStatus: 'granted' | 'denied' | 'not_determined' | 'loading';
  requestPermission: () => Promise<boolean>;
  fcmToken: string | null;
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp<any>>();
  const hasRegistered = useRef(false);
  const [permissionStatus, setPermissionStatus] = useState<
    'granted' | 'denied' | 'not_determined' | 'loading'
  >('loading');
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  // Check current permission status
  const checkPermission = useCallback(async () => {
    try {
      const authStatus = await messaging().hasPermission();

      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        setPermissionStatus('granted');
        return true;
      } else if (authStatus === messaging.AuthorizationStatus.DENIED) {
        setPermissionStatus('denied');
        return false;
      } else {
        setPermissionStatus('not_determined');
        return false;
      }
    } catch (error) {
      console.error('Error checking notification permission:', error);
      setPermissionStatus('not_determined');
      return false;
    }
  }, []);

  // Request notification permissions
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const granted =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        setPermissionStatus(granted ? 'granted' : 'denied');
        return granted;
      } else {
        // Android 13+ requires POST_NOTIFICATIONS permission
        if (Platform.Version >= 33) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          const granted = result === PermissionsAndroid.RESULTS.GRANTED;
          setPermissionStatus(granted ? 'granted' : 'denied');
          return granted;
        }
        setPermissionStatus('granted');
        return true;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setPermissionStatus('denied');
      return false;
    }
  }, []);

  // Register device token with Supabase
  const registerDevice = useCallback(async (token: string) => {
    if (!user || hasRegistered.current) return;

    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const deviceInfo = {
        brand: DeviceInfo.getBrand(),
        model: DeviceInfo.getModel(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        appVersion: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
      };

      const { error } = await supabase
        .from('user_devices')
        .upsert(
          {
            user_id: user.id,
            device_uuid: deviceId,
            app_id: APP_ID,
            fcm_token: token,
            platform: Platform.OS,
            push_enabled: true,
            last_active_at: new Date().toISOString(),
            device_info: deviceInfo,
          },
          {
            onConflict: 'user_id,device_uuid,app_id',
          }
        );

      if (error) {
        console.error('Error registering device:', error);
      } else {
        hasRegistered.current = true;
        setFcmToken(token);
      }
    } catch (error) {
      console.error('Error registering device:', error);
    }
  }, [user]);

  // Handle deep linking from notification
  const handleDeepLink = useCallback((data: NotificationData) => {
    const path = data.deep_link_path;

    if (!path) return;

    // Navigate based on deep link path
    if (path.startsWith('/activities')) {
      navigation.navigate('MyActivities');
    } else if (path.startsWith('/settings')) {
      navigation.navigate('Settings');
    } else if (path.startsWith('/messages') || path.startsWith('/communications')) {
      navigation.navigate('Communications');
    } else if (path.startsWith('/home')) {
      navigation.navigate('Home');
    }

    // Mark notification as read
    if (data.notification_id) {
      supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', data.notification_id)
        .then(({ error }) => {
          if (error) console.error('Error marking notification as read:', error);
        });
    }
  }, [navigation]);

  // Handle notification when app is in foreground
  const handleForegroundNotification = useCallback(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      const notification = remoteMessage.notification;
      const data = remoteMessage.data as NotificationData;

      if (notification) {
        Toast.show({
          type: 'info',
          text1: notification.title || 'Notification',
          text2: notification.body || '',
          position: 'top',
          visibilityTime: 4000,
          onPress: () => {
            Toast.hide();
            handleDeepLink(data);
          },
        });
      }
    },
    [handleDeepLink]
  );

  // Handle notification tap (background/quit state)
  const handleNotificationOpened = useCallback(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      const data = remoteMessage.data as NotificationData;
      handleDeepLink(data);
    },
    [handleDeepLink]
  );

  // Main setup effect
  useEffect(() => {
    if (!user) {
      hasRegistered.current = false;
      return;
    }

    let unsubscribeTokenRefresh: (() => void) | undefined;
    let unsubscribeOnMessage: (() => void) | undefined;
    let unsubscribeOnNotificationOpened: (() => void) | undefined;

    const setup = async () => {
      // Check initial permission
      const hasPermission = await checkPermission();

      if (!hasPermission) {
        // Don't auto-request on startup - let UI trigger this
        return;
      }

      // Get FCM token
      try {
        const token = await messaging().getToken();
        await registerDevice(token);

        // Listen for token refresh
        unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
          hasRegistered.current = false;
          await registerDevice(newToken);
        });

        // Foreground message handler
        unsubscribeOnMessage = messaging().onMessage(handleForegroundNotification);

        // Background/quit notification opened handler
        unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
          handleNotificationOpened
        );

        // Check if app was opened from a notification (cold start)
        const initialNotification = await messaging().getInitialNotification();
        if (initialNotification) {
          // Delay to ensure navigation is ready
          setTimeout(() => {
            handleNotificationOpened(initialNotification);
          }, 1000);
        }
      } catch (error) {
        console.error('Error setting up FCM:', error);
      }
    };

    setup();

    return () => {
      unsubscribeTokenRefresh?.();
      unsubscribeOnMessage?.();
      unsubscribeOnNotificationOpened?.();
    };
  }, [
    user,
    checkPermission,
    registerDevice,
    handleForegroundNotification,
    handleNotificationOpened,
  ]);

  // Update last active on app state change
  useEffect(() => {
    if (!user) return;

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        try {
          const deviceId = await DeviceInfo.getUniqueId();
          await supabase
            .from('user_devices')
            .update({ last_active_at: new Date().toISOString() })
            .eq('user_id', user.id)
            .eq('device_uuid', deviceId)
            .eq('app_id', APP_ID);
        } catch (error) {
          console.error('Error updating last active:', error);
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [user]);

  return {
    permissionStatus,
    requestPermission,
    fcmToken,
  };
}
```

---

## Hook: useNotifications

### Purpose
Fetches, subscribes to, and manages notification data for the in-app notification center.

### Location
`src/hooks/useNotifications.ts`

### Implementation

```typescript
// src/hooks/useNotifications.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const APP_ID = 'monolite-hr';
const NOTIFICATIONS_LIMIT = 50;

export interface Notification {
  id: string;
  title: string;
  body: string;
  notification_type: string;
  entity_type: string | null;
  entity_id: string | null;
  deep_link_path: string | null;
  read_at: string | null;
  dismissed_at: string | null;
  created_at: string;
  priority: string;
  metadata: Record<string, unknown>;
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  dismissNotification: (notificationId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications from database
  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    try {
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('app_id', APP_ID)
        .is('dismissed_at', null)
        .order('created_at', { ascending: false })
        .limit(NOTIFICATIONS_LIMIT);

      if (fetchError) {
        throw fetchError;
      }

      const notificationData = (data || []) as Notification[];
      setNotifications(notificationData);
      setUnreadCount(notificationData.filter((n) => !n.read_at).length);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch notifications';
      console.error('Error fetching notifications:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Mark single notification as read
  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!user) return;

      try {
        const { error: updateError } = await supabase
          .from('notifications')
          .update({ read_at: new Date().toISOString() })
          .eq('id', notificationId)
          .eq('user_id', user.id);

        if (updateError) {
          throw updateError;
        }

        // Optimistically update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId
              ? { ...n, read_at: new Date().toISOString() }
              : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error('Error marking notification as read:', err);
        // Refetch to sync state
        await fetchNotifications();
      }
    },
    [user, fetchNotifications]
  );

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('app_id', APP_ID)
        .is('read_at', null);

      if (updateError) {
        throw updateError;
      }

      // Optimistically update local state
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read_at: n.read_at || new Date().toISOString(),
        }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      await fetchNotifications();
    }
  }, [user, fetchNotifications]);

  // Dismiss (hide) a notification
  const dismissNotification = useCallback(
    async (notificationId: string) => {
      if (!user) return;

      try {
        const { error: updateError } = await supabase
          .from('notifications')
          .update({ dismissed_at: new Date().toISOString() })
          .eq('id', notificationId)
          .eq('user_id', user.id);

        if (updateError) {
          throw updateError;
        }

        // Remove from local state
        setNotifications((prev) => {
          const notification = prev.find((n) => n.id === notificationId);
          const newNotifications = prev.filter((n) => n.id !== notificationId);

          // Update unread count if dismissed notification was unread
          if (notification && !notification.read_at) {
            setUnreadCount((count) => Math.max(0, count - 1));
          }

          return newNotifications;
        });
      } catch (err) {
        console.error('Error dismissing notification:', err);
        await fetchNotifications();
      }
    },
    [user, fetchNotifications]
  );

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Real-time subscription for new notifications
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;

          // Only add if it's for our app
          if (newNotification.app_id === APP_ID) {
            setNotifications((prev) => [newNotification, ...prev]);
            setUnreadCount((prev) => prev + 1);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const updatedNotification = payload.new as Notification;

          setNotifications((prev) =>
            prev.map((n) =>
              n.id === updatedNotification.id ? updatedNotification : n
            )
          );

          // Recalculate unread count
          setNotifications((prev) => {
            setUnreadCount(prev.filter((n) => !n.read_at && !n.dismissed_at).length);
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    refetch: fetchNotifications,
  };
}
```

---

## Hook: useNotificationPreferences

### Purpose
Manages user notification preferences.

### Location
`src/hooks/useNotificationPreferences.ts`

### Implementation

```typescript
// src/hooks/useNotificationPreferences.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const APP_ID = 'monolite-hr';

export interface NotificationPreferences {
  push_enabled: boolean;
  notify_request_submitted: boolean;
  notify_request_approved: boolean;
  notify_request_rejected: boolean;
  notify_announcements: boolean;
  notify_document_expiring: boolean;
  notify_document_expired: boolean;
  batch_notifications_enabled: boolean;
  batch_notification_time: string;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  push_enabled: true,
  notify_request_submitted: true,
  notify_request_approved: true,
  notify_request_rejected: true,
  notify_announcements: true,
  notify_document_expiring: true,
  notify_document_expired: true,
  batch_notifications_enabled: false,
  batch_notification_time: '08:00',
  quiet_hours_start: null,
  quiet_hours_end: null,
};

export interface UseNotificationPreferencesReturn {
  preferences: NotificationPreferences;
  loading: boolean;
  error: string | null;
  updatePreference: <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => Promise<void>;
  updatePreferences: (updates: Partial<NotificationPreferences>) => Promise<void>;
}

export function useNotificationPreferences(): UseNotificationPreferencesReturn {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch preferences
  const fetchPreferences = useCallback(async () => {
    if (!user) {
      setPreferences(DEFAULT_PREFERENCES);
      setLoading(false);
      return;
    }

    try {
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .eq('app_id', APP_ID)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        throw fetchError;
      }

      if (data) {
        setPreferences({
          push_enabled: data.push_enabled ?? true,
          notify_request_submitted: data.notify_request_submitted ?? true,
          notify_request_approved: data.notify_request_approved ?? true,
          notify_request_rejected: data.notify_request_rejected ?? true,
          notify_announcements: data.notify_announcements ?? true,
          notify_document_expiring: data.notify_document_expiring ?? true,
          notify_document_expired: data.notify_document_expired ?? true,
          batch_notifications_enabled: data.batch_notifications_enabled ?? false,
          batch_notification_time: data.batch_notification_time ?? '08:00',
          quiet_hours_start: data.quiet_hours_start,
          quiet_hours_end: data.quiet_hours_end,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch preferences';
      console.error('Error fetching notification preferences:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Update single preference
  const updatePreference = useCallback(
    async <K extends keyof NotificationPreferences>(
      key: K,
      value: NotificationPreferences[K]
    ) => {
      if (!user) return;

      // Optimistic update
      setPreferences((prev) => ({ ...prev, [key]: value }));

      try {
        const { error: upsertError } = await supabase
          .from('notification_preferences')
          .upsert(
            {
              user_id: user.id,
              app_id: APP_ID,
              [key]: value,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'user_id,app_id',
            }
          );

        if (upsertError) {
          throw upsertError;
        }
      } catch (err) {
        console.error('Error updating preference:', err);
        // Revert on error
        await fetchPreferences();
      }
    },
    [user, fetchPreferences]
  );

  // Update multiple preferences at once
  const updatePreferences = useCallback(
    async (updates: Partial<NotificationPreferences>) => {
      if (!user) return;

      // Optimistic update
      setPreferences((prev) => ({ ...prev, ...updates }));

      try {
        const { error: upsertError } = await supabase
          .from('notification_preferences')
          .upsert(
            {
              user_id: user.id,
              app_id: APP_ID,
              ...updates,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'user_id,app_id',
            }
          );

        if (upsertError) {
          throw upsertError;
        }
      } catch (err) {
        console.error('Error updating preferences:', err);
        await fetchPreferences();
      }
    },
    [user, fetchPreferences]
  );

  // Initial fetch
  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return {
    preferences,
    loading,
    error,
    updatePreference,
    updatePreferences,
  };
}
```

---

## Usage in App

### Initialize Push Notifications

Add to your main App component or navigator:

```typescript
// src/App.tsx or src/navigation/AppNavigator.tsx
import { usePushNotifications } from '@/hooks/usePushNotifications';

function App() {
  // Initialize push notifications
  usePushNotifications();

  return (
    // ... rest of app
  );
}
```

### Request Permission UI

Example of requesting permission from settings or onboarding:

```typescript
import { usePushNotifications } from '@/hooks/usePushNotifications';

function NotificationPermissionBanner() {
  const { permissionStatus, requestPermission } = usePushNotifications();

  if (permissionStatus === 'granted' || permissionStatus === 'loading') {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Text>Enable notifications to stay updated</Text>
      <Button onPress={requestPermission} title="Enable" />
    </View>
  );
}
```
