import styled from "styled-components";

interface StyledTransferFormProps {
  $inputError?: boolean;
}

export const StyledSendMenu = styled.div<StyledTransferFormProps>`
  .sendMenu {
    padding: 10px;
    border: 1px solid
      ${({ theme, $inputError }) =>
        $inputError ? theme.errorColor : theme.backgroundcolor};
    border-radius: 8px;

    .title {
      font-weight: 600;
    }
    .options {
      display: flex;
      flex-direction: row;
      gap: 5px;
      flex-wrap: wrap;
      margin-top: 10px;

      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        background-color: ${({ theme }) => theme.layer2};
        border-width: 1px;
        border-radius: 8px;
        padding: 5px 12px;
        gap: 3px;
        font-size: 14px;
      }
    }
  }
  .errorMsg {
    font-size: 12px;
    color: ${({ theme }) => theme.errorColor};
    display: flex;
    justify-content: end;
  }
`;
