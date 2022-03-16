import { FC } from 'react';
import styled from 'styled-components/native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '~/app/styles/colors';

export const SafeAreaContent: FC = ({ children }) => {
  const inserts = useSafeAreaInsets();
  console.log('inserts', inserts);

  return <StyledSafeAreaContent inserts={inserts}>{children}</StyledSafeAreaContent>;
};

const StyledSafeAreaContent = styled.View<{ inserts: EdgeInsets }>`
  flex: 1;
  background-color: ${Colors.BLUE_DARK};
  padding-top: ${({ inserts }) => inserts.top}px;
  padding-bottom: 0;
`;
