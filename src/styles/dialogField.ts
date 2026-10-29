import { css } from 'styled-components';

/**
 * A full-width field and the lines that go with it, for the dialogs that ask for something typed
 * in: an address, a code, a password. Shared so that those dialogs look like one another.
 */
export const dialogFieldStyles = css`
  .description {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    white-space: initial;
    overflow-wrap: anywhere;
  }

  .errormsg {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.direction.owe};
    white-space: initial;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    height: 47px;
    padding: ${({ theme }) => `0 ${theme.space.s14}`};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    outline: none;
    background-color: ${({ theme }) => theme.surface.page};
    color: ${({ theme }) => theme.ink.primary};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.size.s16};
    transition: border-color 0.15s;

    &::placeholder {
      color: ${({ theme }) => theme.ink.tertiary};
      opacity: 1;
    }

    &:focus {
      border-color: ${({ theme }) => theme.accent.you.ink};
    }
  }
`;
