import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/screens/home';
import My from '@/screens/my';
import Chat from '@/screens/chat';
import Category from '@/screens/category';
import { IconNames } from '@/components/Icon';
import { StyleSheet, Text } from 'react-native';
import { Image } from 'react-native';
import { helpers } from '@/components';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const { scale } = helpers;
const Tab = createBottomTabNavigator();

const tabItems: {
  name: string;
  component: React.FC;
  label: string;
  icon: IconNames | Element;
  options?: BottomTabNavigationOptions;
}[] = [
  {
    //@ts-ignore
    component: Home,
    name: 'Home',
    label: '首页',
    icon: (focused: boolean) => {
      return (
        <Image
          style={style.Icon}
          source={
            focused
              ? require('@/images/index-select.png')
              : require('@/images/index.png')
          }
        />
      );
    },
  },
  {
    //@ts-ignore
    component: Category,
    name: 'Category',
    label: '分类',
    icon: (focused: boolean) => {
      return (
        <Image
          style={style.Icon}
          source={
            focused
              ? require('@/images/category-select.png')
              : require('@/images/category.png')
          }
        />
      );
    },
  },
  {
    //@ts-ignore
    component: Chat,
    name: 'Chat',
    label: '客服',
    icon: (focused: boolean) => {
      return (
        <Image
          style={style.Icon}
          source={
            focused
              ? require('@/images/chat-select.png')
              : require('@/images/chat.png')
          }
        />
      );
    },
  },
  {
    //@ts-ignore
    component: My,
    name: 'My',
    label: '我的',
    icon: (focused: boolean) => {
      return (
        <Image
          style={style.Icon}
          source={
            focused
              ? require('@/images/my-select.png')
              : require('@/images/my.png')
          }
        />
      );
    },
    options: {
      headerStyle: {},
    },
  },
];

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: true,
        lazy: true,
        tabBarStyle: {
          paddingTop: scale(4),
        },
      }}>
      {tabItems.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              title: item.label,
              tabBarLabel({ focused }) {
                return (
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      fontSize: scale(12),
                      color: focused ? '#c63520' : '#666666',
                      paddingTop: scale(4),
                    }}>
                    {item.label}
                  </Text>
                );
              },
              tabBarIcon({ focused }) {
                // @ts-ignore
                return item.icon(focused);
              },
              ...item.options,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default TabStack;

const style = StyleSheet.create({
  Icon: {
    width: scale(24),
    height: scale(24),
  },
});
