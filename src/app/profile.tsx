import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { Chip, Segmented } from '@/components/chip';
import { Screen, ScreenHeader, goBack } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

const TIMES = ['15 min', '30 min', '45 min', '60 min'] as const;
const SPICE = ['Mild', 'Medium', 'Hot'] as const;
const CUISINES = ['Italian', 'Asian', 'Mexican', 'Home-style', 'Indian'];
const MOOD_STEPS = 5;

export default function ProfileScreen() {
  const theme = useTheme();
  // TODO: load and save the household profile in Supabase.
  const [people, setPeople] = useState(4);
  const [avoid, setAvoid] = useState('Kids: no mushrooms');
  const [allergies, setAllergies] = useState('Nuts');
  const [time, setTime] = useState<string>('30 min');
  const [spice, setSpice] = useState<string>('Medium');
  const [cuisines, setCuisines] = useState(['Italian', 'Asian', 'Home-style']);
  const [mood, setMood] = useState(1);

  const toggleCuisine = (c: string) =>
    setCuisines((list) => (list.includes(c) ? list.filter((x) => x !== c) : [...list, c]));

  const input = [styles.input, { color: theme.ink2 }];
  const divider = { borderBottomWidth: 1, borderBottomColor: theme.divider };

  return (
    <Screen
      header={<ScreenHeader title="Your household" subtitle="Set once. Every dinner fits it." />}
      footer={<Button variant="strong" label="Save" onPress={goBack} />}>
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <View style={[styles.cardRow, divider]}>
          <ThemedText style={styles.rowLabel}>People</ThemedText>
          <View style={styles.stepper}>
            <StepperButton
              label="−"
              a11y="Fewer people"
              onPress={() => setPeople((n) => Math.max(1, n - 1))}
            />
            <ThemedText style={styles.count}>{people}</ThemedText>
            <StepperButton
              label="+"
              a11y="More people"
              onPress={() => setPeople((n) => Math.min(12, n + 1))}
            />
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/family')}
          style={[styles.cardRow, divider]}>
          <ThemedText style={styles.rowLabel}>Family members</ThemedText>
          <ThemedText type="small" color="green" style={styles.link}>
            Edit each person ›
          </ThemedText>
        </Pressable>
        <View style={[styles.field, divider]}>
          <ThemedText style={styles.rowLabel} nativeID="avoid-label">
            Picky eaters / avoid
          </ThemedText>
          <TextInput
            accessibilityLabelledBy="avoid-label"
            accessibilityLabel="Picky eaters / avoid"
            value={avoid}
            onChangeText={setAvoid}
            style={input}
          />
        </View>
        <View style={styles.field}>
          <ThemedText style={styles.rowLabel} nativeID="allergy-label">
            Allergies
          </ThemedText>
          <TextInput
            accessibilityLabelledBy="allergy-label"
            accessibilityLabel="Allergies"
            value={allergies}
            onChangeText={setAllergies}
            style={input}
          />
        </View>
      </View>

      <View style={styles.group}>
        <ThemedText type="label">Weeknight cooking time</ThemedText>
        <Segmented options={TIMES} value={time} onChange={setTime} />
      </View>

      <View style={styles.group}>
        <ThemedText type="label">Spice level</ThemedText>
        <Segmented options={SPICE} value={spice} onChange={setSpice} tone="accent" />
      </View>

      <View style={styles.group}>
        <ThemedText type="label">Favorite cuisines</ThemedText>
        <View style={styles.chips}>
          {CUISINES.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={cuisines.includes(c)}
              onPress={() => toggleCuisine(c)}
            />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <ThemedText type="label">Comfort food or adventurous?</ThemedText>
        {/* A tap-to-pick scale instead of a drag slider: no extra package needed. */}
        <View
          style={styles.scale}
          accessibilityRole="adjustable"
          accessibilityValue={{ min: 0, max: MOOD_STEPS - 1, now: mood }}>
          <View style={[styles.track, { backgroundColor: theme.line3 }]} />
          {Array.from({ length: MOOD_STEPS }, (_, i) => (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`Level ${i + 1} of ${MOOD_STEPS}`}
              onPress={() => setMood(i)}
              style={styles.dotHit}>
              <View
                style={[
                  styles.dot,
                  i === mood
                    ? { backgroundColor: theme.green, width: 26, height: 26, borderRadius: 13 }
                    : { backgroundColor: theme.surface, borderColor: theme.line3, borderWidth: 2 },
                ]}
              />
            </Pressable>
          ))}
        </View>
        <View style={styles.scaleLabels}>
          <ThemedText type="caption" color="ink2">
            Comfort
          </ThemedText>
          <ThemedText type="caption" color="ink2">
            Adventurous
          </ThemedText>
        </View>
      </View>
    </Screen>
  );
}

function StepperButton({
  label,
  a11y,
  onPress,
}: {
  label: string;
  a11y: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      hitSlop={6}
      style={[styles.stepButton, { borderColor: theme.line3, backgroundColor: theme.surface }]}>
      <ThemedText style={styles.stepLabel}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  cardRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 16,
  },
  link: {
    fontWeight: 500,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  count: {
    fontSize: 18,
    fontWeight: 700,
    minWidth: 20,
    textAlign: 'center',
  },
  stepButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 18,
    lineHeight: 22,
  },
  field: {
    paddingVertical: 10,
    gap: 4,
  },
  input: {
    fontSize: 15,
    padding: 0,
  },
  group: {
    gap: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scale: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  track: {
    position: 'absolute',
    left: 22,
    right: 22,
    height: 4,
    borderRadius: 2,
  },
  dotHit: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
