import React, { useState, useCallback } from 'react';
import { BarCodeScanner, PermissionResponse } from 'expo-barcode-scanner';
import styled from 'styled-components/native';
import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import BarcodeMask from 'react-native-barcode-mask';
import { Colors } from '../styles/colors';
import { getVariantLink } from '~/app/lib/use-search';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { goBack, navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { status }: PermissionResponse = await BarCodeScanner.requestPermissionsAsync();
        console.log('get permissions', status);
        setHasPermission(status === 'granted');
        setScanned(false);
      })();

      return () => {
        setScanned(false);
      };
    }, []),
  );

  console.log('PermissionResponse', BarCodeScanner.requestPermissionsAsync());

  const handleBarCodeScanned = async ({ type, data }: any) => {
    try {
      console.log('data', data);

      setScanned(true);
      const variant = await getVariantLink(data);
      if (variant.hasOwnProperty('variantRef')) {
        const { variantRef } = variant;
        const productUrl = variantRef.charAt(0) === '/' ? variantRef : `/${variantRef}`;
        return navigate('Product', { productUrl });
      }
      throw new Error();
    } catch (error) {
      return navigate('NotFound');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  console.log('here');

  return (
    <Container>
      <Scanner
        onBarCodeScanned={handleBarCodeScanned}
        onResponderStart={() => console.log('start')}
        style={{
          height: window.height,
          width: window.height,
        }}
      />
      <BarcodeMask width={300} height={120} edgeColor="transparent" showAnimatedLine={false} />
      <Button onPress={goBack}>
        <Text> Tilbage </Text>
      </Button>
    </Container>
  );
};

export default ScannerScreen;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 2px solid red;
`;

const Scanner = styled(BarCodeScanner)`
  position: absolute;
  height: 100px
  width: 200px;
  border: 1px solid red;
`;

const Button = styled.TouchableOpacity`
  background-color: ${Colors.BLUE_DARK};
  height: 80px;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
`;
