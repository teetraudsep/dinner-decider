import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Screen, ScreenHeader, goBack } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { placeholderFamily } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

export default function FamilyScreen() {
  const theme = useTheme();
  // TODO: load and save family members in Supabase.
  const [members, setMembers] = useState(placeholderFamily);

  const setEating = (name: string, eating: boolean) =>
    setMembers((list) => list.map((m) => (m.name === name ? { ...m, eating } : m)));

  const tag = (bg: string) => [styles.tag, { backgroundColor: bg }];

  return (
    <Screen
      gap={10}
      header={<ScreenHeader title="Your family" subtitle="Toggle who's eating tonight" />}
      footer={<Button variant="strong" label="Save family" onPress={goBack} />}>
      {members.map((m) => (
        <View
          key={m.name}
          style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <View style={styles.top}>
            <View style={[styles.avatar, { backgroundColor: m.tint }]}>
              <ThemedText style={styles.initial}>{m.initial}</ThemedText>
            </View>
            <View style={styles.flex}>
              <ThemedText style={styles.bold}>{m.name}</ThemedText>
              <ThemedText type="caption" color="ink2">
                {m.age}
              </ThemedText>
            </View>
            <View style={styles.tonight}>
              <ThemedText type="caption" color="ink2">
                Tonight
              </ThemedText>
              <Switch
                accessibilityLabel={`${m.name} is eating tonight`}
                value={m.eating}
                onValueChange={(v) => setEating(m.name, v)}
                trackColor={{ true: theme.green, false: theme.line3 }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
          <View style={styles.tags}>
            {m.likes.map((l) => (
              <ThemedText key={l} type="caption" color="chipText" style={tag(theme.chip)}>
                Likes {l}
              </ThemedText>
            ))}
            {m.avoid.map((a) => (
              <ThemedText key={a} type="caption" color="avoidText" style={tag(theme.avoidBg)}>
                No {a}
              </ThemedText>
            ))}
            {m.allergy ? (
              <ThemedText type="caption" style={[tag(theme.allergy), styles.allergy]}>
                Allergy: {m.allergy}
              </ThemedText>
            ) : null}
          </View>
        </View>
      ))}

      {/* TODO: add-member form. */}
      <Pressable
        accessibilityRole="button"
        onPress={() => {}}
        style={[styles.add, { borderColor: theme.dashed }]}>
        <Icon name="plus" color={theme.ink} size={18} />
        <ThemedText style={styles.addLabel}>Add family member</ThemedText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bold: { fontWeight: 700 },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    paddingLeft: 16,
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: '#1B2620',
    fontWeight: 700,
  },
  tonight: {
    alignItems: 'center',
    gap: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontSize: 13,
    fontWeight: 500,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  allergy: {
    color: '#FFFFFF',
    fontWeight: 700,
  },
  add: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addLabel: {
    fontSize: 16,
    fontWeight: 500,
  },
});
