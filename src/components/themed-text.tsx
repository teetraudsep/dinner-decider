import { StyleSheet, Text, type TextProps } from 'react-native';

import { FontSize, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'large' | 'title' | 'hero';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme[themeColor ?? 'text'] }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: FontSize.body,
    lineHeight: 28,
    fontWeight: 500,
  },
  large: {
    fontSize: FontSize.large,
    lineHeight: 32,
    fontWeight: 600,
  },
  title: {
    fontSize: FontSize.title,
    lineHeight: 42,
    fontWeight: 700,
  },
  hero: {
    fontSize: FontSize.hero,
    lineHeight: 50,
    fontWeight: 800,
  },
});
