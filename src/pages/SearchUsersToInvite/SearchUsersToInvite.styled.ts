import styled from 'styled-components';
import { sheetHeaderStyles } from '@/styles/sheetHeader';

export const StyledSearchUsersToInvite = styled.div`
  position: fixed;
  font-size: ${({ theme }) => theme.size.s15};
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.surface.page};
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .fixed-header-container {
    position: sticky;
    top: 0;
    z-index: 4;
    background-color: ${({ theme }) => theme.surface.page};
  }

  ${sheetHeaderStyles}

  .sheetControls {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s14};
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;
  }

  .scrollable-content {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    overflow-y: auto;
    flex: 1;
    min-height: 0;
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s20}`};

    .members {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s10};
    }
  }

  .inputField {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: ${({ theme }) => theme.space.s8};

    .search-input {
      flex: 1;
      min-width: 0;
      padding: ${({ theme }) => `${theme.space.s12} 15px`};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      font-size: ${({ theme }) => theme.size.s15};
    }

    .createButton {
      flex-shrink: 0;
      display: flex;

      button {
        height: 100%;
        padding: ${({ theme }) => `0 ${theme.space.s20}`};
        font-size: ${({ theme }) => theme.size.s14};
      }
    }
  }

  .sheetNote {
    padding: 0;
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.55;
    text-wrap: pretty;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .sheetFootnote {
    padding: ${({ theme }) => `${theme.space.s12} 0 0`};
    text-wrap: pretty;
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.55;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .sectionLabel {
    padding: ${({ theme }) => `${theme.space.s16} 0 ${theme.space.s10}`};
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

`;
