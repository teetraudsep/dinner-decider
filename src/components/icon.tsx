import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';

/**
 * Every icon the app uses, by meaning. iPhone shows Apple's SF Symbols;
 * Android and the web preview show the matching Material icon.
 */
const ICONS = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  person: { ios: 'person', android: 'person', web: 'person' },
  camera: { ios: 'camera', android: 'photo_camera', web: 'photo_camera' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  lock: { ios: 'lock.fill', android: 'lock', web: 'lock' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  plus: { ios: 'plus', android: 'add', web: 'add' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  star: { ios: 'star', android: 'star', web: 'star' },
  starFilled: { ios: 'star.fill', android: 'star', web: 'star' },
  again: { ios: 'arrow.counterclockwise', android: 'replay', web: 'replay' },
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  color: ColorValue;
  size?: number;
};

export function Icon({ name, color, size = 20 }: IconProps) {
  return <SymbolView name={ICONS[name]} tintColor={color} size={size} />;
}
