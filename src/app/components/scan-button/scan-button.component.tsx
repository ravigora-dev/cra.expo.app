import React, { FC, useEffect } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Colors } from '~/app/styles/colors';

interface IScanButton {
  onPress: () => void;
}

const buttonSize = 70;
const borderRadius = buttonSize / 2;

export const ScanButton: FC<IScanButton> = ({ onPress }) => {
  const { width } = useWindowDimensions();
  const buttonLeftPosition = width / 2 - borderRadius;
  const inserts = useSafeAreaInsets();

  return (
    <Button onPress={onPress} inserts={inserts} buttonLeftPosition={buttonLeftPosition}>
      <Text> Scan </Text>
    </Button>
  );
};

const Button = styled.TouchableOpacity<{ inserts: EdgeInsets; buttonLeftPosition: number }>`
  font-size: 14px;
  border-radius: ${borderRadius}px;
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  position: absolute;
  justify-content: center;
  left: ${({ buttonLeftPosition }) => buttonLeftPosition}px;
  background-color: ${Colors.BLACK};
  bottom: ${({ inserts }) => inserts.bottom / 1.5}px;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
  text-align: center;
`;

export default ScanButton;
