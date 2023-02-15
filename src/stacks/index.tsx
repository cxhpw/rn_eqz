import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabScreen from './tabStack';
import Detail from '@/screens/detail';
import Order from '@/screens/order';
import Help from '@/screens/help';

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
      title: '详情',
    },
  },
  {
    name: 'Order',
    component: Order,
    options: {
      title: '我的订单',
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
