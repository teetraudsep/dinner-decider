import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BigButton } from '@/components/big-button';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { placeholderDecisionsLeft } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.hero}>
        <ThemedText style={styles.emoji}>🍽️</ThemedText>
        <ThemedText type="hero" style={styles.center}>
          What&apos;s for dinner?
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.center}>
          Snap your fridge. We pick one dinner.
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <BigButton label="Decide dinner" onPress={() => router.push('/capture')} />
        <ThemedText themeColor="textSecondary" style={styles.center}>
          {placeholderDecisionsLeft} free decisions left this week
        </ThemedText>
        <BigButton
          label="Household profile"
          variant="secondary"
          onPress={() => router.push('/profile')}
        />
        <BigButton
          label="🔒 Weekly Planner"
          variant="secondary"
          onPress={() => router.push('/planner')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
  },
  emoji: {
    fontSize: 72,
    lineHeight: 84,
  },
  center: {
    textAlign: 'center',
  },
  actions: {
    gap: Spacing.three,
  },
});
