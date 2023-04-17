import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Index: React.FC<NativeStackScreenProps<AppParamList, 'OrderDetail'>> = ({
  route,
}) => {
  return (
    <View>
      <Text>{JSON.stringify(route, null, 4)}</Text>
    </View>
  );
};

Index.displayName = 'OrderDetail';

export default Index;
