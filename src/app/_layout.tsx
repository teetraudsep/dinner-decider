import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * One simple stack of screens: each screen slides in on top of the previous one,
 * with a back button in the top-left corner.
 */
export default function RootLayout() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[scheme];

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontSize: 20 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="capture" options={{ title: 'Photos' }} />
        <Stack.Screen name="confirm" options={{ title: 'Ingredients' }} />
        <Stack.Screen name="suggestion" options={{ title: "Tonight's dinner" }} />
        <Stack.Screen name="cooking" options={{ title: 'Cooking', gestureEnabled: false }} />
        <Stack.Screen name="profile" options={{ title: 'Household' }} />
        <Stack.Screen name="planner" options={{ title: 'Weekly Planner' }} />
      </Stack>
    </ThemeProvider>
  );
}
