import React from 'react';
import { ParamListBase, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import ScanButton from '../components/scan-button/scan-button.component';
type ParamList = {
  NotFoundScreen: {
    barcode: string;
  };
};
const NotFoundScreen = () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<ParamList, 'NotFoundScreen'>>();

  return (
    <>
      <View>
        <Text>Produktet blev ikke fundet!</Text>
        <Text>Stregkode: {route?.params?.barcode}</Text>
      </View>
      <ScanButton onPress={() => navigate('Scanner')} />
    </>
  );
};

export default NotFoundScreen;
