import { styled } from 'styled-components';

export const StyledInput = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;

  .input-container {
    padding: 13px 15px;
    font-size: ${({ theme }) => theme.size.s16};
    background-color: ${({ theme }) => theme.surface.card};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.direction.owe : theme.surface.hairline};

    transition: border-color 0.15s;

    &:focus-within {
      border-color: ${({ theme, $hasError }) =>
        $hasError ? theme.direction.owe : theme.accent.you.ink};
    }

    input {
      border: none;
      background: transparent;
      color: inherit;
      font: inherit;
      width: 100%;
      outline: none;
      padding: 0;

      &::placeholder {
        color: ${({ theme }) => theme.ink.secondary};
        opacity: 1;
      }
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => `${theme.space.s4} ${theme.space.s4} 0`};
    font-size: ${({ theme }) => theme.size.s12};
    background-color: ${({ theme }) => theme.surface.page};

    .description {
      color: ${({ theme }) => theme.ink.secondary};
    }

    .error {
      color: ${({ theme }) => theme.direction.owe};
      font-weight: ${({ theme }) => theme.weight.regular};
    }
  }
`;
