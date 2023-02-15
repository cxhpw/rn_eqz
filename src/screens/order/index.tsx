import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Order = () => {
  const { params } =
    useRoute<NativeStackScreenProps<AppParamList, 'Order'>['route']>();
  return (
    <View>
      <Text>Order{params.code}</Text>
    </View>
  );
};

export default Order;
