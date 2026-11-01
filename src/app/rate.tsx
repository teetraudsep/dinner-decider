import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { placeholderDinners } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

const TAGS = [
  'Kids loved it',
  'Make again',
  'Too spicy',
  'Too bland',
  'Took too long',
  'Not again',
];

export default function RateScreen() {
  const theme = useTheme();
  const { d } = useLocalSearchParams<{ d?: string }>();
  const dinner = placeholderDinners[Number(d) || 0] ?? placeholderDinners[0];

  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const toggle = (tag: string) =>
    setTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));

  const goHome = () => router.dismissTo('/');

  // TODO: save the rating to Supabase.
  const save = () => {
    goHome();
    router.push('/history');
  };

  return (
    <Screen
      gap={22}
      contentStyle={styles.content}
      footer={
        <>
          <Button label="Save rating" onPress={save} disabled={rating === 0} />
          <Button label="Skip" variant="link" onPress={goHome} />
        </>
      }>
      <View style={styles.titleBlock}>
        <ThemedText type="overline" color="ink2">
          HOW WAS DINNER?
        </ThemedText>
        <ThemedText type="title" style={styles.title} accessibilityRole="header">
          {dinner.name}
        </ThemedText>
      </View>

      <View style={styles.stars} accessibilityRole="radiogroup" accessibilityLabel="Rating">
        {[1, 2, 3, 4, 5].map((i) => (
          <Pressable
            key={i}
            accessibilityRole="radio"
            accessibilityLabel={`${i} star${i > 1 ? 's' : ''}`}
            accessibilityState={{ checked: rating === i }}
            onPress={() => setRating(i)}
            style={[styles.star, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <Icon
              name={i <= rating ? 'starFilled' : 'star'}
              color={i <= rating ? theme.star : theme.starLine}
              size={30}
            />
          </Pressable>
        ))}
      </View>

      <View style={styles.group}>
        <ThemedText type="label">Anything to remember?</ThemedText>
        <View style={styles.chips}>
          {TAGS.map((tag) => (
            <Chip key={tag} label={tag} selected={tags.includes(tag)} onPress={() => toggle(tag)} />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <ThemedText type="label" nativeID="note-label">
          Note (optional)
        </ThemedText>
        <TextInput
          accessibilityLabelledBy="note-label"
          accessibilityLabel="Note (optional)"
          value={note}
          onChangeText={setNote}
          multiline
          placeholder="e.g. add more lemon next time"
          placeholderTextColor={theme.ink3}
          style={[
            styles.note,
            { backgroundColor: theme.surface, borderColor: theme.line3, color: theme.ink },
          ]}
        />
      </View>

      <ThemedText type="caption" color="ink2">
        Your ratings shape future suggestions.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 32 },
  titleBlock: { gap: 6 },
  title: { fontSize: 30, lineHeight: 33 },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  star: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: { gap: 10 },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  note: {
    minHeight: 84,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
