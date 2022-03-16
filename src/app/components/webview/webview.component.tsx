import React, { FC, useRef, useContext } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
// import handleRequest from "../../utils/handle-request";
// import HandleBack from "../../utils/handle-back";
// import { AppContext } from "../../app-context";
// import styles from "./cr-webview.styles";
import { BackHandler } from 'react-native';
import HandleBack from '../handle-back/handle-back.component';

const CRWebView: FC<any> = ({ url }) => {
  const webviewRef = useRef<WebView | null>(null);
  //   const appContext = useContext(AppContext);

  const onBack = () => {
    if (appContext.url === '/') {
      BackHandler.exitApp();
    }

    try {
      if (webviewRef.current) {
        webviewRef.current.canGoBack();
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
        // style={styles.container}
        decelerationRate="normal"
        injectedJavaScript={`
            (function() {
              function wrap(fn) {
                return function wrapper() {
                  var res = fn.apply(this, arguments);
                  window.ReactNativeWebView.postMessage(JSON.stringify({type: "navigationStateChange", url: window.location.pathname}));
                  return res;
                }
              }
        
              history.pushState = wrap(history.pushState);
              history.replaceState = wrap(history.replaceState);
              window.addEventListener('popstate', function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({type: "navigationStateChange", url: window.location.pathname}));
              });
            })();
        
            true;
          `}
        onMessage={({ nativeEvent: state }) => {
          //   try {
          //     const data = JSON.parse(state.data);
          //     if (data.type === "navigationStateChange") {
          //       appContext.url = data.url;
          //     }
          //   } catch (e) {
          //     console.warn(e);
          //   }
        }}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        bounces={false}
        source={{
          uri: url,
        }}
        allowFileAccess={true}
        originWhitelist={['*']}
        ref={webviewRef}
        allowsBackForwardNavigationGestures={true}
        // onShouldStartLoadWithRequest={handleRequest}
      />
    </HandleBack>
  );
};

export default CRWebView;
