import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { placeholderProfile } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <Screen>
      <ThemedText type="title">Your household</ThemedText>
      <ThemedText themeColor="textSecondary">
        Example values for now. Editing comes once accounts are set up.
      </ThemedText>

      <View style={styles.list}>
        {placeholderProfile.map(({ label, value }) => (
          <View key={label} style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText themeColor="textSecondary">{label}</ThemedText>
            <ThemedText type="large" themeColor={label === 'Allergies' ? 'danger' : 'text'}>
              {value}
            </ThemedText>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.two,
  },
  row: {
    borderRadius: Radius,
    padding: Spacing.three,
    paddingHorizontal: Spacing.four,
    gap: Spacing.one,
  },
});
