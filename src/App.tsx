/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import { Provider } from 'react-redux';
import { enableFreeze } from 'react-native-screens';
import { Fallback } from '@/components';
import { useSafeState, useMemoizedFn, useMount } from 'ahooks';
import { useNetwork } from './hooks';
import { navigationRef } from '@/services/NavigationService';
import { linking } from './linking';
import { hide as hideSplash } from 'react-native-bootsplash';
import Stack from '@/stacks';
import store from '@/store';

enableFreeze();

const App = () => {
  // 监听网络情况
  useNetwork(store);

  useFlipper(navigationRef);

  useMount(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };
    init().finally(() => {
      hideSplash({ fade: true });
    });
  });

  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());

  const themeChange = useMemoizedFn(() => {
    setTheme(Appearance.getColorScheme());
  });

  useEffect(() => {
    console.log('当前：', theme);
    const listener = Appearance.addChangeListener(themeChange);
    return () => listener.remove();
  });
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer
            ref={navigationRef}
            theme={theme === 'dark' ? DarkTheme : DefaultTheme}
            fallback={<Fallback />}
            linking={linking}>
            <Stack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
