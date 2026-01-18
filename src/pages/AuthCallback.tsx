import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { colors, spacing } from '@/theme';
import { TextComponent } from '@/components/ui/text';

// Define route params type
type AuthCallbackRouteParams = {
  token_hash?: string;
  type?: string;
  redirect_to?: string;
  access_token?: string;
  refresh_token?: string;
  error?: string;
  error_description?: string;
};

// Helper function to parse URL query parameters
const parseUrl = (url: string): { queryParams: Record<string, string> } => {
  const queryParams: Record<string, string> = {};

  try {
    // Handle both fragment (#) and query (?) parameters
    // Supabase uses fragment for implicit flow and query for PKCE
    let paramsString = '';

    if (url.includes('#')) {
      paramsString = url.split('#')[1];
    } else if (url.includes('?')) {
      paramsString = url.split('?')[1];
    }

    if (paramsString) {
      const params = new URLSearchParams(paramsString);
      params.forEach((value, key) => {
        queryParams[key] = value;
      });
    }
  } catch (e) {
    console.error('Error parsing URL:', e);
  }

  return { queryParams };
};

export default function AuthCallback() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ AuthCallback: AuthCallbackRouteParams }, 'AuthCallback'>>();
  const [error, setError] = useState<string | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    // Prevent double processing
    if (processedRef.current) return;

    const processAuth = async () => {
      // First, try to use route params from React Navigation (most reliable)
      const routeParams = route.params as AuthCallbackRouteParams | undefined;
      console.log('AuthCallback - Route params:', routeParams);

      if (routeParams && (routeParams.token_hash || routeParams.access_token)) {
        console.log('AuthCallback - Using route params from React Navigation');
        processedRef.current = true;
        await processAuthParams(routeParams);
        return;
      }

      // Fallback: Try to get URL from Linking (for when app is opened from closed state)
      const url = await Linking.getInitialURL();
      console.log('AuthCallback - Initial URL from Linking:', url);

      if (url && url.includes('auth/callback')) {
        processedRef.current = true;
        await processAuthUrl(url);
        return;
      }

      // No valid params found, redirect to Auth
      console.log('AuthCallback - No valid params found, redirecting to Auth');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    };

    // Handle URL when app is already open
    const handleUrlEvent = async (event: { url: string }) => {
      console.log('AuthCallback - URL Event:', event.url);
      if (event.url.includes('auth/callback') && !processedRef.current) {
        processedRef.current = true;
        await processAuthUrl(event.url);
      }
    };

    // Subscribe to URL events
    const subscription = Linking.addEventListener('url', handleUrlEvent);

    // Process auth
    processAuth();

    return () => {
      subscription.remove();
    };
  }, [route.params]);

  // Process auth params directly from route params
  const processAuthParams = async (params: AuthCallbackRouteParams) => {
    try {
      console.log('AuthCallback - Processing params:', params);

      // Check for error in params (e.g., expired link)
      if (params.error) {
        const errorDescription = params.error_description?.replace(/\+/g, ' ') || params.error;
        throw new Error(errorDescription);
      }

      const accessToken = params.access_token;
      const refreshToken = params.refresh_token;
      const type = params.type;

      if (accessToken && refreshToken) {
        // Set the session with the tokens
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        console.log('AuthCallback - Session set result:', { data: !!data, error: sessionError });

        if (sessionError) {
          throw sessionError;
        }

        // Navigate based on the type of callback
        if (type === 'signup' || type === 'email') {
          console.log('AuthCallback - Navigating to EmailConfirmed');
          navigation.reset({
            index: 0,
            routes: [{ name: 'EmailConfirmed' }],
          });
        } else if (type === 'recovery') {
          console.log('AuthCallback - Navigating to UpdatePassword');
          navigation.reset({
            index: 0,
            routes: [{ name: 'UpdatePassword' }],
          });
        } else {
          console.log('AuthCallback - Navigating to Main');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        }
        return;
      }

      // Handle token_hash for OTP/email verification flow
      const tokenHash = params.token_hash;
      const tokenType = params.type;

      console.log('AuthCallback - Token hash:', tokenHash);
      console.log('AuthCallback - Token type for OTP:', tokenType);

      if (tokenHash && tokenType) {
        // Map email_action_type to Supabase OTP type
        let otpType: 'signup' | 'recovery' | 'magiclink' | 'email_change' | 'email' = 'signup';
        if (tokenType === 'recovery') {
          otpType = 'recovery';
        } else if (tokenType === 'magiclink') {
          otpType = 'magiclink';
        } else if (tokenType === 'email_change') {
          otpType = 'email_change';
        } else if (tokenType === 'signup' || tokenType === 'email') {
          otpType = 'signup';
        }

        console.log('AuthCallback - Using OTP type:', otpType);

        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: otpType,
        });

        console.log('AuthCallback - OTP verify result:', { data: !!data?.user, session: !!data?.session, error: verifyError });

        if (verifyError) {
          throw verifyError;
        }

        // Navigate based on the type
        if (otpType === 'recovery') {
          console.log('AuthCallback - Navigating to UpdatePassword after OTP');
          navigation.reset({
            index: 0,
            routes: [{ name: 'UpdatePassword' }],
          });
        } else {
          console.log('AuthCallback - Navigating to EmailConfirmed after OTP');
          navigation.reset({
            index: 0,
            routes: [{ name: 'EmailConfirmed' }],
          });
        }
        return;
      }

      // No valid tokens found
      console.log('AuthCallback - No valid tokens in params, going to Auth');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (err: any) {
      console.error('Auth callback error:', err);
      setError(err.message || 'An error occurred during authentication');
      // Navigate to Auth after a delay
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      }, 3000);
    }
  };

  const processAuthUrl = async (url: string) => {
    try {
      console.log('AuthCallback - Processing URL:', url);
      const { queryParams } = parseUrl(url);
      console.log('AuthCallback - Parsed params:', queryParams);

      // Check for error in URL (e.g., expired link)
      if (queryParams.error) {
        const errorDescription = queryParams.error_description?.replace(/\+/g, ' ') || queryParams.error;
        throw new Error(errorDescription);
      }

      if (queryParams && Object.keys(queryParams).length > 0) {
        const accessToken = queryParams.access_token;
        const refreshToken = queryParams.refresh_token;
        const type = queryParams.type;

        console.log('AuthCallback - Token type:', type);
        console.log('AuthCallback - Has access token:', !!accessToken);
        console.log('AuthCallback - Has refresh token:', !!refreshToken);

        if (accessToken && refreshToken) {
          // Set the session with the tokens from the URL
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          console.log('AuthCallback - Session set result:', { data: !!data, error: sessionError });

          if (sessionError) {
            throw sessionError;
          }

          // Navigate based on the type of callback
          if (type === 'signup' || type === 'email') {
            console.log('AuthCallback - Navigating to EmailConfirmed');
            navigation.reset({
              index: 0,
              routes: [{ name: 'EmailConfirmed' }],
            });
          } else if (type === 'recovery') {
            console.log('AuthCallback - Navigating to UpdatePassword');
            navigation.reset({
              index: 0,
              routes: [{ name: 'UpdatePassword' }],
            });
          } else {
            console.log('AuthCallback - Navigating to Main');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            });
          }
          return;
        }

        // Handle token_hash for OTP/email verification flow
        const tokenHash = queryParams.token_hash;
        const tokenType = queryParams.type;

        console.log('AuthCallback - Token hash:', tokenHash);
        console.log('AuthCallback - Token type for OTP:', tokenType);

        if (tokenHash && tokenType) {
          // Map email_action_type to Supabase OTP type
          let otpType: 'signup' | 'recovery' | 'magiclink' | 'email_change' | 'email' = 'signup';
          if (tokenType === 'recovery') {
            otpType = 'recovery';
          } else if (tokenType === 'magiclink') {
            otpType = 'magiclink';
          } else if (tokenType === 'email_change') {
            otpType = 'email_change';
          } else if (tokenType === 'signup' || tokenType === 'email') {
            otpType = 'signup';
          }

          console.log('AuthCallback - Using OTP type:', otpType);

          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: otpType,
          });

          console.log('AuthCallback - OTP verify result:', { data: !!data?.user, session: !!data?.session, error: verifyError });

          if (verifyError) {
            throw verifyError;
          }

          // Navigate based on the type
          if (otpType === 'recovery') {
            console.log('AuthCallback - Navigating to UpdatePassword after OTP');
            navigation.reset({
              index: 0,
              routes: [{ name: 'UpdatePassword' }],
            });
          } else {
            console.log('AuthCallback - Navigating to EmailConfirmed after OTP');
            navigation.reset({
              index: 0,
              routes: [{ name: 'EmailConfirmed' }],
            });
          }
          return;
        }
      }

      // If no valid tokens found, go to Auth
      console.log('AuthCallback - No valid tokens, going to Auth');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (err: any) {
      console.error('Auth callback error:', err);
      setError(err.message || 'An error occurred during authentication');
      // Navigate to Auth after a delay
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {error ? (
          <>
            <TextComponent variant="h2" style={styles.title}>
              {t('common.error')}
            </TextComponent>
            <TextComponent variant="body" style={styles.message}>
              {error}
            </TextComponent>
            <TextComponent variant="caption" style={styles.redirect}>
              {t('auth.redirectingToLogin')}
            </TextComponent>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color={colors.primary} />
            <TextComponent variant="body" style={styles.message}>
              {t('auth.verifyingEmail')}
            </TextComponent>
          </>
        )}
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
    padding: spacing.xl,
  },
  title: {
    color: colors.destructive,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    color: colors.foreground,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  redirect: {
    color: colors.mutedForeground,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
