import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import logo from '~/app/assets/images/logo.png';
import { Colors } from '~/app/styles/colors';
import { AppScreens } from '~/models';
import ScanButton from '../components/scan-button/scan-button.component';
import { isTablet } from '../helpers/settings';

export default function NotFoundScreen() {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Container>
      <StyledImage isTablet={isTablet} source={logo} />
      <Spacer space={10} />
      <StyledText>Produktet blev desværre ikke fundet!</StyledText>
      <ScanButton text='Tilbage' onPress={() => navigate(AppScreens.Scanner)} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.WHITE};
  width: 100%;
`;

const StyledImage = styled.Image`
  width: 80%;
  height: ${isTablet ? '170px' : '90px'};
`;

const StyledText = styled.Text`
color: ${Colors.BLUE_LIGHT};
`;

const Spacer = styled.View<{ space: number }>`
height: ${({ space }: { space: number }) => space} px;
`;
