import React from 'react';
import { ParamListBase, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScanButton from '../components/scan-button/scan-button.component';
import styled from 'styled-components/native';
import { Colors } from '~/app/styles/colors';
import logo from '~/app/assets/logo.png';

type ParamList = {
  NotFoundScreen: {
    barcode: string;
  };
};
const NotFoundScreen = () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<ParamList, 'NotFoundScreen'>>();

  return (
    <Container>
      <StyledImage source={logo} />
      <Spacer space={10} />
      <StyledText>Produktet blev desværre ikke fundet!</StyledText>
      <ScanButton onPress={() => navigate('Scanner')} />
    </Container>
  );
};

export default NotFoundScreen;

const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.BLUE_DARK};
  width: 100%;
`;

const StyledImage = styled.Image`
  width: 80%;
  height: 80px;
`;

const StyledText = styled.Text`
  color: ${Colors.WHITE};
`;

const Spacer = styled.View<{ space: number }>`
  height: ${({ space }) => space}px;
`;
