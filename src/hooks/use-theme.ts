import { useColorScheme } from 'react-native';

import { Colors, type Theme } from '@/constants/theme';

/** Current color set, following the phone's light/dark setting. */
export function useTheme(): Theme {
  return Colors[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
