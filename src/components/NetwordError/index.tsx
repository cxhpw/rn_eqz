import { Center } from 'native-base';
import { Text } from '@/components';
import NetInfo from '@react-native-community/netinfo';
import { useStore } from '@/store';

const Index = () => {
  const setNetwork = useStore(state => state.setNetwork);
  const fetchAppConfig = useStore(state => state.fetchAppConfig);
  return (
    <Center flex={1}>
      <Text>网络不好</Text>
      <Text
        onPress={() => {
          NetInfo.fetch().then(state => {
            setNetwork(state.isConnected as boolean);
          });
          // setNetwork(true);
          // fetchAppConfig();
        }}>
        请点击重试
      </Text>
    </Center>
  );
};

export default Index;
