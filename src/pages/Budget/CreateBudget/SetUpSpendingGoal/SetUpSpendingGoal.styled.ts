import styled from 'styled-components';

export const StyledSetUpSpendingGoal = styled.div`
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
  .inputAndErrorsWrapper {
    display: flex;
    flex-direction: column;
  }
`;
