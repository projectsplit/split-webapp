import styled from 'styled-components';

export const StyledSetUpSpendingGoal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .errorMsg {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.direction.owe};
    display: flex;
    justify-content: start;
    padding: 0px 4px;
  }
  .inputAndErrorsWrapper {
    display: flex;
    flex-direction: column;
  }
  .prompt {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
    margin-bottom: ${({ theme }) => theme.space.s10};
  }

`;
