import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Premium feature: visible but locked for free users. No payments yet. */
export default function PlannerScreen() {
  const theme = useTheme();

  return (
    <Screen>
      <ThemedText type="title">🔒 Premium</ThemedText>
      <ThemedText themeColor="textSecondary">
        Plan the whole week in one go, plus a shopping list. Coming with Premium.
      </ThemedText>

      {/* Faded preview of what the planner will look like. */}
      <View style={styles.preview} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {DAYS.map((day) => (
          <View key={day} style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="large">{day}</ThemedText>
            <ThemedText themeColor="textSecondary">Dinner idea</ThemedText>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  preview: {
    gap: Spacing.two,
    opacity: 0.35,
  },
  row: {
    borderRadius: Radius,
    padding: Spacing.three,
    paddingHorizontal: Spacing.four,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
