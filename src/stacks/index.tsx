import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabScreen from './tabStack';
import Detail from '@/screens/detail';

const Stack = createNativeStackNavigator();

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
          return <Stack.Screen key={screen.name} {...screen} />;
        })}
      </Stack.Group>
      <Stack.Group>
        {/* <Stack.Screen
          name="Detail"
          component={FourScreen}
          options={({ navigation }) => {
            return {
              headerLeft: () => {
                if (navigation.canGoBack()) {
                  return null;
                } else {
                  return (
                    <Button
                      title="首页"
                      onPress={() => {
                        console.log('返回首页');
                        navigation.replace('Tab');
                      }}
                    />
                  );
                }
              },
            };
          }}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};
