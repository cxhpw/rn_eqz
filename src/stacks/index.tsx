import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Config from 'react-native-config';

import TabScreen from './tabStack';
import Detail from '@/screens/detail';
import Order from '@/screens/order';
import Help from '@/screens/help';
import Calendar from '@/screens/calendar';
import OrderSubmit from '@/screens/orderSubmit';
import Company from '@/screens/company';
import Complaint from '@/screens/complaint';
import Address from '@/screens/address';
import AddAddress from '@/screens/addAddress';
import WebView from '@/screens/webview';
import Activity from '@/screens/activity';
import Search from '@/screens/search';
import OrderDetail from '@/screens/orderDetail';

const Stack = createNativeStackNavigator<AppParamList>();

interface ScreenProps {
  name: keyof AppParamList;
  component: JSX.Element | Element;
  options?: NativeStackNavigationOptions;
  initialParams?: any;
}

const MAIN_SCREENS: ScreenProps[] = [
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
    /** 需要初始化参数 */
    initialParams: {
      code: -1,
    } as Partial<AppParamList['Order']>,
  },
  {
    name: 'OrderDetail',
    component: OrderDetail,
    options: {
      title: '订单详情',
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
  {
    name: 'Search',
    component: Search,
    options: {
      title: '搜索',
    },
  },
];

const COMMON_SCREENS: ScreenProps[] = [
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
    name: 'Address',
    component: Address,
    options: {
      title: '地址管理',
    },
  },
  {
    name: 'AddAddress',
    component: AddAddress,
    options: {
      title: '地址中心',
    },
  },
  {
    name: 'WebView',
    component: WebView,
    options: {
      title: '',
    },
  },
  {
    name: 'Activity',
    component: Activity,
    options: {
      title: '优惠活动',
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: '#fff',
    },
  },
];

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
