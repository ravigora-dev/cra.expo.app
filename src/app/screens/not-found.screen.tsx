import React, { FC } from 'react';
import { View, Text } from 'react-native';
import ScanButton from '../components/scan-button/scan-button.component';

const NotFoundScreen: FC<any> = ({ navigation }) => {
  return (
    <>
      <View>
        <Text>Produktet blev ikke fundet!</Text>
        <Text>Stregkode: {navigation.getParam('barcode', '?')}</Text>
      </View>
      <ScanButton onPress={() => navigation.navigate('Scanner')} />
    </>
  );
};

export default NotFoundScreen;
