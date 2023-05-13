import { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

type Props = {
  html: string | undefined;
  htmlStyle?: string;
  onLoadEnd?: () => void;
};
const Index = ({ html = '', onLoadEnd, htmlStyle }: Props) => {
  const ref = useRef<WebView>(null);
  const [height, setHeight] = useState(0);
  const generateHtml = (content: string, _htmlStyle?: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }
        img {
          max-width: 100%;
          display: block;
        }
        * {
          margin: 0;
          padding: 0;
          font-family: "微软雅黑"
        }
        ${_htmlStyle}
      </style>
    </head>
    <body>
      ${content}
    </body>
    <script>
    setTimeout(function() {
      window.ReactNativeWebView.postMessage(document.body.clientHeight)
     }, 1000);
    </script>
  </html>
  `;
  const runFirst = `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage(document.body.clientHeight)
   }, 1000);`;
  return (
    <WebView
      ref={ref}
      scrollEnabled={false}
      style={[
        {
          height: height,
        },
      ]}
      onMessage={event => {
        console.log('webview onMessage', event.nativeEvent.data);
        if (Number(event.nativeEvent.data) !== height) {
          setHeight(Number(event.nativeEvent.data));
          onLoadEnd?.();
        }
      }}
      javaScriptEnabled={true}
      // injectedJavaScript={runFirst}
      source={{
        // html: html,
        html: generateHtml(html, htmlStyle),
      }}
    />
  );
};

export default Index;
