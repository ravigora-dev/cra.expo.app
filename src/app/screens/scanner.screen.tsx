import React, { useState, useCallback } from 'react';
import { Dimensions, Platform, SafeAreaView, useWindowDimensions } from 'react-native';
import { useQueryClient } from 'react-query';
import { PermissionResponse } from 'expo-barcode-scanner';
import styled from 'styled-components/native';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { ParamListBase, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import BarcodeMask from 'react-native-barcode-mask';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../styles/colors';
import { AppScreens, VariantLink } from '~/models';
import { getVariantLink } from '~/app/utils/getVariantLink';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraType } from 'expo-camera/build/Camera.types';

const ScannerScreen = () => {
  const queryClient = useQueryClient();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { goBack, navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const isFocused = useIsFocused();
  const inserts = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

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

  const handleBarCodeScanned = async ({ data, type }: BarCodeScanningResult) => {
    try {
      if (data && type) {
        setScanned(true);
        const variant: VariantLink = await queryClient.fetchQuery(data, () => getVariantLink(data));

        if (variant?.variantRef) {
          const productUrl = variant?.variantRef.replace(/(^\/)\/+/g, '$1');
          return navigate(AppScreens.Product, { productUrl });
        } else {
          return navigate(AppScreens.NotFound);
        }
      }
    } catch (e) {
      // TODO: Implement error handling
      return navigate(AppScreens.NotFound);
      // return undefined;
      console.log(e);
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
          type={CameraType.back}
          style={{ height: height, width: width }}>
          {Platform.OS === 'ios' ? (
            <>
              <BarcodeMask width={300} height={120} edgeColor="transparent" showAnimatedLine={false} />
              <Button onPress={goBack} inserts={inserts}>
                <Text> Tilbage </Text>
              </Button>
            </>
          ) : (
            <>
              <Button onPress={goBack} inserts={inserts}>
                <Text> Tilbage </Text>
              </Button>
              <BarcodeMask width={300} height={120} edgeColor="transparent" showAnimatedLine={false} />
            </>
          )}
        </Scanner>
      )}
    </Container>
  );
};

export default ScannerScreen;

const Container = styled(SafeAreaView)`
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

const Button = styled.TouchableOpacity<{ inserts: EdgeInsets }>`
  background-color: ${Colors.BLUE_DARK};
  height: 90px;
  position: absolute;
  bottom: ${({ inserts }) => inserts.bottom / 1.5}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
`;
