import { Container } from '@/components';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Index = ({
  route,
  navigation,
}: NativeStackScreenProps<AppParamList, 'WebView'>) => {
  console.log();
  const handleNavigationStateChange = (navState: any) => {
    navigation.setOptions({
      title: navState.title,
    });
  };
  return (
    <Container>
      <WebView
        onNavigationStateChange={handleNavigationStateChange}
        source={{ uri: route.params.url }}
      />
    </Container>
  );
};

Index.displayName = 'WebView';

export default Index;
