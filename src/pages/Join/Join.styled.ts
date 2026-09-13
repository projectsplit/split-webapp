import styled from 'styled-components';
import { StyledDialog } from '../../components/Menus/Layouts/Dialog/Dialog.styled';

export const StyledJoinBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 998;
  background-color: ${({ theme }) => theme.scrim.sheet};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

export const StyledJoin = styled(StyledDialog)`
  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => `${theme.space.s16} 0`};
  }
`;
