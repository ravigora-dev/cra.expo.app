import React from 'react';
import config from '~/config';
import CRWebView from '~/app/components/webview/webview.component';
import ScanButton from '~/app/components/scan-button/scan-button.component';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ParamList = {
  ProductScreen: {
    productUrl: string;
  };
};

const ProductScreen = () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<ParamList, 'ProductScreen'>>();

  return (
    <>
      <CRWebView url={`${config.uri}${route.params.productUrl}`} />
      <ScanButton onPress={() => navigate('Scanner')} />
    </>
  );
};

export default ProductScreen;
