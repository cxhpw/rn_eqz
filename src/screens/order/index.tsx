import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Order = () => {
  const { params } =
    useRoute<NativeStackScreenProps<AppParamList, 'Order'>['route']>();
  return <View style={{ flex: 1 }}></View>;
};

export default Order;
