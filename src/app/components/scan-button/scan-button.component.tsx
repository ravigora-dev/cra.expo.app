import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Colors } from '~/app/styles/colors';

interface IScanButton {
  onPress: () => void;
}

const buttonSize = 70;
const borderRadius = buttonSize / 2;
const buttonLeftPosition = Dimensions.get('window').width / 2 - borderRadius;

export const ScanButton: FC<IScanButton> = ({ onPress }) => {
  const inserts = useSafeAreaInsets();

  return (
    <Button onPress={onPress} inserts={inserts}>
      <Text> Scan </Text>
    </Button>
  );
};

export default ScanButton;

const Button = styled.TouchableOpacity<{ inserts: EdgeInsets }>`
  font-size: 14px;
  border-radius: ${borderRadius}px;
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  position: absolute;
  justify-content: center;
  left: ${buttonLeftPosition}px;
  background-color: ${Colors.BLACK};
  bottom: ${({ inserts }) => inserts.bottom / 1.5}px;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
  text-align: center;
`;
