import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ScreenPadding } from '@/constants/theme';
import { FREE_DECISIONS_PER_WEEK, placeholderDecisionsLeft } from '@/data/placeholder';
import { useTheme } from '@/hooks/use-theme';

/** "Thursday evening" */
function greeting(now = new Date()) {
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const hour = now.getHours();
  const part = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  return `${day} ${part}`;
}

export default function HomeScreen() {
  const theme = useTheme();
  const left = placeholderDecisionsLeft;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <View style={styles.topBar}>
        <View style={styles.topText}>
          <ThemedText type="small" color="ink3">
            {greeting()}
          </ThemedText>
          <ThemedText type="brand">Dinner Decider</ThemedText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile and settings"
          onPress={() => router.push('/profile')}
          style={[styles.profile, { backgroundColor: theme.surface, borderColor: theme.line2 }]}>
          <Icon name="person" color={theme.ink} size={22} />
        </Pressable>
      </View>

      <View style={styles.center}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="What's for dinner? Take photos of your fridge"
          onPress={() => router.push(left > 0 ? '/capture' : '/limit')}
          style={({ pressed }) => [
            styles.bigCircle,
            { backgroundColor: theme.accent },
            pressed && styles.pressed,
          ]}>
          <Icon name="camera" color={theme.onAccent} size={44} />
          <ThemedText type="headline" color="onAccent" style={styles.circleText}>
            {"What's for\ndinner?"}
          </ThemedText>
        </Pressable>
        <ThemedText color="ink2" style={styles.tagline}>
          Snap your fridge. We&apos;ll decide.
        </ThemedText>
      </View>

      <View style={styles.bottom}>
        <ThemedText type="small" color="ink2" style={styles.textCenter}>
          {left} of {FREE_DECISIONS_PER_WEEK} free dinners left this week
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Weekly planner, Premium"
          onPress={() => router.push('/planner')}
          style={[styles.row, { backgroundColor: theme.surface, borderColor: theme.line2 }]}>
          <View style={styles.rowLeft}>
            <Icon name="calendar" color={theme.ink} size={20} />
            <ThemedText style={styles.rowLabel}>Weekly planner</ThemedText>
          </View>
          <Icon name="lock" color={theme.ink3} size={16} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: ScreenPadding,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  topText: {
    gap: 2,
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  bigCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    shadowColor: '#B03D1A',
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 18 },
    elevation: 10,
  },
  circleText: {
    fontSize: 30,
    lineHeight: 33,
    textAlign: 'center',
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  tagline: {
    textAlign: 'center',
  },
  bottom: {
    gap: 14,
    paddingBottom: 16,
  },
  textCenter: {
    textAlign: 'center',
  },
  row: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLabel: {
    fontWeight: 500,
  },
});
