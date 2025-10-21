import styled from "styled-components";

export const StyledExpenseForm = styled.div`
  position: fixed;
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.backgroundcolor};
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 20px;
  bottom: 0;
  overflow-y: auto;
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
    flex-grow: 1; /* This pushes the button to the bottom */
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
    .locationIcon {
      color: ${({ theme }) => theme.yellow};
      flex-shrink: 0;
      font-size: 25px;
      margin-left: 20px;
      margin-right: 20px;
      display: flex;
      align-self: center;
    }
    .calendarIcon {
      color: ${({ theme }) => theme.highlightColor};
      flex-shrink: 0;
      font-size: 30px;

      margin-right: 10px;
    }
  }
  .textStyleInfo {
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    /* @media (max-width: 400px) {
      flex-direction: column;
      align-items: center;
    } */
  }
  .shareExpenseOption {
     text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    .button {
      font-weight: bold;
      display: inline-block;
      border: 1px solid #646cff;
      border-radius: 5px;
      padding: 4px 6px;
      cursor: pointer;
    }
  }
`;
