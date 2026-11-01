import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BigButton } from '@/components/big-button';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ButtonHeight, Radius, Spacing } from '@/constants/theme';
import { placeholderIngredients } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function ConfirmScreen() {
  const theme = useTheme();
  const [ingredients, setIngredients] = useState(placeholderIngredients);

  const remove = (item: string) => setIngredients((list) => list.filter((i) => i !== item));

  return (
    <Screen
      footer={
        <BigButton
          label="Looks good, pick dinner"
          onPress={() => router.push('/suggestion')}
          disabled={ingredients.length === 0}
        />
      }>
      <ThemedText type="title">Is this right?</ThemedText>
      <ThemedText themeColor="textSecondary">Tap ✕ to remove anything we got wrong.</ThemedText>

      <View style={styles.list}>
        {ingredients.map((item) => (
          <View key={item} style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="large" style={styles.rowText}>
              {item}
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item}`}
              hitSlop={12}
              onPress={() => remove(item)}
              style={styles.remove}>
              <ThemedText type="large" themeColor="textSecondary">
                ✕
              </ThemedText>
            </Pressable>
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
    minHeight: ButtonHeight - 8,
    borderRadius: Radius,
    paddingLeft: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
  },
  remove: {
    width: ButtonHeight - 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
