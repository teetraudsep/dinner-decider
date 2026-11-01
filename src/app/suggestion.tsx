import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Screen, ScreenHeader } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { placeholderDinners } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function SuggestionScreen() {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const dinner = placeholderDinners[index];

  const pill = [styles.pill, { backgroundColor: theme.surface, borderColor: theme.line }];

  return (
    <Screen
      header={<ScreenHeader title="Tonight's dinner" layout="center" />}
      gap={22}
      footer={
        <>
          <Button
            label="Cook this"
            onPress={() => router.push({ pathname: '/cooking', params: { d: index } })}
          />
          {/* TODO: ask the Edge Function for a different dinner. */}
          <Button
            label="Something else"
            variant="link"
            onPress={() => setIndex((i) => (i + 1) % placeholderDinners.length)}
          />
        </>
      }>
      <View style={[styles.dish, { backgroundColor: theme.dishBg }]}>
        <ThemedText type="small" color="dishText">
          [Dish photo]
        </ThemedText>
      </View>

      <View style={styles.details}>
        <ThemedText type="hero" accessibilityRole="header">
          {dinner.name}
        </ThemedText>
        <View style={styles.pills}>
          <View style={pill}>
            <Icon name="clock" color={theme.ink} size={15} />
            <ThemedText type="small" style={styles.pillText}>
              {dinner.minutes} min
            </ThemedText>
          </View>
          <View style={pill}>
            <ThemedText type="small" style={styles.pillText}>
              Serves {dinner.serves}
            </ThemedText>
          </View>
          <View style={pill}>
            <ThemedText type="small" style={styles.pillText}>
              {dinner.spice}
            </ThemedText>
          </View>
        </View>
        <ThemedText color="body">{dinner.why}</ThemedText>
        <ThemedText type="small" color="ink2">
          {dinner.toBuy}
        </ThemedText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dish: {
    height: 230,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    gap: 12,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pillText: {
    fontWeight: 500,
  },
});
