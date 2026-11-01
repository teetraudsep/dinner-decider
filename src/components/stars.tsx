import { View } from 'react-native';

import { Icon } from '@/components/icon';
import { useTheme } from '@/hooks/use-theme';

/** Read-only row of 5 small stars. */
export function Stars({ value, size = 15 }: { value: number; size?: number }) {
  const theme = useTheme();
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${value} of 5 stars`}
      style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name={i <= value ? 'starFilled' : 'star'}
          color={i <= value ? theme.star : theme.starLine}
          size={size}
        />
      ))}
    </View>
  );
}
