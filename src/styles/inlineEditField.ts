import { css } from 'styled-components';

export const inlineEditFieldStyles = css`
  && .headerSeparator .header {
    padding: 0;
  }

  .headerSeparator {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    padding: 13px 15px;
    background-color: ${({ theme }) => theme.surface.page};
    border: 1px solid ${({ theme }) => theme.surface.outline};
    border-radius: ${({ theme }) => theme.radius.iconButton};

    .header {
      display: flex;
      flex: 1;
      min-width: 0;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s10};
      padding: 0;
    }

    .input {
      flex: 1;
      min-width: 0;
      padding: 0;
      border: none;
      outline: none;
      background-color: transparent;
      color: ${({ theme }) => theme.ink.primary};
      font-size: ${({ theme }) => theme.size.s16};
    }
  }
`;
