import styled from "styled-components";


export const StyledCurrentBudget = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  padding: 14px;
  gap: 20px;
  position: relative;

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

  .spentInfo {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;

    color: ${({ theme }) => theme.layer6};
    .currentBudgetTitle {
      align-self: center;
      height: 10px;
    }
  }

  .submitButton {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  }
`;
