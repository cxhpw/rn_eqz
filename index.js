/**
 * @format
 */
import 'react-native-gesture-handler';
import { Alert, AppRegistry, LogBox } from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'Require cycle:',
  'new NativeEventEmitter()',
  "Can't perform",
  'Flipper',
  'RCTBridge',
]);

/**
 * 未捕获的JS异常
 */
setJSExceptionHandler((error, isFatal) => {
  console.error(123123);
  if (isFatal) {
    Alert.alert(
      '未知异常',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${error.message}
        APP需要被重启
      `,
      [
        {
          text: '重启',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      ],
    );
  } else {
    console.log('setJSExceptionHandler', error); // So that we can see it in the ADB logs in case of Android if needed
  }
}, false);

/**
 * 未捕获的原生异常
 */
setNativeExceptionHandler(
  exceptionString => {
    console.log('异常处理', exceptionString);
  },
  false,
  true,
);

AppRegistry.registerComponent(appName, () => App);
