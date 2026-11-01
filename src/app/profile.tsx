import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { Chip, Segmented } from '@/components/chip';
import { Screen, ScreenHeader, goBack } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/lib/auth';
import { DEFAULT_PROFILE, loadProfile, parseList, saveProfile, type Profile } from '@/lib/profile';
import { supabase } from '@/lib/supabase';

const TIMES = ['15 min', '30 min', '45 min', '60 min'] as const;
const SPICE = ['Mild', 'Medium', 'Hot'] as const;
const CUISINES = ['Italian', 'Asian', 'Mexican', 'Home-style', 'Indian'];
const MOOD_STEPS = 5;

const timeLabel = (m: number) => `${m} min`;
const spiceLabel = (s: Profile['spiceLevel']) => s[0].toUpperCase() + s.slice(1);

function errorText(e: unknown) {
  const msg = (e as { message?: string }).message ?? String(e);
  if (/profiles/.test(msg) && /(does not exist|could not find)/i.test(msg)) {
    return 'The profiles table is missing. Run the SQL from supabase/migrations in the Supabase SQL Editor.';
  }
  return msg;
}

export default function ProfileScreen() {
  const theme = useTheme();
  const { session } = useAuth();
  const userId = session?.user.id;
  const d = DEFAULT_PROFILE;

  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [people, setPeople] = useState(d.householdSize);
  const [avoid, setAvoid] = useState(d.pickyEaters);
  const [allergies, setAllergies] = useState('');
  const [time, setTime] = useState<string>(timeLabel(d.weeknightMinutes));
  const [spice, setSpice] = useState<string>(spiceLabel(d.spiceLevel));
  const [cuisines, setCuisines] = useState(d.favoriteCuisines);
  const [mood, setMood] = useState(d.adventurousness);

  useEffect(() => {
    if (!userId) return;
    loadProfile(userId)
      .then((p) => {
        setPeople(p.householdSize);
        setAvoid(p.pickyEaters);
        setAllergies(p.allergies.join(', '));
        setTime(timeLabel(p.weeknightMinutes));
        setSpice(spiceLabel(p.spiceLevel));
        setCuisines(p.favoriteCuisines);
        setMood(p.adventurousness);
      })
      .catch((e) => Alert.alert('Could not load your profile', errorText(e)))
      .finally(() => setLoaded(true));
  }, [userId]);

  const save = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      await saveProfile(userId, {
        householdSize: people,
        pickyEaters: avoid,
        allergies: parseList(allergies),
        weeknightMinutes: parseInt(time, 10) as Profile['weeknightMinutes'],
        spiceLevel: spice.toLowerCase() as Profile['spiceLevel'],
        favoriteCuisines: cuisines,
        adventurousness: mood,
      });
      goBack();
    } catch (e) {
      Alert.alert('Could not save', errorText(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleCuisine = (c: string) =>
    setCuisines((list) => (list.includes(c) ? list.filter((x) => x !== c) : [...list, c]));

  const input = [styles.input, { color: theme.ink2 }];
  const divider = { borderBottomWidth: 1, borderBottomColor: theme.divider };

  if (!loaded) {
    return (
      <Screen header={<ScreenHeader title="Your household" />}>
        <ActivityIndicator color={theme.accent} style={styles.loading} />
      </Screen>
    );
  }

  return (
    <Screen
      header={<ScreenHeader title="Your household" subtitle="Set once. Every dinner fits it." />}
      footer={
        <Button
          variant="strong"
          label={saving ? 'Saving…' : 'Save'}
          onPress={save}
          disabled={saving}
        />
      }>
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
            placeholder="e.g. nuts, shellfish (comma-separated)"
            placeholderTextColor={theme.ink3}
            style={input}
          />
          <ThemedText type="caption" color="alertText">
            Never in any dinner we suggest.
          </ThemedText>
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

      <View style={styles.account}>
        <ThemedText type="caption" color="ink3">
          Signed in as {session?.user.email ?? 'Apple ID'}
        </ThemedText>
        <Button label="Sign out" variant="link" onPress={() => supabase.auth.signOut()} />
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
  loading: { marginTop: 48 },
  account: { alignItems: 'center', marginTop: 8 },
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
