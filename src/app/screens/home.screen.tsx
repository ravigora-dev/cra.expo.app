import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScanButton from '../components/scan-button/scan-button.component';
import CRWebView from '../components/webview/webview.component';
import { AppScreens } from '~/models';
import config from '~/app/config';

const HomeScreen = () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const url = new URL(config.BASE_URL);
  url.searchParams.append('app', 'true');

  return (
    <>
      <CRWebView url={url.href} />
      <ScanButton onPress={() => navigate(AppScreens.Scanner)} />
    </>
  );
};

export default HomeScreen;
