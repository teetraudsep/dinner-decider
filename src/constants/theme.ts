/**
 * App-wide colors, font sizes and spacing.
 * Principle: big text, big buttons, high contrast. Change values here, not in screens.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1A1A1A',
    textSecondary: '#5C5F66',
    background: '#FFFBF5',
    backgroundElement: '#F3EDE4',
    backgroundSelected: '#E8DFD2',
    primary: '#E8590C',
    onPrimary: '#FFFFFF',
    danger: '#C92A2A',
  },
  dark: {
    text: '#F8F5F0',
    textSecondary: '#B5B0A8',
    background: '#141210',
    backgroundElement: '#24211E',
    backgroundSelected: '#332F2A',
    primary: '#FF7A2E',
    onPrimary: '#1A1A1A',
    danger: '#FF6B6B',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/** Font sizes. Deliberately larger than iOS defaults. */
export const FontSize = {
  body: 20,
  large: 24,
  title: 36,
  hero: 44,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Minimum height for any tappable button. */
export const ButtonHeight = 72;
export const Radius = 20;
export const MaxContentWidth = 600;
