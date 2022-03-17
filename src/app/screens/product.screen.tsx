import React from 'react';
import config from '~/config';
import CRWebView from '~/app/components/webview/webview.component';
import ScanButton from '~/app/components/scan-button/scan-button.component';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HandleBack from '~/app/components/handle-back/handle-back.component';
type ParamList = {
  ProductScreen: {
    productUrl: string;
  };
};

const ProductScreen = () => {
  const { navigate, goBack, canGoBack } = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<ParamList, 'ProductScreen'>>();

  const handleGoBack = () => {
    if (canGoBack()) {
      goBack();
    }
  };

  return (
    <HandleBack onBack={handleGoBack}>
      <CRWebView url={`${config.uri}${route.params.productUrl}`} withGoBack={false} />
      <ScanButton onPress={() => navigate('Scanner')} />
    </HandleBack>
  );
};

export default ProductScreen;
