import React, { FC, useRef } from 'react';
import { WebView } from 'react-native-webview';
import handleRequest from '~/app/components/handle-request';
import HandleBack from '../handle-back/handle-back.component';

type Props = {
  url: string;
  withGoBack: boolean;
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

  return (
    <HandleBack onBack={onBack}>
      <WebView
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
      />
    </HandleBack>
  );
};

export default CRWebView;
