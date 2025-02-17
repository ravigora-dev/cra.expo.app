import styled from 'styled-components/native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '~/app/styles/colors';

type Props = {
  children: React.ReactNode;
};

export default function SafeAreaContent({ children }: Props) {
  const inserts = useSafeAreaInsets();
  return <StyledSafeAreaContent inserts={inserts}>{children}</StyledSafeAreaContent>;
};

const StyledSafeAreaContent = styled.View<{ inserts: EdgeInsets }>`
  flex: 1;
  background-color: ${Colors.BLUE_DARK};
  padding-top: ${({ inserts }: { inserts: EdgeInsets }) => inserts.top}px;
  padding-bottom: 0;
`;
