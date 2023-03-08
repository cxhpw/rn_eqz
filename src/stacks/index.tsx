import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from 'react-native-config';

import TabScreen from './tabStack';
import Detail from '@/screens/detail';
import Order from '@/screens/order';
import Help from '@/screens/help';
import Calendar from '@/screens/calendar';
import OrderSubmit from '@/screens/map';
import Company from '@/screens/company';
import Complaint from '@/screens/complaint';
import Address from '@/screens/address';

const Stack = createNativeStackNavigator<AppParamList>();
const MAIN_SCREENS = [
  {
    name: 'Tab',
    component: TabScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Detail',
    component: Detail,
    options: {
      title: Config.APP_DISPLAY_NAME,
    },
  },
  {
    name: 'Order',
    component: Order,
    options: {
      title: '我的订单',
    },
  },
  {
    name: 'OrderSubmit',
    component: OrderSubmit,
    options: {
      title: '确定订单',
    },
  },
  {
    name: 'Calendar',
    component: Calendar,
    options: {
      title: '选择日期',
    },
  },
];
const COMMON_SCREENS = [
  {
    name: 'Help',
    component: Help,
    options: {
      title: '帮助中心',
    },
  },
  {
    name: 'Company',
    component: Company,
    options: {
      title: '企业租赁',
    },
  },
  {
    name: 'Complaint',
    component: Complaint,
    options: {
      title: '投诉建议',
    },
  },
  {
    name: 'AddressCenter',
    component: Address,
    options: {
      title: '地址管理',
    },
  },
  {
    name: 'Address',
    component: Address,
    options: {
      title: '地址中心',
    },
  },
];
export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        animation: 'slide_from_right',
        headerTitleAlign: 'center',
        animationDuration: 400,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerBackTitle: '',
      }}>
      <Stack.Group
        screenOptions={{
          presentation: 'card',
        }}>
        {MAIN_SCREENS.map(screen => {
          //@ts-ignore
          return <Stack.Screen key={screen.name} {...screen} />;
        })}
      </Stack.Group>
      <Stack.Group>
        {COMMON_SCREENS.map(screen => {
          //@ts-ignore
          return <Stack.Screen key={screen.name} {...screen} />;
        })}
      </Stack.Group>
    </Stack.Navigator>
  );
};
