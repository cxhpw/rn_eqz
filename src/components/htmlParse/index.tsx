import { useState } from 'react';
import { WebView } from 'react-native-webview';

type Props = {
  html: string | undefined;
  htmlStyle?: string;
  onLoadEnd?: () => void;
};
const Index = ({ html = '', onLoadEnd, htmlStyle }: Props) => {
  const [height, setHeight] = useState(0);
  const generateHtml = (content: string, _htmlStyle?: string) => `
  <!DOCTYPE html>\n
  <html>
    <head>
      <title>Web View</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=320, user-scalable=no">
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
        }
        ${_htmlStyle}
      </style>
    </head>
    <body>
      ${content}
      <script>
      setTimeout(function () {
        document.body.clientHeight
        window.ReactNativeWebView.postMessage(document.body.clientHeight)
      }, 500)
      </script>
    </body>
  </html>
  `;
  return (
    <WebView
      scrollEnabled={false}
      style={[
        {
          height: height,
        },
      ]}
      onMessage={event => {
        if (Number(event.nativeEvent.data) !== height) {
          console.log(event.nativeEvent.data);
          setHeight(Number(event.nativeEvent.data));
          onLoadEnd?.();
        }
      }}
      source={{
        // html.replace(/&nbsp;/gi, '')
        html: generateHtml(html.replace(/&nbsp;/gi, ''), htmlStyle),
      }}
    />
  );
};

export default Index;
