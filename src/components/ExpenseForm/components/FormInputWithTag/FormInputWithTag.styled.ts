import { styled } from 'styled-components';

export const StyledFormInputWithTag = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s6};

  .labelIconAndInputField {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: ${({ theme }) => theme.space.s10};

    &:focus-within {
      .input-container {
        border-color: ${({ theme, $hasError }) =>
          $hasError ? theme.direction.owe : theme.accent.you.ink};
      }
    }

    .labelSelectorWrapper {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .labelSelector {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s8};
      height: 100%;
      padding: ${({ theme }) => `0 ${theme.space.s14}`};
      background-color: ${({ theme }) => theme.surface.card};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.surface};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.size.s13};
      font-weight: ${({ theme }) => theme.weight.medium};
      white-space: nowrap;
      cursor: pointer;
    }

    .tagIcon {
      display: block;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.xs};
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => `0 ${theme.space.s4}`};
    font-size: ${({ theme }) => theme.size.s12};

    .error {
      color: ${({ theme }) => theme.direction.owe};
      font-weight: ${({ theme }) => theme.weight.regular};
    }
  }
`;

export const StyledInput = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  .input-container {
    box-sizing: border-box;
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.direction.owe : theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    transition: border-color 0.15s;

    input {
      border: none;
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: ${({ theme }) => theme.size.s15};
      width: 100%;
      outline: none;

      &::placeholder {
        color: ${({ theme }) => theme.ink.tertiary};
        opacity: 1;
      }
    }
  }
`;
