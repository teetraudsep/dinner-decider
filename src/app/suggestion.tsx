import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BigButton } from '@/components/big-button';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { placeholderDinner } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function SuggestionScreen() {
  const theme = useTheme();
  const dinner = placeholderDinner;

  return (
    <Screen footer={<BigButton label="Let's cook" onPress={() => router.push('/cooking')} />}>
      <ThemedText themeColor="textSecondary">Tonight you&apos;re making</ThemedText>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText type="title">{dinner.name}</ThemedText>
        <ThemedText type="large" themeColor="primary">
          ⏱ {dinner.minutes} minutes
        </ThemedText>
        <ThemedText themeColor="textSecondary">{dinner.why}</ThemedText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius,
    padding: Spacing.four,
    gap: Spacing.three,
  },
});
