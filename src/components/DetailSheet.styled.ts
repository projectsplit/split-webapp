import styled from 'styled-components';
import { StyledMiddleScreenMenu } from './Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledDetailedBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  background-color: ${({ theme }) => theme.scrim.sheet};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

export const StyledDetailSheet = styled(StyledMiddleScreenMenu)`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  max-height: calc(100dvh - 32px);
  overflow: hidden;
  z-index: 4;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    flex-shrink: 0;
    padding: ${({ theme }) =>
      `${theme.space.s16} ${theme.space.s16} ${theme.space.s12}`};

    .slot {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }

    .title {
      flex: 1;
      min-width: 0;
      text-align: center;
      font-size: ${({ theme }) => theme.size.s16};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .closeButtonContainer {
      cursor: pointer;
      color: ${({ theme }) => theme.ink.secondary};
    }

    .closeButton {
      display: block;
      font-size: ${({ theme }) => theme.icon.md};
    }
  }

  .detailsScroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `0 ${theme.space.s16}`};
  }

  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
  }

  .amount {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.figure.card};
    font-weight: ${({ theme }) => theme.weight.medium};
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: ${({ theme }) => theme.ink.primary};
  }

  .meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space.s2};
    padding-top: ${({ theme }) => theme.space.s2};
    font-size: ${({ theme }) => theme.size.s11};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};

    .metaLine {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: center;
      gap: ${({ theme }) => theme.space.s6};
      text-align: center;
    }

    .metaSep {
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .footer {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s8};
    padding: ${({ theme }) =>
      `${theme.space.s14} ${theme.space.s16} ${theme.space.s16}`};

    button {
      flex: 1;
      padding: 11px 0;
    }
  }
`;
