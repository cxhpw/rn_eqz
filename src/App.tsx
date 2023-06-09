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
import { enableFreeze } from 'react-native-screens';
import { Fallback, ThemeProvider } from '@/components';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { useNetwork } from './hooks';
import { navigationRef } from '@/services/NavigationService';
import { linking } from './linking';
import { hide as hideSplash } from 'react-native-bootsplash';
import Stack from '@/stacks';
import { lightTheme, darkTheme } from './theme';
import { useStore } from './store';
import useStackService from './stacks/useStackService';
import codePush from 'react-native-code-push';

enableFreeze();

const Main = () => {
  /** 获取app配置 */
  const fetchAppConfig = useStore(state => state.fetchAppConfig);
  const isOnline = useStore(state => state.isOnline);
  // 监听网络情况
  useNetwork();

  useFlipper(navigationRef);

  useEffect(() => {
    const init = async () => {
      /** 同步状态到zustand */
      if (isOnline) {
        fetchAppConfig();
      }
    };
    init().finally(() => {
      hideSplash({ fade: true });
    });
  }, [fetchAppConfig, isOnline]);

  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());

  const themeChange = useMemoizedFn(() => {
    setTheme(Appearance.getColorScheme());
  });

  useEffect(() => {
    const listener = Appearance.addChangeListener(themeChange);
    return () => listener.remove();
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <useStackService.Provider>
            <NavigationContainer
              ref={navigationRef}
              theme={theme === 'dark' ? DarkTheme : DefaultTheme}
              fallback={<Fallback />}
              linking={linking}>
              <Stack />
            </NavigationContainer>
          </useStackService.Provider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
const App = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: {
    // 是否显示更新描述
    appendReleaseDescription: true,
    // 更新描述的前缀。 默认为"Description"
    descriptionPrefix: '\n\n更新内容：\n',
    // 强制更新按钮文字，默认为continue
    mandatoryContinueButtonLabel: '立即更新',
    // 强制更新时的信息. 默认为"An update is available that must be installed."
    mandatoryUpdateMessage: '必须更新后才能使用',
    // 非强制更新时，按钮文字,默认为"ignore"
    optionalIgnoreButtonLabel: '稍后',
    // 非强制更新时，确认按钮文字. 默认为"Install"
    optionalInstallButtonLabel: '更新',
    // 非强制更新时，检查到更新的消息文本
    optionalUpdateMessage: '有新版本了，是否更新？',
    // Alert窗口的标题
    title: '应用更新',
  },
})(Main);

export default App;
