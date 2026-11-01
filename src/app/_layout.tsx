import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * One stack of screens. Each screen draws its own back button (as in the design),
 * so the built-in header is hidden. Swiping from the left edge still goes back.
 */
export default function RootLayout() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors[scheme].bg },
        }}>
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
      </Stack>
    </ThemeProvider>
  );
}
