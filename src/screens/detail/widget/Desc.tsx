import { WebView } from 'react-native-webview';

const Desc = () => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        html: '<h1>This is a static HTML source!</h1>',
      }}
    />
  );
};

export default Desc;
