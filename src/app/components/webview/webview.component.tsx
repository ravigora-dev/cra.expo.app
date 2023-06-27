import React, { FC, useRef } from 'react';
import { Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';
import handleRequest from '~/app/components/handle-request';
import HandleBack from '../handle-back/handle-back.component';

type Props = {
  url: string;
  withGoBack?: boolean;
};

const CRWebView: FC<Props> = ({ url, withGoBack = true }) => {
  const webviewRef = useRef<WebView | null>(null);

  const onBack = () => {
    try {
      if (withGoBack && webviewRef.current) {
        webviewRef.current.goBack();
      }
    } catch (error) {
      console.log(error);
    }

    return true;
  };

  //Note: Debugging console.log in webview
  // const debugging = `
  // const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  // console = {
  //     log: (log) => consoleLog('log', log),
  //     debug: (log) => consoleLog('debug', log),
  //     info: (log) => consoleLog('info', log),
  //     warn: (log) => consoleLog('warn', log),
  //     error: (log) => consoleLog('error', log),
  //   };
  //    `;

  // const onMessage = (payload: any) => {
  //   let dataPayload;
  //   try {
  //     dataPayload = JSON.parse(payload.nativeEvent.data);
  //   } catch (e) {}

  //   if (dataPayload) {
  //     if (dataPayload.type === 'Console') {
  //       console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
  //     } else {
  //       console.log(dataPayload);
  //     }
  //   }
  // };

  return (
    <HandleBack onBack={onBack}>
      <WebView
        // injectedJavaScript={debugging}
        // onMessage={onMessage}
        source={{
          uri: url,
        }}
        decelerationRate="normal"
        domStorageEnabled={true}
        javaScriptEnabled={true}
        bounces={false}
        allowFileAccess={true}
        originWhitelist={['*']}
        ref={webviewRef}
        allowsBackForwardNavigationGestures={true}
        onShouldStartLoadWithRequest={handleRequest}
        hideKeyboardAccessoryView={true}
        onNavigationStateChange={() => Keyboard.dismiss()}
      />
    </HandleBack>
  );
};

export default CRWebView;
