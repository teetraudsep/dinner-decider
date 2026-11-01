import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { BackButton, Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { placeholderDinners } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function CookingScreen() {
  const theme = useTheme();
  const { d } = useLocalSearchParams<{ d?: string }>();
  const index = Number(d) || 0;
  const dinner = placeholderDinners[index] ?? placeholderDinners[0];

  return (
    <Screen
      background="surface"
      gap={18}
      header={
        <View style={styles.header}>
          <BackButton background={theme.bg} borderColor="transparent" />
          <View>
            <ThemedText type="brand" style={styles.title}>
              {dinner.shortName}
            </ThemedText>
            <ThemedText type="caption" color="ink2">
              {dinner.minutes} min
            </ThemedText>
          </View>
        </View>
      }
      footer={
        <Button
          variant="strong"
          label="Done — enjoy dinner"
          onPress={() => router.push({ pathname: '/rate', params: { d: index } })}
        />
      }>
      <View style={[styles.uses, { backgroundColor: theme.bg }]}>
        <ThemedText type="overline" color="ink2">
          YOU&apos;LL USE
        </ThemedText>
        <ThemedText style={styles.usesText}>{dinner.uses}</ThemedText>
      </View>

      <View style={styles.steps} accessibilityRole="list">
        {dinner.steps.map((step, i) => (
          <View key={step} style={styles.step}>
            <View style={[styles.badge, { backgroundColor: theme.badge }]}>
              <ThemedText color="onAccent" style={styles.badgeText}>
                {i + 1}
              </ThemedText>
            </View>
            <ThemedText style={styles.stepText}>{step}</ThemedText>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    lineHeight: 25,
  },
  uses: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 6,
  },
  usesText: {
    fontSize: 16,
    lineHeight: 24,
  },
  steps: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 16,
    fontWeight: 700,
  },
  stepText: {
    flex: 1,
    fontSize: 19,
    lineHeight: 27,
  },
});
