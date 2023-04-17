import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Index: React.FC<NativeStackScreenProps<AppParamList, 'OrderDetail'>> = ({
  route,
}) => {
  return (
    <View>
      <Text>{JSON.stringify(route, null, 4)}</Text>
    </View>
  );
};

export default Index;
