import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Tabs } from '@/components';

function TestSc({ title }) {
  return (
    <View style={{ height: 500 }}>
      <Text>{title}</Text>
    </View>
  );
}
const Order = () => {
  const { params } =
    useRoute<NativeStackScreenProps<AppParamList, 'Order'>['route']>();
  const scenes01 = [
    {
      key: 'first',
      title: '商品详情',
      scene: () => <TestSc title="商品详情" />,
    },
    {
      key: 'sec',
      title: '租赁规则',
      scene: () => <TestSc title="租赁规则" />,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Tabs scenes={scenes01} swipeEnabled />
    </View>
  );
};

export default Order;
