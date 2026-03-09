import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { supabase, getPendingAuthCallbackUrl } from '@/integrations/supabase/client';
import { colors, spacing } from '@/theme';
import { TextComponent } from '@/components/ui/text';

// Define route params type
type AuthCallbackRouteParams = {
  token_hash?: string;
  type?: string;
  redirect_to?: string;
  access_token?: string;
  refresh_token?: string;
  token?: string;
  error?: string;
  error_description?: string;
};

// Helper function to parse URL query parameters
const parseUrl = (url: string): { queryParams: Record<string, string> } => {
  const queryParams: Record<string, string> = {};

  try {
    // Parse query parameters (?) first
    if (url.includes('?')) {
      const queryString = url.split('?')[1]?.split('#')[0]; // Get query params before any hash
      if (queryString) {
        const params = new URLSearchParams(queryString);
        params.forEach((value, key) => {
          queryParams[key] = value;
        });
      }
    }

    // Also parse hash fragment (#) - Supabase uses this for implicit flow tokens
    if (url.includes('#')) {
      const hashString = url.split('#')[1];
      if (hashString) {
        const params = new URLSearchParams(hashString);
        params.forEach((value, key) => {
          // Hash params override query params (they contain the actual tokens)
          queryParams[key] = value;
        });
      }
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

  // Listen for auth state changes from Supabase SDK
  // This handles the case when tokens come via hash fragment and SDK processes them
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthCallback - Auth state changed:', event, !!session);

      // Prevent processing if already handled
      if (processedRef.current) return;

      if (event === 'PASSWORD_RECOVERY' && session) {
        console.log('AuthCallback - PASSWORD_RECOVERY event, navigating to UpdatePassword');
        processedRef.current = true;
        navigation.reset({
          index: 0,
          routes: [{ name: 'UpdatePassword' }],
        });
      } else if (event === 'SIGNED_IN' && session) {
        // Check route params for type to determine destination
        const routeParams = route.params as AuthCallbackRouteParams | undefined;
        console.log('AuthCallback - SIGNED_IN event, type:', routeParams?.type);

        if (routeParams?.type === 'recovery') {
          processedRef.current = true;
          navigation.reset({
            index: 0,
            routes: [{ name: 'UpdatePassword' }],
          });
        } else if (routeParams?.type === 'email_change') {
          // Don't navigate here — let processAuthParams handle OTP verification
          console.log('AuthCallback - email_change SIGNED_IN event, deferring to OTP flow');
        } else if (routeParams?.type === 'signup' || routeParams?.type === 'email') {
          processedRef.current = true;
          navigation.reset({
            index: 0,
            routes: [{ name: 'EmailConfirmed' }],
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigation, route.params]);

  useEffect(() => {
    // Prevent double processing
    if (processedRef.current) return;

    const processAuth = async () => {
      // First, try to use route params from React Navigation (most reliable)
      const routeParams = route.params as AuthCallbackRouteParams | undefined;
      console.log('AuthCallback - Route params:', routeParams);

      // Handle invitation flow directly - it doesn't need token processing
      if (routeParams?.type === 'invitation' && routeParams.token) {
        console.log('AuthCallback - Invitation flow, navigating to AcceptInvitation');
        processedRef.current = true;
        navigation.reset({
          index: 0,
          routes: [{ name: 'AcceptInvitation', params: { token: routeParams.token } }],
        });
        return;
      }

      // If we have tokens in route params, process them
      if (routeParams && (routeParams.token_hash || routeParams.access_token)) {
        console.log('AuthCallback - Using route params from React Navigation');
        processedRef.current = true;
        await processAuthParams(routeParams);
        return;
      }

      // Try to get URL from Linking (for when app was opened from closed state)
      const url = await Linking.getInitialURL();
      console.log('AuthCallback - Initial URL from Linking:', url);

      if (url && url.includes('auth/callback')) {
        processedRef.current = true;
        await processAuthUrl(url);
        return;
      }

      // If we have a type but no tokens, check for pending URL from Supabase client
      // The URL event may have fired before this component mounted
      if (routeParams?.type) {
        const pendingUrl = getPendingAuthCallbackUrl();
        console.log('AuthCallback - Pending URL from Supabase client:', pendingUrl);

        if (pendingUrl) {
          processedRef.current = true;
          await processAuthUrl(pendingUrl);
          return;
        }

        console.log('AuthCallback - Type present, waiting for URL event with tokens...');
        // Just wait - the URL event handler will process it
        return;
      }

      // No valid params found, redirect to Auth
      console.log('AuthCallback - No valid params found, redirecting to Auth');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    };

    // Handle URL when app is already open - process it ourselves
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

      // Handle invitation flow - redirect to AcceptInvitation screen
      if (params.type === 'invitation' && params.token) {
        console.log('AuthCallback - Invitation flow, navigating to AcceptInvitation with token:', params.token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'AcceptInvitation', params: { token: params.token } }],
        });
        return;
      }

      const accessToken = params.access_token;
      const refreshToken = params.refresh_token;
      const type = params.type;
      const tokenHash = params.token_hash;

      // If we only have type=recovery but no tokens, check if Supabase already has a session
      // This can happen when the browser/webview processes the hash fragment before redirecting
      if (type === 'recovery' && !accessToken && !refreshToken && !tokenHash) {
        console.log('AuthCallback - Recovery type without tokens, checking for existing session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('AuthCallback - Existing session:', !!session);

        if (session) {
          console.log('AuthCallback - Session found, navigating to UpdatePassword');
          navigation.reset({
            index: 0,
            routes: [{ name: 'UpdatePassword' }],
          });
          return;
        }
      }

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
      console.log('AuthCallback - Token hash:', tokenHash);
      console.log('AuthCallback - Token type for OTP:', type);

      if (tokenHash && type) {
        // Map email_action_type to Supabase OTP type
        let otpType: 'signup' | 'recovery' | 'magiclink' | 'email_change' | 'email' = 'signup';
        if (type === 'recovery') {
          otpType = 'recovery';
        } else if (type === 'magiclink') {
          otpType = 'magiclink';
        } else if (type === 'email_change') {
          otpType = 'email_change';
        } else if (type === 'signup' || type === 'email') {
          otpType = 'signup';
        }

        console.log('AuthCallback - Using OTP type:', otpType);

        // Check if Supabase SDK already processed the token (via detectSessionInUrl)
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        if (existingSession && otpType !== 'email_change') {
          console.log('AuthCallback - Session already exists, skipping OTP verification');
          if (otpType === 'recovery') {
            navigation.reset({ index: 0, routes: [{ name: 'UpdatePassword' }] });
          } else {
            navigation.reset({ index: 0, routes: [{ name: 'EmailConfirmed' }] });
          }
          return;
        }

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
        } else if (otpType === 'email_change') {
          // Check if the email actually changed (both confirmations done)
          const { data: { user: updatedUser } } = await supabase.auth.getUser();
          const emailActuallyChanged = updatedUser?.email_confirmed_at && !updatedUser?.new_email;
          console.log('AuthCallback - Email change status:', { email: updatedUser?.email, new_email: (updatedUser as any)?.new_email, emailActuallyChanged });

          if (emailActuallyChanged) {
            // Both confirmations done — sync to profiles
            try {
              if (updatedUser?.email) {
                await (supabase as any).from('profiles').update({ email: updatedUser.email, updated_at: new Date().toISOString() }).eq('id', updatedUser.id);
                console.log('AuthCallback - Synced new email to profiles table:', updatedUser.email);
              }
            } catch (syncErr) {
              console.error('AuthCallback - Failed to sync email to profiles:', syncErr);
            }
            navigation.reset({
              index: 0,
              routes: [{ name: 'EmailChangeConfirmed', params: { step: 'complete' } }],
            });
          } else {
            // First confirmation done — need second from the other email
            // new_email = the pending new address; email = the current address
            // The user needs to confirm from whichever one they haven't yet
            const otherEmail = updatedUser?.new_email || updatedUser?.email || '';
            console.log('AuthCallback - First email confirmation done, awaiting second from:', otherEmail);
            navigation.reset({
              index: 0,
              routes: [{ name: 'EmailChangeConfirmed', params: { step: 'first', otherEmail } }],
            });
          }
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
      // Allow processing new URL events after error
      processedRef.current = false;
      // Navigate after a delay — go to Main if user has session, otherwise Auth
      setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        navigation.reset({
          index: 0,
          routes: [{ name: session ? 'Main' : 'Auth' }],
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

      // Handle invitation flow - redirect to AcceptInvitation screen
      if (queryParams.type === 'invitation' && queryParams.token) {
        console.log('AuthCallback - Invitation flow from URL, navigating to AcceptInvitation with token:', queryParams.token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'AcceptInvitation', params: { token: queryParams.token } }],
        });
        return;
      }

      if (queryParams && Object.keys(queryParams).length > 0) {
        const accessToken = queryParams.access_token;
        const refreshToken = queryParams.refresh_token;
        const type = queryParams.type;
        const tokenHash = queryParams.token_hash;

        console.log('AuthCallback - Token type:', type);
        console.log('AuthCallback - Has access token:', !!accessToken);
        console.log('AuthCallback - Has refresh token:', !!refreshToken);
        console.log('AuthCallback - Has token_hash:', !!tokenHash);

        // If we only have type=recovery but no tokens, check if Supabase already has a session
        // This can happen when the browser/webview processes the hash fragment before redirecting
        if (type === 'recovery' && !accessToken && !refreshToken && !tokenHash) {
          console.log('AuthCallback - Recovery type without tokens, checking for existing session...');
          const { data: { session } } = await supabase.auth.getSession();
          console.log('AuthCallback - Existing session:', !!session);

          if (session) {
            console.log('AuthCallback - Session found, navigating to UpdatePassword');
            navigation.reset({
              index: 0,
              routes: [{ name: 'UpdatePassword' }],
            });
            return;
          }
        }

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
        console.log('AuthCallback - Token hash:', tokenHash);
        console.log('AuthCallback - Token type for OTP:', type);

        if (tokenHash && type) {
          // Map email_action_type to Supabase OTP type
          let otpType: 'signup' | 'recovery' | 'magiclink' | 'email_change' | 'email' = 'signup';
          if (type === 'recovery') {
            otpType = 'recovery';
          } else if (type === 'magiclink') {
            otpType = 'magiclink';
          } else if (type === 'email_change') {
            otpType = 'email_change';
          } else if (type === 'signup' || type === 'email') {
            otpType = 'signup';
          }

          console.log('AuthCallback - Using OTP type:', otpType);

          // Check if Supabase SDK already processed the token (via detectSessionInUrl)
          const { data: { session: existingSession } } = await supabase.auth.getSession();
          if (existingSession && otpType !== 'email_change') {
            console.log('AuthCallback - Session already exists, skipping OTP verification');
            if (otpType === 'recovery') {
              navigation.reset({ index: 0, routes: [{ name: 'UpdatePassword' }] });
            } else {
              navigation.reset({ index: 0, routes: [{ name: 'EmailConfirmed' }] });
            }
            return;
          }

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
          } else if (otpType === 'email_change') {
            // Check if the email actually changed (both confirmations done)
            const { data: { user: updatedUser } } = await supabase.auth.getUser();
            const emailActuallyChanged = updatedUser?.email_confirmed_at && !updatedUser?.new_email;
            console.log('AuthCallback - Email change status:', { email: updatedUser?.email, new_email: (updatedUser as any)?.new_email, emailActuallyChanged });

            if (emailActuallyChanged) {
              // Both confirmations done — sync to profiles
              try {
                if (updatedUser?.email) {
                  await (supabase as any).from('profiles').update({ email: updatedUser.email, updated_at: new Date().toISOString() }).eq('id', updatedUser.id);
                  console.log('AuthCallback - Synced new email to profiles table:', updatedUser.email);
                }
              } catch (syncErr) {
                console.error('AuthCallback - Failed to sync email to profiles:', syncErr);
              }
              navigation.reset({
                index: 0,
                routes: [{ name: 'EmailChangeConfirmed', params: { step: 'complete' } }],
              });
            } else {
              // First confirmation done — need second from the other email
              const otherEmail = updatedUser?.new_email || updatedUser?.email || '';
              console.log('AuthCallback - First email confirmation done, awaiting second from:', otherEmail);
              navigation.reset({
                index: 0,
                routes: [{ name: 'EmailChangeConfirmed', params: { step: 'first', otherEmail } }],
              });
            }
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
      // Allow processing new URL events after error
      processedRef.current = false;
      // Navigate after a delay — go to Main if user has session, otherwise Auth
      setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        navigation.reset({
          index: 0,
          routes: [{ name: session ? 'Main' : 'Auth' }],
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
