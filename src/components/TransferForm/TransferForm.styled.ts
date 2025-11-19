import styled from "styled-components";
interface StyledTransferFormProps {
  $inputError?: boolean;
  $noReceiverSelected?: boolean;
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

  .options {
    .nonGroupMenu {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 8px;

      .textAndButton {
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        flex-shrink: 0;

        .button {
          font-weight: bold;
          border: 1px solid ${({ theme }) => theme.highlightColor};
          border-radius: 5px;
          padding: 4px 8px;
          cursor: pointer;
          flex-shrink: 0;
          &.receiverButton {
            border-color: ${(props) =>
              props.$noReceiverSelected
                ? props.theme.redish
                : props.theme.highlightColor};
          }

          /* Sender button never red from this condition */
          &.senderButton {
            border-color: ${({ theme }) => theme.highlightColor};
          }
        }

        @media (max-width: 275px) {
          flex-direction: column;
          gap: 4px;
          white-space: normal;

          .text {
            text-align: center;
          }
        }
      }
    }
    .buttonWrapper {
      display: flex;
      justify-content: center;
      .groupButton {
        margin-top: 20px;
        width: 60px;
        background-color: ${({ theme }) => theme.layer2};
        cursor: pointer;
        border-radius: 10px;
        padding: 0.5rem;
        .groupIcon {
          display: flex;
          justify-self: center;
          color: ${({ theme }) => theme.deepPurple};
          font-size: 30px;
        }
        .descr {
          display: flex;
          justify-self: center;
          font-size: 10px;
          margin-top: 3px;
        }
      }
    }
    .errorMsg{
       font-size: 12px;
      color: ${({ theme }) => theme.errorColor};
      display: flex;
      justify-content: center;
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
  .bottomButtons {
    display: flex;
    flex-direction: row;
    align-items: center;

    .submitButton {
      flex-grow: 1;
    }
    .submitButton > * {
      width: 100%; /* Ensure the button inside takes full container width */
    }
    .calendarIcon {
      color: ${({ theme }) => theme.highlightColor};
      flex-shrink: 0;
      font-size: 30px;
      margin-right: 10px;
      margin-left: 10px;
    }
  }
`;
