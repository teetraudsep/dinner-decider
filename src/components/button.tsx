import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { FontFamily } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = {
  label: string;
  onPress: () => void;
  /**
   * accent = the one main action (orange)
   * strong = a confirm/save action (dark)
   * link   = a quiet text-only option ("Skip", "Maybe later")
   */
  variant?: 'accent' | 'strong' | 'link';
  disabled?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, variant = 'accent', disabled, icon, style }: ButtonProps) {
  const theme = useTheme();

  const look = {
    accent: { bg: theme.accent, fg: theme.onAccent, height: 60, size: 19 },
    strong: { bg: theme.strong, fg: theme.onStrong, height: 56, size: 17 },
    link: { bg: 'transparent', fg: theme.green, height: 48, size: 16 },
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: look.bg, minHeight: look.height },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {icon}
      <Text
        style={[
          styles.label,
          { color: look.fg, fontSize: look.size },
          variant === 'link' && styles.linkLabel,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontFamily: FontFamily.body,
    fontWeight: 700,
    textAlign: 'center',
  },
  linkLabel: {
    fontWeight: 500,
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.4,
  },
});
