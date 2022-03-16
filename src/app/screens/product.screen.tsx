import React, { FC } from 'react';
import config from '~/config';
import CRWebView from '~/app/components/webview/webview.component';
import ScanButton from '~/app/components/scan-button/scan-button.component';
import { useRoute } from '@react-navigation/native';

const ProductScreen: FC<any> = ({ navigation }): JSX.Element | null => {
  const {
    params: { productUrl },
  } = useRoute<any>();

  console.log(`${config.uri}${productUrl}`);

  return (
    <>
      <CRWebView url={`${config.uri}${productUrl}?app=true`} />
      <ScanButton onPress={() => navigation.navigate('Scanner')} />
    </>
  );
};

export default ProductScreen;
