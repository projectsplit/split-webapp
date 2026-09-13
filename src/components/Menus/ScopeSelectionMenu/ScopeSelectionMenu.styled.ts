import styled from 'styled-components';
import { StyledFullScreenMenu } from '../Layouts/FullScreenMenu/FullScreenMenu.styled';

export const StyledScopeSelectionMenu = styled(StyledFullScreenMenu)`
  .scrollable-content {
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) =>
      `${theme.space.s4} ${theme.space.s20} ${theme.space.s24}`};
  }

  .hint {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .scopeCard {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;

    > * {
      position: relative;
      flex-shrink: 0;
    }

    > * + *::before {
      content: '';
      position: absolute;
      left: 58px;
      right: 0;
      top: 0;
      height: 1px;
      background-color: ${({ theme }) => theme.surface.raisedHigh};
    }
  }

  .scopeRow {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    min-height: 56px;
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s16}`};

    .scopeIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.icon.sm};
    }

    .scopeName {
      flex: 1;
      min-width: 0;
      font-size: ${({ theme }) => theme.size.s14};
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
