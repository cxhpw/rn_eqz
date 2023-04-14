import { useTheme } from '@shopify/restyle';
import { Text } from '@/components';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export default function Fallback() {
  const theme = useTheme<AppTheme>();
  return (
    <View
      style={[
        { flex: 1, justifyContent: 'center', alignItems: 'center' },
        StyleSheet.absoluteFill,
        {
          backgroundColor:
            theme.theme === 'dark' ? 'rgba(0,0,0,.4)' : 'rgba(255,255,255,.4)',
        },
      ]}>
      <ActivityIndicator
        animating
        size="large"
        color={theme.colors.primary200}
      />
      <Text mt="2.5">页面加载中...</Text>
    </View>
  );
}
