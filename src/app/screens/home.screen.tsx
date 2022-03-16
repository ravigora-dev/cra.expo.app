import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScanButton from '../components/scan-button/scan-button.component';
import CRWebView from '../components/webview/webview.component';
import config from '~/config';

const HomeScreen = () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <>
      <CRWebView url={'https://www.carl-ras.dk?app=true'} />
      <ScanButton onPress={() => navigate('Scanner')} />
    </>
  );
};

export default HomeScreen;
