import styled from "styled-components";

export const StyledCreateBudget = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  padding: 14px;
  gap: 20px;
  position: relative;

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
    content: "";
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
      color: ${({ theme }) => theme.pink};
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
