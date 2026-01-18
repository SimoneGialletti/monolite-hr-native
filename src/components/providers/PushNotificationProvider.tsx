import React, { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { Platform, PermissionsAndroid, Linking } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Database } from '@/integrations/supabase/types';

const APP_ID = 'monolite-hr';

type UserDeviceInsert = Database['public']['Tables']['user_devices']['Insert'];

interface PushNotificationContextType {
  requestPermission: () => Promise<boolean>;
  unregisterToken: () => Promise<void>;
  checkNotificationStatus: () => Promise<boolean>;
  openNotificationSettings: () => void;
}

const PushNotificationContext = createContext<PushNotificationContextType | null>(null);

export function usePushNotificationContext() {
  const context = useContext(PushNotificationContext);
  if (!context) {
    throw new Error('usePushNotificationContext must be used within PushNotificationProvider');
  }
  return context;
}

interface Props {
  children: React.ReactNode;
}

export function PushNotificationProvider({ children }: Props) {
  const { user } = useAuth();
  const navigation = useNavigation();

  // Request notification permissions
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'ios') {
        // Check current permission status first
        const currentStatus = await messaging().hasPermission();
        console.log('Current iOS notification permission status:', currentStatus);

        if (currentStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
          console.log('Requesting iOS notification permission...');
          const authStatus = await messaging().requestPermission();
          console.log('Permission request result:', authStatus);
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          return enabled;
        } else if (
          currentStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          currentStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          console.log('iOS notifications already authorized');
          return true;
        } else {
          console.log('iOS notifications denied - user must enable in Settings');
          return false;
        }
      } else if (Platform.OS === 'android') {
        // Android 13+ requires runtime permission
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, []);

  // Register FCM token with Supabase
  const registerToken = useCallback(async (token: string) => {
    if (!user?.id) {
      console.log('No user session, skipping token registration');
      return;
    }

    try {
      const deviceUuid = await DeviceInfo.getUniqueId();
      const platform = Platform.OS;

      const { error } = await supabase
        .from('user_devices')
        .upsert(
          {
            user_id: user.id,
            device_uuid: deviceUuid,
            app_id: APP_ID,
            fcm_token: token,
            platform,
            push_enabled: true,
            updated_at: new Date().toISOString(),
          } as UserDeviceInsert,
          {
            onConflict: 'user_id,device_uuid',
          }
        );

      if (error) {
        console.error('Error registering FCM token:', error);
      } else {
        console.log('FCM token registered successfully');
      }
    } catch (error) {
      console.error('Error registering FCM token:', error);
    }
  }, [user?.id]);

  // Unregister device token
  const unregisterToken = useCallback(async () => {
    if (!user?.id) return;

    try {
      const deviceUuid = await DeviceInfo.getUniqueId();

      const { error } = await supabase
        .from('user_devices')
        .update({
          fcm_token: null,
          push_enabled: false,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('device_uuid', deviceUuid)
        .eq('app_id', APP_ID);

      if (error) {
        console.error('Error unregistering FCM token:', error);
      }
    } catch (error) {
      console.error('Error unregistering FCM token:', error);
    }
  }, [user?.id]);

  // Check if notifications are enabled
  const checkNotificationStatus = useCallback(async () => {
    try {
      const authStatus = await messaging().hasPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    } catch (error) {
      console.error('Error checking notification status:', error);
      return false;
    }
  }, []);

  // Open app notification settings
  const openNotificationSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  // Handle notification tap - navigate to deep link
  const handleNotificationTap = useCallback((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    const data = remoteMessage.data;
    if (!data) return;

    const deepLinkPath = data.deep_link_path as string | undefined;
    const entityType = data.entity_type as string | undefined;
    const entityId = data.entity_id as string | undefined;

    if (deepLinkPath) {
      // Parse deep link path and navigate
      // Expected format: /screen-name or /screen-name/id
      const parts = deepLinkPath.split('/').filter(Boolean);

      if (parts[0] === 'activities') {
        (navigation as any).navigate('Main', { screen: 'Home', params: { screen: 'ActivitiesTab' } });
      } else if (parts[0] === 'messages' || parts[0] === 'communications') {
        (navigation as any).navigate('Main', { screen: 'Home', params: { screen: 'MessagesTab' } });
      } else if (parts[0] === 'settings') {
        (navigation as any).navigate('Main', { screen: 'Home', params: { screen: 'ProfileTab' } });
      } else {
        // Default to home
        (navigation as any).navigate('Main', { screen: 'Home', params: { screen: 'HomeTab' } });
      }
    } else if (entityType && entityId) {
      // Navigate based on entity type
      switch (entityType) {
        case 'worker_request':
          (navigation as any).navigate('Main', { screen: 'Home', params: { screen: 'ActivitiesTab' } });
          break;
        case 'communication':
          (navigation as any).navigate('Main', { screen: 'Home', params: { screen: 'MessagesTab' } });
          break;
        default:
          (navigation as any).navigate('Main', { screen: 'Home', params: { screen: 'HomeTab' } });
      }
    }
  }, [navigation]);

  // Initialize FCM
  useEffect(() => {
    if (!user?.id) return;

    let unsubscribeOnMessage: (() => void) | undefined;
    let unsubscribeOnTokenRefresh: (() => void) | undefined;

    const initializeFCM = async () => {
      try {
        console.log('Initializing FCM for user:', user?.id);
        const hasPermission = await requestPermission();

        if (!hasPermission) {
          console.log('Notification permission not granted - cannot proceed with FCM setup');
          return;
        }
        console.log('Notification permission granted, proceeding with FCM setup');

        // iOS requires explicit registration for remote messages before getting token
        if (Platform.OS === 'ios') {
          await messaging().registerDeviceForRemoteMessages();
        }

        const token = await messaging().getToken();
        if (token) {
          await registerToken(token);
        }

        unsubscribeOnTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
          console.log('FCM token refreshed');
          await registerToken(newToken);
        });

        // Handle foreground messages - show in-app notification
        unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
          console.log('Foreground notification received:', remoteMessage);
          // Foreground notifications will be handled by the NotificationCenter component
          // which subscribes to realtime updates
        });

        // Handle notification tap when app is in background
        messaging().onNotificationOpenedApp((remoteMessage) => {
          console.log('Notification opened app from background:', remoteMessage);
          handleNotificationTap(remoteMessage);
        });

        // Check if app was opened from a notification when killed
        const initialNotification = await messaging().getInitialNotification();
        if (initialNotification) {
          console.log('App opened from killed state via notification:', initialNotification);
          // Delay navigation to allow app to fully initialize
          setTimeout(() => handleNotificationTap(initialNotification), 1000);
        }
      } catch (error) {
        console.error('Error initializing FCM:', error);
      }
    };

    initializeFCM();

    return () => {
      unsubscribeOnMessage?.();
      unsubscribeOnTokenRefresh?.();
    };
  }, [user?.id, requestPermission, registerToken, handleNotificationTap]);

  const contextValue = useMemo(() => ({
    requestPermission,
    unregisterToken,
    checkNotificationStatus,
    openNotificationSettings,
  }), [requestPermission, unregisterToken, checkNotificationStatus, openNotificationSettings]);

  return (
    <PushNotificationContext.Provider value={contextValue}>
      {children}
    </PushNotificationContext.Provider>
  );
}
