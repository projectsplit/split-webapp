import styled from 'styled-components';
import { StyledDialog } from '../../Layouts/Dialog/Dialog.styled';

export const StyledConnectRequestBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.scrim.sheet};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

export const StyledConnectRequestConfirm = styled(StyledDialog)``;
