// import { useTheme } from '@shopify/restyle';
import { Container } from '@/components';
import { ActivityIndicator, View, Text } from 'react-native';
// import { AppTheme } from 'theme';

export default function Fallback() {
  // const theme = useTheme<AppTheme>();
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating size="large" />
        <Text>页面加载中...</Text>
      </View>
    </Container>
  );
}
