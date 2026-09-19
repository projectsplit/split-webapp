import styled from 'styled-components';
import { StyledFullScreenMenu } from '../../../../components/Menus/Layouts/FullScreenMenu/FullScreenMenu.styled';

export const StyledLabelMenu = styled(StyledFullScreenMenu)`
  .scrollable-content {
    padding: ${({ theme }) =>
      `${theme.space.s4} ${theme.space.s20} ${theme.space.s24}`};
  }

  .doneButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s20} 22px`};
    background-color: ${({ theme }) => theme.surface.footer};
    border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};

    button {
      width: 100%;
      padding: ${({ theme }) => `${theme.space.s14} 0`};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      font-size: ${({ theme }) => theme.size.s15};
    }
  }
`;
