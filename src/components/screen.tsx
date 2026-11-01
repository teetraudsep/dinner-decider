import { router } from 'expo-router';
import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ScreenPadding, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Go back one screen; if there is nothing to go back to, go Home. */
export function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

type BackButtonProps = {
  onPress?: () => void;
  background?: string;
  borderColor?: string;
  color?: string;
};

export function BackButton({ onPress = goBack, background, borderColor, color }: BackButtonProps) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back"
      onPress={onPress}
      hitSlop={8}
      style={[
        styles.back,
        {
          backgroundColor: background ?? theme.surface,
          borderColor: borderColor ?? theme.line2,
          borderWidth: borderColor === 'transparent' ? 0 : 1,
        },
      ]}>
      <Icon name="back" color={color ?? theme.ink} size={18} />
    </Pressable>
  );
}

type HeaderProps = {
  title: string;
  subtitle?: string;
  /** "title": big title next to the back button. "center": small centered label. */
  layout?: 'title' | 'center';
  onBack?: () => void;
};

export function ScreenHeader({ title, subtitle, layout = 'title', onBack }: HeaderProps) {
  if (layout === 'center') {
    return (
      <View style={styles.headerRow}>
        <BackButton onPress={onBack} />
        <ThemedText type="small" color="ink2" style={styles.centerTitle}>
          {title}
        </ThemedText>
        <View style={styles.backSpacer} />
      </View>
    );
  }
  return (
    <View style={[styles.headerRow, styles.headerLeft]}>
      <BackButton onPress={onBack} />
      <View style={styles.headerText}>
        <ThemedText type="title" accessibilityRole="header">
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText type="caption" color="ink2">
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
    </View>
  );
}

type ScreenProps = {
  children: ReactNode;
  header?: ReactNode;
  /** Buttons pinned to the bottom, always in thumb reach. */
  footer?: ReactNode;
  background?: ThemeColor;
  gap?: number;
  contentStyle?: StyleProp<ViewStyle>;
};

/** Standard screen: header, scrolling content, buttons pinned at the bottom. */
export function Screen({
  children,
  header,
  footer,
  background = 'bg',
  gap = 16,
  contentStyle,
}: ScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme[background] }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {header ? <View style={styles.header}>{header}</View> : null}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, { gap }, contentStyle]}>
          {children}
        </ScrollView>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  header: {
    paddingHorizontal: ScreenPadding,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    justifyContent: 'flex-start',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  centerTitle: {
    fontWeight: 500,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backSpacer: { width: 44 },
  content: {
    flexGrow: 1,
    paddingHorizontal: ScreenPadding,
    paddingTop: 8,
    paddingBottom: 16,
  },
  footer: {
    gap: 6,
    paddingHorizontal: ScreenPadding,
    paddingTop: 8,
    paddingBottom: 12,
  },
});
