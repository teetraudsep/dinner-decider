import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { FREE_DECISIONS_PER_WEEK } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

const PERKS = [
  'Unlimited dinner decisions',
  'Plan the whole week at once',
  'One smart shopping list',
];

/**
 * Shown when the free weekly limit is used up (and from the locked planner).
 * Payments come later via Apple in-app subscriptions, so the buy button is disabled for now.
 */
export default function LimitScreen() {
  const theme = useTheme();

  return (
    <Screen
      gap={22}
      contentStyle={styles.content}
      footer={
        <>
          <Button label="Go premium · [PRICE]/month" onPress={() => {}} disabled />
          <ThemedText type="caption" color="ink2" style={styles.center}>
            or [YEARLY PRICE]/year · cancel anytime
          </ThemedText>
          <Button label="Maybe later" variant="link" onPress={() => router.dismissTo('/')} />
        </>
      }>
      <View style={[styles.check, { backgroundColor: theme.chip }]}>
        <Icon name="check" color={theme.green} size={32} />
      </View>
      <ThemedText type="headline" accessibilityRole="header">
        That&apos;s your {FREE_DECISIONS_PER_WEEK} free dinners this week
      </ThemedText>
      <ThemedText color="body">They come back on Monday. Or let us decide every night.</ThemedText>

      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <ThemedText type="overline" color="accent">
          PREMIUM
        </ThemedText>
        {PERKS.map((perk) => (
          <View key={perk} style={styles.perk}>
            <Icon name="check" color={theme.green} size={18} />
            <ThemedText>{perk}</ThemedText>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 40 },
  center: { textAlign: 'center' },
  check: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 14,
  },
  perk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
