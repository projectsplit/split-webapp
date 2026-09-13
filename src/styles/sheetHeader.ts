import { css } from 'styled-components';

export const sheetHeaderStyles = css`
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) =>
      `${theme.space.s20} ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;

    .headerSpacer {
      width: 34px;
      flex-shrink: 0;
    }

    .sheetTitle {
      flex: 1;
      min-width: 0;
      text-align: center;
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
    }

    .closeButtonContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      color: ${({ theme }) => theme.ink.secondary};
      cursor: pointer;
    }

    .closeButton {
      display: block;
      font-size: ${({ theme }) => theme.icon.lg};
    }
  }
`;
