import styled from 'styled-components';
import { StyledMiddleScreenMenu } from '../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledSupportMenu = styled(StyledMiddleScreenMenu)`
  /* The form is taller than the other middle-screen menus, so it scrolls inside itself rather than
     pushing the card off a short viewport. */
  max-height: 84vh;
  overflow-y: auto;

  .loading {
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => `${theme.space.s24} 0`};
  }

  .manage {
    align-self: center;
    background: none;
    padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s14}`};
    font-family: inherit;
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.semibold};
    border-radius: ${({ theme }) => theme.radius.buttonSmall};
    border: 1px solid ${({ theme }) => theme.surface.outline};
    color: ${({ theme }) => theme.ink.primary};
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.accent.you.tintBorder};
    }
  }

  .close {
    align-self: center;
    background: none;
    border: none;
    padding: ${({ theme }) => theme.space.s4};
    font-family: inherit;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.ink.primary};
    }
  }
`;
