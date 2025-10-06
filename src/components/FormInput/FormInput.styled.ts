import { styled } from "styled-components";

export const StyledInput = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;

  .input-container {
    padding:0.8rem;
    background-color: ${({ theme }) => theme.layer2};
    border-radius: 8px;
    border-radius: 8px;
    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.errorColor : theme.lineColor};
  
    transition: border-color 0.15s;

    &:focus-within {
      border-color: ${({ theme, $hasError }) =>
        $hasError ? theme.errorColor : theme.highlightColor};
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
        color: ${({ theme }) => theme.secondaryTextColor};
        opacity: 1;
      }
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
    font-size: 12px;
    background-color: ${({ theme }) => theme.backgroundcolor};

    .description {
      color: ${({ theme }) => theme.secondaryTextColor};
    }

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }
`;