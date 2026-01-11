import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '@/hooks/useAuth';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { RootStackParamList, MainTabParamList } from './types';

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
import PrivacyPolicyScreen from '@/pages/PrivacyPolicy';
import TermsAndConditionsScreen from '@/pages/TermsAndConditions';
import NotFoundScreen from '@/pages/NotFound';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Bottom Tab Navigator
function MainTabs() {
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
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="ActivitiesTab" 
        component={MyActivitiesScreen}
        options={{
          tabBarLabel: 'Activities',
        }}
      />
      <Tab.Screen 
        name="MessagesTab" 
        component={CommunicationsScreen}
        options={{
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Profile',
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  return (
    <NavigationContainer>
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
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
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
