import styled from "styled-components";

export const StyledSetUpSpendingGoal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .errorMsg {
    font-size: 12px;
    color: ${({ theme }) => theme.pink};
  }
  .inputAndErrorsWrapper {
    display: flex;
    flex-direction: column;
  }
`;
