import { styled } from "styled-components";

export const StyledFormInput = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;

  .labelIconAndInputField {
    display: flex;
    flex-direction: row;

    &:focus-within {
      .labelSelectorWrapper,
      .input-container {
        border-color: ${({ theme, $hasError }) =>
          $hasError ? theme.errorColor : theme.highlightColor};
      }
    }

    .labelSelectorWrapper {
      background-color: ${({ theme }) => theme.layer2};
      border-top: 1px solid
        ${({ theme, $hasError }) =>
          $hasError ? theme.errorColor : theme.lineColor};
      border-bottom: 1px solid
        ${({ theme, $hasError }) =>
          $hasError ? theme.errorColor : theme.lineColor};
      border-left: 1px solid
        ${({ theme, $hasError }) =>
          $hasError ? theme.errorColor : theme.lineColor};
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      transition: border-color 0.15s;

      .labelSelector {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        margin-left: 10px;
        font-size: 1.125rem;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
      }
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
    font-size: 12px;
    background-color: ${({ theme }) => theme.backgroundcolor};

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }
`;

export const StyledInput = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .input-container {
    background-color: ${({ theme }) => theme.layer2};
    border-top: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.errorColor : theme.lineColor};
    border-bottom: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.errorColor : theme.lineColor};
    border-right: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.errorColor : theme.lineColor};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 0.5em 1em;
    transition: border-color 0.15s;

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
`;
