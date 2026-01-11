import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { supabase } from '@/integrations/supabase/client';
import Toast from 'react-native-toast-message';
import { TextComponent } from '@/components/ui/text';
import { colors, spacing } from '@/theme';

export default function AppleCallback() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleAppleCallback = async () => {
      try {
        // Get parameters from route params (deep link)
        const params = route.params || {};
        const code = params.code;
        const idToken = params.id_token;
        const user = params.user;

        if (!code || !idToken) {
          throw new Error('Missing authentication parameters from Apple');
        }

        // Parse user data if present
        let userData = null;
        if (user) {
          try {
            userData = typeof user === 'string' ? JSON.parse(user) : user;
          } catch (e) {
            console.warn('Could not parse user data:', e);
          }
        }

        // Call edge function to verify and sign in
        const { data, error } = await supabase.functions.invoke('verify-apple-signin', {
          body: {
            code,
            idToken,
            redirectUri: 'monolite-hr://callback/Apple',
            user: userData,
          },
        });

        if (error) throw error;

        if (data?.access_token && data?.refresh_token) {
          // Set the session using the tokens from the edge function
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });

          if (sessionError) throw sessionError;

          Toast.show({
            type: 'success',
            text1: 'Welcome!',
            text2: 'Successfully signed in with Apple',
          });

          // Check if user has a company
          const { data: { user: currentUser } } = await supabase.auth.getUser();
          if (currentUser) {
            const { data: userCompany } = await supabase
              .from('user_companies')
              .select('id, role_id')
              .eq('user_id', currentUser.id)
              .maybeSingle();

            if (!userCompany) {
              navigation.navigate('PendingInvitation');
            } else {
              navigation.navigate('Main');
            }
          }
        } else {
          throw new Error('No session tokens returned from authentication');
        }
      } catch (error) {
        console.error('Apple callback error:', error);
        Toast.show({
          type: 'error',
          text1: 'Authentication Failed',
          text2: error instanceof Error ? error.message : 'Could not sign in with Apple',
        });
        navigation.navigate('Auth');
      } finally {
        setProcessing(false);
      }
    };

    handleAppleCallback();
  }, [route.params, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.gold} />
        <TextComponent variant="body" style={styles.text}>
          {processing ? 'Completing Apple Sign In...' : 'Redirecting...'}
        </TextComponent>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  text: {
    color: colors.mutedForeground,
    marginTop: spacing.md,
  },
});
