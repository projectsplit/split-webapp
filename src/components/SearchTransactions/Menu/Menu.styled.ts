import styled from 'styled-components';
import { CombinedMenuProps } from '../../../interfaces';

export const StyledMenu = styled.div<CombinedMenuProps>`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 0 1 auto;
  min-height: 0;
  cursor: pointer;
  scrollbar-width: none;
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.outline};
  border-radius: ${({ theme }) => theme.radius.iconButton};
  box-shadow: ${({ theme }) => theme.shadow.dialog};

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
