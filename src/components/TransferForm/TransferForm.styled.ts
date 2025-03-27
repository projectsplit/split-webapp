import styled from "styled-components";
interface StyledTransferFormProps {
  inputError?: boolean;
}

export const StyledTransferForm = styled.div<StyledTransferFormProps>`
  position: fixed;
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.backgroundcolor};
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 20px;
  z-index: 10;
  bottom: 0;
  overflow-y: auto;
  .sendMenuWrapper {
    .sendMenu {
      padding: 10px;
      border: 1px solid
        ${({ theme, inputError }) =>
          inputError ? theme.errorColor : theme.backgroundcolor};
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
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    .closeButtonContainer {
      position: relative;
      cursor: pointer;
      display: inline-block;
    }

    .closeButton {
      cursor: pointer;
      display: block;
      font-size: 1.875rem;
    }

    .closeButtonContainer:hover::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: rgba(128, 128, 128, 0.3);
      pointer-events: none;
    }

    .title {
      font-weight: 600;
    }
    .gap {
      margin-right: 0.9375rem;
    }
  }
  .inputAndErrorsWrapper {
    display: flex;
    flex-direction: column;
    .errorMsg {
      font-size: 12px;
      color: ${({ theme }) => theme.errorColor};
      display: flex;
      justify-content: end;
    }
  }
  .spacer {
    flex-grow: 1;
  }
`;
