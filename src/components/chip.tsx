import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

/** Rounded on/off pill: cuisines, rating tags, history filters. */
export function Chip({ label, selected, onPress }: ChipProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.chip,
        selected
          ? { backgroundColor: theme.chip, borderColor: theme.green, borderWidth: 2 }
          : { backgroundColor: theme.surface, borderColor: theme.line3, borderWidth: 1 },
      ]}>
      <Text
        style={[
          styles.label,
          { color: selected ? theme.chipText : theme.ink, fontWeight: selected ? 700 : 400 },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

type SegmentProps = {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  /** Color of the selected box: dark ("strong") or orange ("accent"). */
  tone?: 'strong' | 'accent';
};

/** A row of equal boxes where exactly one is picked, e.g. cooking time. */
export function Segmented({ options, value, onChange, tone = 'strong' }: SegmentProps) {
  const theme = useTheme();
  const onBg = tone === 'accent' ? theme.accent : theme.strong;
  const onFg = tone === 'accent' ? theme.onAccent : theme.onStrong;

  return (
    <SegmentRow>
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            style={[
              styles.segment,
              selected
                ? { backgroundColor: onBg, borderColor: onBg, borderWidth: 2 }
                : { backgroundColor: theme.surface, borderColor: theme.line3, borderWidth: 1 },
            ]}>
            <Text
              style={[
                styles.segmentLabel,
                { color: selected ? onFg : theme.ink, fontWeight: selected ? 700 : 400 },
              ]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </SegmentRow>
  );
}

function SegmentRow({ children }: { children: ReactNode }) {
  return <View style={styles.segmentRow}>{children}</View>;
}

const styles = StyleSheet.create({
  chip: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: 'center',
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: 14,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 8,
  },
  segment: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentLabel: {
    fontFamily: FontFamily.body,
    fontSize: 15,
  },
});
