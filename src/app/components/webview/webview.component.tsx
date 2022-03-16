import React, { FC, useRef, useContext } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import handleRequest from '~/app/components/handle-request';
// import HandleBack from "../../utils/handle-back";
import { setUrl, useAppDispatch, useAppState } from '~/app/app.context';
// import styles from "./cr-webview.styles";
import { BackHandler } from 'react-native';
import HandleBack from '../handle-back/handle-back.component';

const CRWebView: FC<any> = ({ url }) => {
  const webviewRef = useRef<WebView | null>(null);
  const dispatch = useAppDispatch();
  const { url: currentUrl } = useAppState();
  //   const appContext = useContext(AppContext);

  const onBack = () => {
    try {
      if (currentUrl === '/') {
        BackHandler.exitApp();
      }

      if (webviewRef.current) {
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
          try {
            const data = JSON.parse(state.data);
            if (data.type === 'navigationStateChange') {
              setUrl(dispatch, data.url);
            }
          } catch (e) {
            console.warn(e);
          }
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
        onShouldStartLoadWithRequest={handleRequest}
      />
    </HandleBack>
  );
};

export default CRWebView;
