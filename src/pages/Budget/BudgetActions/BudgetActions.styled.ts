import styled from 'styled-components';

export const StyledBudgetActions = styled.div`
  position: fixed;
  font-size: 1.125rem;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  /* background-color: ${({ theme }) => theme.layer2}; */
  z-index: 4;
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 15px;
  display: flex;
  .buttons {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 15px;
    .buttonWrapper {
      position: relative;

      .budgetIcon {
        color: ${({ theme }) => theme.deepPurple};
        font-size: 30px;
      }
      .checkIcon {
        position: absolute;
        top: 15px;
        right: -5px;
        font-size: 15px;
        color: ${({ theme }) => theme.checkmarkGreen};
        background-color: ${({ theme }) => theme.layer2};
        border-radius: 50%;
        z-index: 2;
      }
    }
  }
`;
