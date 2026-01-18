import React, { useEffect, useRef } from 'react';
import { NavigationContainer, LinkingOptions, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '@/hooks/useAuth';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '@/theme';
import { RootStackParamList, MainTabParamList } from './types';
import { PushNotificationProvider } from '@/components/providers/PushNotificationProvider';
import { initializeAuthDeepLinking } from '@/integrations/supabase/client';

// Deep linking configuration
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['monolite-hr://'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: {
            screens: {
              HomeTab: 'home',
              ActivitiesTab: 'activities',
              MessagesTab: 'messages',
              ProfileTab: 'profile',
            },
          },
          LogHours: 'log-hours',
          MaterialRequest: 'material-request',
          LeaveRequest: 'leave-request',
        },
      },
      Auth: 'auth',
      AuthCallback: {
        path: 'auth/callback',
        // Parse query parameters from the URL
        parse: {
          token_hash: (token_hash: string) => token_hash,
          type: (type: string) => type,
          redirect_to: (redirect_to: string) => redirect_to,
          access_token: (access_token: string) => access_token,
          refresh_token: (refresh_token: string) => refresh_token,
          error: (error: string) => error,
          error_description: (error_description: string) => error_description,
        },
      },
      ConfirmEmail: 'confirm-email',
      EmailConfirmed: 'email-confirmed',
      ResetPassword: 'reset-password',
      UpdatePassword: 'update-password',
      AcceptInvitation: {
        path: 'accept-invitation/:token?',
        parse: {
          token: (token: string) => token,
        },
      },
      PrivacyPolicy: 'privacy-policy',
      TermsAndConditions: 'terms-and-conditions',
      NotFound: '*',
    },
  },
};

// Import screens (we'll create these next)
import AuthScreen from '@/pages/Auth';
import HomeScreen from '@/pages/Home';
import MyActivitiesScreen from '@/pages/MyActivities';
import CommunicationsScreen from '@/pages/Communications';
import SettingsScreen from '@/pages/Settings';
import LogHoursScreen from '@/pages/LogHours';
import MaterialRequestScreen from '@/pages/MaterialRequest';
import LeaveRequestScreen from '@/pages/LeaveRequest';
import PendingInvitationScreen from '@/pages/PendingInvitation';
import ConfirmEmailScreen from '@/pages/ConfirmEmail';
import EmailConfirmedScreen from '@/pages/EmailConfirmed';
import ResetPasswordScreen from '@/pages/ResetPassword';
import UpdatePasswordScreen from '@/pages/UpdatePassword';
import AcceptInvitationScreen from '@/pages/AcceptInvitation';
import AppleCallbackScreen from '@/pages/AppleCallback';
import AuthCallbackScreen from '@/pages/AuthCallback';
import PrivacyPolicyScreen from '@/pages/PrivacyPolicy';
import TermsAndConditionsScreen from '@/pages/TermsAndConditions';
import NotFoundScreen from '@/pages/NotFound';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Bottom Tab Navigator
function MainTabs() {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ActivitiesTab" 
        component={MyActivitiesScreen}
        options={{
          tabBarLabel: t('navigation.activities'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="MessagesTab" 
        component={CommunicationsScreen}
        options={{
          tabBarLabel: t('navigation.messages'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="message-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={SettingsScreen}
        options={{
          tabBarLabel: t('navigation.profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={MainTabs} />
      <Stack.Screen name="LogHours" component={LogHoursScreen} />
      <Stack.Screen name="MaterialRequest" component={MaterialRequestScreen} />
      <Stack.Screen name="LeaveRequest" component={LeaveRequestScreen} />
      <Stack.Screen name="MyActivities" component={MyActivitiesScreen} />
      <Stack.Screen name="Communications" component={CommunicationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="PendingInvitation" component={PendingInvitationScreen} />
    </Stack.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  const { user, loading } = useAuth();
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  // Initialize auth deep linking for non-callback URLs
  // Note: auth/callback URLs are handled by AuthCallback screen via React Navigation
  useEffect(() => {
    const cleanup = initializeAuthDeepLinking((type) => {
      console.log('AppNavigator - Auth session detected from non-callback URL, type:', type);
      // This is for future use if we add other auth deep links
    });

    return cleanup;
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <PushNotificationProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="Main" component={MainStack} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
              <Stack.Screen name="EmailConfirmed" component={EmailConfirmedScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
              <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
              <Stack.Screen name="AppleCallback" component={AppleCallbackScreen} />
              <Stack.Screen name="AcceptInvitation" component={AcceptInvitationScreen} />
              <Stack.Screen name="AuthCallback" component={AuthCallbackScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="AuthCallback" component={AuthCallbackScreen} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
              <Stack.Screen name="EmailConfirmed" component={EmailConfirmedScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
              <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
              <Stack.Screen name="AppleCallback" component={AppleCallbackScreen} />
              <Stack.Screen name="AcceptInvitation" component={AcceptInvitationScreen} />
            </>
          )}
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Navigator>
      </PushNotificationProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
