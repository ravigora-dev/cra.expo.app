import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CRWebView from '~/app/components/webview/webview.component';
import ScanButton from '~/app/components/scan-button/scan-button.component';
import HandleBack from '~/app/components/handle-back/handle-back.component';
import config from '~/app/config';
import { AppScreens } from '~/models';

type ParamList = {
  ProductScreen: {
    productUrl: string;
  };
};

const ProductScreen = () => {
  const { navigate, goBack, canGoBack } = useNavigation<StackNavigationProp<ParamListBase>>();
  const { params } = useRoute<RouteProp<ParamList, 'ProductScreen'>>();
  const url = new URL(params.productUrl, config.BASE_URL);
  url.searchParams.append('app', 'true');

  const handleGoBack = () => {
    if (canGoBack()) {
      goBack();
    }
  };

  return (
    <HandleBack onBack={handleGoBack}>
      <CRWebView url={url.href} withGoBack={false} />
      <ScanButton onPress={() => navigate(AppScreens.Scanner)} />
    </HandleBack>
  );
};

export default ProductScreen;
