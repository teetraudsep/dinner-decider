import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/lib/auth';

// Keep the splash screen up until we know whether someone is signed in.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}

/**
 * One stack of screens. Signed-out users can only see the sign-in screen;
 * signed-in users see the rest. Each screen draws its own back button.
 */
function AppStack() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading) SplashScreen.hideAsync();
  }, [loading]);

  if (loading) return null;

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors[scheme].bg },
        }}>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="index" />
          <Stack.Screen name="capture" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="confirm" />
          <Stack.Screen name="suggestion" />
          <Stack.Screen name="cooking" />
          <Stack.Screen name="rate" options={{ gestureEnabled: false }} />
          <Stack.Screen name="history" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="family" />
          <Stack.Screen name="planner" />
          <Stack.Screen name="limit" options={{ presentation: 'modal' }} />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
