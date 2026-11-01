import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';

type Mode = 'sign-in' | 'sign-up';

/**
 * Email + password and Sign in with Apple.
 * After a successful sign-in the layout automatically shows Home.
 */
export default function SignInScreen() {
  const theme = useTheme();
  const dark = useColorScheme() === 'dark';
  const [mode, setMode] = useState<Mode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') AppleAuthentication.isAvailableAsync().then(setAppleAvailable);
  }, []);

  const submitEmail = async () => {
    setMessage(null);
    if (!email.includes('@') || password.length < 8) {
      setMessage({
        text: 'Enter your email and a password of at least 8 characters.',
        error: true,
      });
      return;
    }
    setBusy(true);
    const creds = { email: email.trim(), password };
    if (mode === 'sign-in') {
      const { error } = await supabase.auth.signInWithPassword(creds);
      if (error) setMessage({ text: friendly(error.message), error: true });
    } else {
      const { data, error } = await supabase.auth.signUp(creds);
      if (error) setMessage({ text: friendly(error.message), error: true });
      else if (!data.session) {
        // Supabase is set to require email confirmation.
        setMode('sign-in');
        setMessage({
          text: 'Almost done! Open the email we sent you, tap the link, then sign in here.',
          error: false,
        });
      }
    }
    setBusy(false);
  };

  const signInWithApple = async () => {
    setMessage(null);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!credential.identityToken) throw new Error('Apple did not return a sign-in token.');
      setBusy(true);
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });
      if (error) throw error;
    } catch (e) {
      // Tapping "Cancel" on the Apple sheet is not an error.
      if ((e as { code?: string }).code !== 'ERR_REQUEST_CANCELED') {
        setMessage({ text: friendly((e as Error).message), error: true });
      }
    } finally {
      setBusy(false);
    }
  };

  const input = [
    styles.input,
    { backgroundColor: theme.surface, borderColor: theme.line3, color: theme.ink },
  ];

  return (
    <Screen gap={14} contentStyle={styles.content}>
      <View style={styles.hero}>
        <ThemedText type="brand">Dinner Decider</ThemedText>
        <ThemedText type="headline" accessibilityRole="header">
          {mode === 'sign-in' ? 'Welcome back' : 'Create your account'}
        </ThemedText>
        <ThemedText color="ink2">Snap your fridge. We&apos;ll decide.</ThemedText>
      </View>

      {appleAvailable ? (
        <>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              mode === 'sign-in'
                ? AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                : AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
            }
            buttonStyle={
              dark
                ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={18}
            style={styles.apple}
            onPress={signInWithApple}
          />
          <ThemedText type="caption" color="ink3" style={styles.or}>
            or use email
          </ThemedText>
        </>
      ) : null}

      <ThemedText type="label" nativeID="email-label">
        Email
      </ThemedText>
      <TextInput
        accessibilityLabelledBy="email-label"
        accessibilityLabel="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="you@example.com"
        placeholderTextColor={theme.ink3}
        style={input}
      />

      <ThemedText type="label" nativeID="password-label">
        Password
      </ThemedText>
      <TextInput
        accessibilityLabelledBy="password-label"
        accessibilityLabel="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
        textContentType={mode === 'sign-in' ? 'password' : 'newPassword'}
        placeholder="At least 8 characters"
        placeholderTextColor={theme.ink3}
        onSubmitEditing={submitEmail}
        style={input}
      />

      {message ? (
        <ThemedText
          accessibilityLiveRegion="polite"
          color={message.error ? 'alertText' : 'green'}
          style={styles.message}>
          {message.text}
        </ThemedText>
      ) : null}

      {busy ? (
        <ActivityIndicator color={theme.accent} style={styles.spinner} />
      ) : (
        <Button label={mode === 'sign-in' ? 'Sign in' : 'Create account'} onPress={submitEmail} />
      )}

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in');
          setMessage(null);
        }}
        style={styles.switch}>
        <ThemedText type="small" color="green" style={styles.switchText}>
          {mode === 'sign-in' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </ThemedText>
      </Pressable>
    </Screen>
  );
}

/** Turn Supabase's technical messages into plain language. */
function friendly(message: string) {
  if (/invalid login credentials/i.test(message)) return 'Wrong email or password.';
  if (/email not confirmed/i.test(message))
    return 'Please confirm your email first: tap the link in the email we sent you.';
  if (/already registered/i.test(message))
    return 'That email already has an account. Sign in instead.';
  if (/network|fetch/i.test(message)) return 'No connection. Check your internet and try again.';
  return message;
}

const styles = StyleSheet.create({
  content: { paddingTop: 40 },
  hero: { gap: 8, marginBottom: 12 },
  apple: { height: 56, width: '100%' },
  or: { textAlign: 'center' },
  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 17,
  },
  message: { fontSize: 16 },
  spinner: { height: 60 },
  switch: { alignSelf: 'center', paddingVertical: 12 },
  switchText: { fontWeight: 500, textDecorationLine: 'underline' },
});
