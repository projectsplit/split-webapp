import styled from 'styled-components';
import { StyledBottomMenuProps } from '../../../../interfaces';

export const StyledBottomMenu = styled.div<StyledBottomMenuProps>`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s14};
  padding: ${({ theme }) =>
    `${theme.space.s10} ${theme.space.s20} ${theme.space.s20}`};
  background-color: ${({ theme }) => theme.surface.card};
  border-top: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => `${theme.radius.sheet} ${theme.radius.sheet} 0 0`};
  height: ${(props) => props.height};

  .sheetHandle {
    align-self: center;
    width: 36px;
    height: 4px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.dot};
  }
`;
