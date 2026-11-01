import { StyleSheet, Text, type TextProps } from 'react-native';

import { FontFamily, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: keyof typeof styles;
  color?: ThemeColor;
};

export function ThemedText({ style, type = 'body', color = 'ink', ...rest }: ThemedTextProps) {
  const theme = useTheme();
  return <Text style={[{ color: theme[color] }, styles[type], style]} {...rest} />;
}

const display = { fontFamily: FontFamily.display, fontWeight: 700 } as const;

const styles = StyleSheet.create({
  /** 17 px running text */
  body: { fontFamily: FontFamily.body, fontSize: 17, lineHeight: 25 },
  /** 15 px secondary text */
  small: { fontFamily: FontFamily.body, fontSize: 15, lineHeight: 21 },
  /** 13–14 px notes and tags */
  caption: { fontFamily: FontFamily.body, fontSize: 14, lineHeight: 19 },
  /** Small bold capitals, e.g. "YOU'LL USE" */
  overline: {
    fontFamily: FontFamily.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 700,
    letterSpacing: 0.8,
  },
  /** Section label, e.g. "Spice level" */
  label: { fontFamily: FontFamily.body, fontSize: 15, lineHeight: 21, fontWeight: 700 },
  /** App name on Home */
  brand: { ...display, fontSize: 22, lineHeight: 28 },
  /** Screen titles */
  title: { ...display, fontSize: 26, lineHeight: 31 },
  /** Big statements, e.g. the free-limit message */
  headline: { ...display, fontSize: 32, lineHeight: 36 },
  /** Dish names */
  hero: { ...display, fontSize: 36, lineHeight: 38 },
});
