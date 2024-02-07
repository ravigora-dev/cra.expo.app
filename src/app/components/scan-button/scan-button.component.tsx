import React from 'react';
import { useWindowDimensions } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Colors } from '~/app/styles/colors';
interface IScanButton {
  onPress: () => void;
  text: string;
}

const buttonSize = 70;
const borderRadius = buttonSize / 2;

export default function ScanButton({ onPress, text }: IScanButton) {
  const { width } = useWindowDimensions();
  const buttonLeftPosition = width / 2 - borderRadius;
  const inserts = useSafeAreaInsets();

  return (
    <Button onPress={onPress} inserts={inserts} buttonLeftPosition={buttonLeftPosition}>
      <Text>{text}</Text>
    </Button>
  );
};

const Button = styled.TouchableOpacity<{ inserts: EdgeInsets; buttonLeftPosition: number }>`
  border-radius: ${borderRadius}px;
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  position: absolute;
  justify-content: center;
  left: ${({ buttonLeftPosition }: { buttonLeftPosition: number }) => buttonLeftPosition}px;
  background-color: ${Colors.BLUE_DARK};
  bottom: ${({ inserts }: { inserts: EdgeInsets }) => inserts.bottom / 1.5}px;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 3px;
  font-family: 'NeoSansStdMedium';
`;
