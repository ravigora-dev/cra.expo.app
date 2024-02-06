import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import config from '~/app/config';
import { AppScreens } from '~/models';
import ScanButton from '../components/scan-button/scan-button.component';
import CRWebView from '../components/webview/webview.component';

export default function HomeScreen() {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const url = new URL(config.BASE_URL);
  url.searchParams.append('app', 'true');

  return (
    <>
      <CRWebView url={url.href} />
      <ScanButton text='Scan' onPress={() => navigate(AppScreens.Scanner)} />
    </>
  );
};
