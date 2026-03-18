import styled from 'styled-components';

export const StyledCreateBudget = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 14px;
  gap: 20px;
  position: relative;
  overflow-x: hidden;

  .errorsWrapper {
    display: flex;
    flex-direction: column;
    .errorMsg {
      font-size: 12px;
      color: ${({ theme }) => theme.errorColor};
      display: flex;
      justify-content: start;
      padding: 0px 4px;
    }
  }

  .backButtonContainer {
    position: relative;
    cursor: pointer;
    display: inline-block;
  }

  .backButton {
    cursor: pointer;
    display: block;
    font-size: 30px;
  }

  .backButtonContainer:hover::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(128, 128, 128, 0.3);
    pointer-events: none;
  }

  .topBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    justify-content: space-between;
    margin-right: 30px;
  }
  .descr {
    flex: 1;
    text-align: center;
  }

  .promptSpendingCycle {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .errorMsg {
      font-size: 12px;
      color: ${({ theme }) => theme.errorColor};
      display: flex;
      justify-content: start;
      padding: 0px 4px;
    }
    .calendarAndErrorsWrapper,
    .inputAndErrorsWrapper {
      display: flex;
      flex-direction: column;
    }
    .spendingCycleHeader {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      .information {
        cursor: pointer;
        font-size: 23px;
        font-weight: bold;
        color: ${({ theme }) => theme.yellow};
      }
    }
  }

  .spentInfo {
    color: ${({ theme }) => theme.layer6};
    animation: fadeIn 0.5s;
    font-size: 14px;
  }

  .categoryButtons {
    gap: 10px;
    display: flex;
    flex-direction: row;
  }

  .submitButton {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  }

  .monthlyPropmt {
    display: flex;
    flex-direction: row;
    .sup {
      margin-top: -3px;
    }
  }

  .step-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  /* --- Carousel Transitions --- */
  .transition-group {
    display: grid;
    grid-template-columns: 100%;
    width: 100%;
    position: relative;
    min-height: 400px;
    overflow: hidden;
  }

  .step-container {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Forward (Next): A exits left, B enters from right */
  .fade-enter {
    transform: translateX(100%);
  }
  .fade-enter-active {
    transform: translateX(0%);
    transition: transform 300ms ease-out;
  }
  .fade-exit {
    transform: translateX(0%);
  }
  .fade-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-out;
  }

  /* Backward (Back): B exits right, A enters from left */
  .fade-back-enter {
    transform: translateX(-100%);
  }
  .fade-back-enter-active {
    transform: translateX(0%);
    transition: transform 300ms ease-out;
  }
  .fade-back-exit {
    transform: translateX(0%);
  }
  .fade-back-exit-active {
    transform: translateX(100%);
    transition: transform 300ms ease-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
