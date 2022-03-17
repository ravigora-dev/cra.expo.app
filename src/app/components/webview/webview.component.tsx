import React, { FC, useRef, useContext, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import handleRequest from '~/app/components/handle-request';
// import HandleBack from "../../utils/handle-back";
import { setUrl, useAppDispatch, useAppState } from '~/app/app.context';
// import styles from "./cr-webview.styles";
import { BackHandler } from 'react-native';
import HandleBack from '../handle-back/handle-back.component';

const CRWebView: FC<any> = ({ url }) => {
  const webviewRef = useRef<WebView | null>(null);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const onBack = () => {
    try {
      if (webviewRef.current && canGoBack) {
        webviewRef.current.goBack();
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  return (
    <HandleBack onBack={onBack}>
      <WebView
        source={{
          uri: url,
        }}
        onNavigationStateChange={() => setCanGoBack(true)}
        decelerationRate="normal"
        domStorageEnabled={true}
        javaScriptEnabled={true}
        bounces={false}
        allowFileAccess={true}
        originWhitelist={['*']}
        ref={webviewRef}
        allowsBackForwardNavigationGestures={true}
        onShouldStartLoadWithRequest={handleRequest}
      />
    </HandleBack>
  );
};

export default CRWebView;
