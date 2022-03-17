import React, { useState, useCallback } from 'react';
import { PermissionResponse } from 'expo-barcode-scanner';
import styled from 'styled-components/native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { ParamListBase, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
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
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { status }: PermissionResponse = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();

      return () => {
        setScanned(false);
      };
    }, []),
  );

  const handleBarCodeScanned = async ({ data }: BarCodeScanningResult) => {
    try {
      const variant = await getVariantLink(data);
      if (variant.hasOwnProperty('variantRef')) {
        const { variantRef } = variant;
        const productUrl = variantRef.charAt(0) === '/' ? variantRef : `/${variantRef}`;
        setScanned(false);
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

  return (
    <Container>
      {isFocused && (
        <Scanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: window.height, width: window.width }}>
          <BarcodeMask width={300} height={120} edgeColor="transparent" showAnimatedLine={false} />
          <Button onPress={goBack}>
            <Text> Tilbage </Text>
          </Button>
        </Scanner>
      )}
    </Container>
  );
};

export default ScannerScreen;

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const Scanner = styled(Camera)`
  position: absolute;
  flex: 1;
  width: 200px;
  height: 100px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${Colors.BLUE_DARK};
  height: 80px;
  position: absolute;
  bottom: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
`;
