import { ParamListBase, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PermissionResponse } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { useCallback, useState } from 'react';
import { Platform, SafeAreaView, useWindowDimensions } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import { getVariantLink } from '~/app/utils/getVariantLink';
import { AppScreens, VariantLink } from '~/models';
import ScanButton from '../components/scan-button/scan-button.component';
import { isTablet } from '../helpers/settings';
import { Colors } from '../styles/colors';

export default function ScannerScreen() {
  const queryClient = useQueryClient();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const isFocused = useIsFocused();
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
          style={{ height: height, width: width }}
        >
          {Platform.OS === 'ios' ? (
            <>
              <BarcodeMask width={300} height={120} edgeColor="transparent" showAnimatedLine={false} />
              <ScanButtonWrapper>
                <ScanButton text='Tilbage' onPress={() => navigate(AppScreens.Home)} />
              </ScanButtonWrapper>
            </>
          ) : (
            <>
              <AndroidTabletWrapper>
                <ScanButton text='Tilbage' onPress={() => navigate(AppScreens.Home)} />
              </AndroidTabletWrapper>
              <BarcodeMask width={300} height={120} edgeColor="transparent" showAnimatedLine={false} />
            </>
          )}
        </Scanner>
      )}
    </Container>
  );
};

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

const ScanButtonWrapper = styled.View`
  flex: 1;
  bottom: ${isTablet ? 14 : 25}px;
`;

const AndroidTabletWrapper = styled.View`
  flex: 1;
  bottom: ${isTablet ? 14 : 0}px;
`

const Text = styled.Text`
  color: ${Colors.WHITE};
  text-align: center;
  font-size: 16px;
  text-Transform: uppercase;
  margin-left: -6px;
`;
