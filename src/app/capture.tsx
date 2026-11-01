import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { BackButton } from '@/components/screen';
import { CameraColors as C, Colors } from '@/constants/theme';

const ACCENT = Colors.light.accent;

/**
 * Camera screen, always dark. The real camera comes later
 * (needs expo-image-picker or expo-camera — ask before installing).
 * For now the shutter just adds a placeholder photo.
 */
export default function CaptureScreen() {
  const [photos, setPhotos] = useState(['Fridge', 'Pantry']);

  const addPhoto = () => setPhotos((p) => [...p, `Photo ${p.length + 1}`]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <BackButton background="rgba(255,255,255,0.12)" borderColor="transparent" color={C.text} />
        <Text style={styles.headerTitle}>Fridge, pantry, shelves</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.viewfinder}>
        <Icon name="camera" color={C.muted} size={40} />
        <Text style={styles.viewfinderText}>Camera coming soon</Text>
        <Text style={styles.tip}>Tip: open the door wide, lights on</Text>
      </View>

      <View style={styles.thumbs}>
        {photos.slice(-3).map((label, i) => (
          <View
            key={label}
            style={[styles.thumb, { backgroundColor: i % 2 ? C.thumbPantry : C.thumbFridge }]}>
            <Text style={styles.thumbLabel} numberOfLines={1}>
              {label}
            </Text>
          </View>
        ))}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add another photo"
          onPress={addPhoto}
          style={[styles.thumb, styles.thumbAdd]}>
          <Icon name="plus" color={C.faint} size={22} />
        </Pressable>
        <Text style={styles.count}>
          {photos.length} photo{photos.length === 1 ? '' : 's'}
        </Text>
      </View>

      <View style={styles.controls}>
        {/* TODO: pick from photo library (needs expo-image-picker). */}
        <Pressable accessibilityRole="button" style={styles.library} onPress={addPhoto}>
          <Text style={styles.libraryText}>From library</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Take photo"
          onPress={addPhoto}
          style={({ pressed }) => [styles.shutter, pressed && { opacity: 0.7 }]}>
          <View style={styles.shutterInner} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/confirm')}
          disabled={photos.length === 0}
          style={styles.done}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
    paddingHorizontal: 20,
    gap: 18,
  },
  header: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: C.text,
    fontSize: 17,
    fontWeight: 500,
  },
  spacer: { width: 44 },
  viewfinder: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: C.panel,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: C.dashed,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  viewfinderText: { color: C.muted, fontSize: 15 },
  tip: { color: C.faint, fontSize: 14 },
  thumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 6,
    paddingHorizontal: 4,
  },
  thumbLabel: { color: '#E4EAE6', fontSize: 12 },
  thumbAdd: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: C.dashed,
    justifyContent: 'center',
    paddingBottom: 0,
  },
  count: { marginLeft: 'auto', color: C.muted, fontSize: 14 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  library: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.dashed,
    justifyContent: 'center',
  },
  libraryText: { color: C.text, fontSize: 15 },
  shutter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: C.text,
    padding: 4,
  },
  shutterInner: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: C.text,
  },
  done: {
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 24,
    backgroundColor: ACCENT,
    justifyContent: 'center',
  },
  doneText: { color: '#FFFFFF', fontSize: 16, fontWeight: 700 },
});
