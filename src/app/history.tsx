import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { Icon } from '@/components/icon';
import { Screen, ScreenHeader } from '@/components/screen';
import { Stars } from '@/components/stars';
import { ThemedText } from '@/components/themed-text';
import { placeholderDinners, placeholderHistory } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

const FILTERS = {
  All: () => true,
  Loved: (stars: number) => stars >= 4,
  'Not again': (stars: number) => stars <= 2,
} as const;

type Filter = keyof typeof FILTERS;

export default function HistoryScreen() {
  const theme = useTheme();
  const [filter, setFilter] = useState<Filter>('All');
  const meals = placeholderHistory.filter((m) => FILTERS[filter](m.stars));

  return (
    <Screen header={<ScreenHeader title="Past dinners" onBack={() => router.dismissTo('/')} />}>
      <View style={styles.filters}>
        {(Object.keys(FILTERS) as Filter[]).map((f) => (
          <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
        ))}
      </View>

      {/* TODO: show this card only when tonight's dinner has no rating yet. */}
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push({ pathname: '/rate', params: { d: 0 } })}
        style={[styles.tonight, { backgroundColor: theme.alertBg, borderColor: theme.alertLine }]}>
        <View style={styles.flex}>
          <ThemedText type="overline" color="alertText">
            TONIGHT · NOT RATED YET
          </ThemedText>
          <ThemedText style={styles.bold}>{placeholderDinners[0].name}</ThemedText>
        </View>
        <View style={[styles.rateIt, { backgroundColor: theme.accent }]}>
          <ThemedText type="small" color="onAccent" style={styles.bold}>
            Rate it
          </ThemedText>
        </View>
      </Pressable>

      <View style={styles.list}>
        <ThemedText type="overline" color="ink2">
          THIS WEEK
        </ThemedText>
        {meals.length === 0 ? (
          <ThemedText type="small" color="ink2">
            Nothing here yet.
          </ThemedText>
        ) : null}
        {meals.map((meal) => (
          <View
            key={meal.dish}
            style={[styles.meal, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <View style={styles.mealText}>
              <ThemedText style={[styles.bold, styles.mealName]}>{meal.dish}</ThemedText>
              <View style={styles.mealMeta}>
                <Stars value={meal.stars} />
                <ThemedText type="caption" color="ink2">
                  {meal.when}
                </ThemedText>
              </View>
              {meal.note ? (
                <ThemedText type="caption" color="ink2" style={styles.note}>
                  “{meal.note}”
                </ThemedText>
              ) : null}
            </View>
            {/* TODO: start cooking this dinner again. */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Cook ${meal.dish} again`}
              onPress={() => router.push('/suggestion')}
              style={[styles.again, { borderColor: theme.line3, backgroundColor: theme.surface }]}>
              <Icon name="again" color={theme.green} size={18} />
            </Pressable>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bold: { fontWeight: 700 },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  tonight: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rateIt: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    justifyContent: 'center',
  },
  list: {
    gap: 8,
  },
  meal: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mealText: {
    flex: 1,
    gap: 4,
  },
  mealName: {
    fontSize: 16,
  },
  mealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  note: {
    fontStyle: 'italic',
  },
  again: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
