import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BigButton } from '@/components/big-button';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function CaptureScreen() {
  const theme = useTheme();

  return (
    <Screen
      footer={
        <>
          {/* TODO: open the camera (needs expo-image-picker — ask before installing). */}
          <BigButton label="📷 Take a photo" variant="secondary" onPress={() => {}} disabled />
          <BigButton label="Next: check ingredients" onPress={() => router.push('/confirm')} />
        </>
      }>
      <ThemedText type="title">Show us your food</ThemedText>
      <ThemedText themeColor="textSecondary">
        Take a few photos: fridge, freezer, pantry. Open the doors wide.
      </ThemedText>

      <View style={[styles.placeholder, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText themeColor="textSecondary" style={styles.center}>
          Your photos will appear here.{'\n'}(Camera coming soon)
        </ThemedText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    minHeight: 200,
    borderRadius: Radius,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  center: {
    textAlign: 'center',
  },
});
