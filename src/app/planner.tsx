import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Screen, ScreenHeader } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { placeholderWeek } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

/** Premium feature: visible but locked for free users. */
export default function PlannerScreen() {
  const theme = useTheme();
  const box = { backgroundColor: theme.surface, borderColor: theme.line };

  return (
    <Screen
      header={<ScreenHeader title="Weekly planner" />}
      footer={
        <View style={[styles.lockCard, { backgroundColor: theme.surface }]}>
          <View style={styles.lockTitle}>
            <Icon name="lock" color={theme.accent} size={20} />
            <ThemedText type="brand" style={styles.lockHeading}>
              Plan the whole week
            </ThemedText>
          </View>
          <ThemedText color="body" style={styles.lockText}>
            Snap once, get five dinners that use up what you have, plus one shopping list.
          </ThemedText>
          <Button label="Unlock with Premium" onPress={() => router.push('/limit')} />
        </View>
      }>
      {/* Faded preview of what Premium users will see. */}
      <View
        style={styles.preview}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        {placeholderWeek.map((d) => (
          <View key={d.day} style={[styles.day, box]}>
            <ThemedText type="caption" color="ink2" style={styles.dayName}>
              {d.day}
            </ThemedText>
            <ThemedText style={styles.dish}>{d.dish}</ThemedText>
          </View>
        ))}
        <View style={[styles.shopping, box]}>
          <ThemedText type="overline" color="ink2">
            SHOPPING LIST
          </ThemedText>
          <ThemedText type="small">Rice · Spinach · Feta · Tortillas · Ginger</ThemedText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  preview: {
    gap: 8,
    opacity: 0.45,
  },
  day: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  dayName: {
    width: 36,
    fontWeight: 700,
  },
  dish: {
    fontSize: 16,
  },
  shopping: {
    marginTop: 6,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 6,
  },
  lockCard: {
    borderRadius: 24,
    padding: 22,
    gap: 12,
    shadowColor: '#1B2620',
    shadowOpacity: 0.14,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
  lockTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lockHeading: {
    fontSize: 21,
  },
  lockText: {
    fontSize: 16,
    lineHeight: 23,
  },
});
