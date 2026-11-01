import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Screen, ScreenHeader } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { placeholderIngredients, type Ingredient } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function ConfirmScreen() {
  const theme = useTheme();
  const [items, setItems] = useState<Ingredient[]>(placeholderIngredients);
  const [draft, setDraft] = useState('');

  const remove = (name: string) => setItems((list) => list.filter((i) => i.name !== name));

  const add = () => {
    const names = draft
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s && !items.some((i) => i.name.toLowerCase() === s.toLowerCase()));
    if (names.length) setItems((list) => [...list, ...names.map((name) => ({ name, qty: '' }))]);
    setDraft('');
  };

  return (
    <Screen
      header={<ScreenHeader title="Here's what we found" />}
      gap={8}
      footer={
        <Button
          label="Decide dinner"
          onPress={() => router.push('/suggestion')}
          disabled={items.length === 0}
        />
      }>
      <ThemedText color="ink2" style={styles.intro}>
        Remove anything wrong, add what we missed.
      </ThemedText>

      {items.map((item) => (
        <View
          key={item.name}
          style={[styles.row, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          {item.qty ? (
            <ThemedText type="caption" color="ink3">
              {item.qty}
            </ThemedText>
          ) : null}
          {item.maybe ? (
            <ThemedText
              type="caption"
              color="maybeText"
              style={[styles.maybe, { backgroundColor: theme.maybeBg }]}>
              MAYBE
            </ThemedText>
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.name}`}
            onPress={() => remove(item.name)}
            style={styles.remove}>
            <Icon name="close" color={theme.ink3} size={16} />
          </Pressable>
        </View>
      ))}

      <ThemedText type="caption" color="ink2" style={styles.addLabel} nativeID="add-label">
        Add something we missed
      </ThemedText>
      <TextInput
        accessibilityLabelledBy="add-label"
        accessibilityLabel="Add something we missed"
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={add}
        returnKeyType="done"
        placeholder="e.g. rice, garlic"
        placeholderTextColor={theme.ink3}
        style={[styles.input, { borderColor: theme.dashed, color: theme.ink }]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginBottom: 10,
  },
  row: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontWeight: 500,
  },
  maybe: {
    fontSize: 12,
    fontWeight: 700,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  remove: {
    marginLeft: 'auto',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: {
    marginTop: 10,
  },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
