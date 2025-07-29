import styled from "styled-components";

export const StyledSpendingCycle = styled.div`
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
`;
