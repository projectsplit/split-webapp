import styled from "styled-components";

export const StyledCreateGroup = styled.div`
  position: fixed;
  font-size: 1.125rem;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.layer2};
  z-index: 3;
  display: flex;
  flex-direction: column;

  .inputAndCurrWrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .input {
      margin-top: 0.6rem;
      display: flex;
      flex-direction: column;
      padding: 0 0.875rem;
    }
    .currencySelectorWrapper {
      padding: 0 0.875rem;
      .currencySelector {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        background-color: #2d2d2d;
        border-radius: 4px;
        padding: 0.5rem;
        font-size: 1.125rem;
        width:140px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .angleDown {
          font-size: 1.5rem;
        }
      }

    }
  }
  .input {
    margin-top: 0.625rem;
    display: flex;
    flex-direction: column;
    padding: 0 0.875rem;
  }

  .submitButton {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: 0.875rem;
    padding: 0 0.875rem;
  }

  .header {
    padding: 0.875rem;
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
`;
