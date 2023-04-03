import { FC } from 'react';
import styled from 'styled-components/native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '~/app/styles/colors';

type Props = {
  children: React.ReactNode;
};

export const SafeAreaContent: FC<Props> = ({ children }) => {
  const inserts = useSafeAreaInsets();
  return <StyledSafeAreaContent inserts={inserts}>{children}</StyledSafeAreaContent>;
};

const StyledSafeAreaContent = styled.View<{ inserts: EdgeInsets }>`
  flex: 1;
  background-color: ${Colors.BLUE_DARK};
  padding-top: ${({ inserts }) => inserts.top}px;
  padding-bottom: 0;
`;
