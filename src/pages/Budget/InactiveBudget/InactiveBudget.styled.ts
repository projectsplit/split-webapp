import { styled } from 'styled-components';

export const StyledInactiveBudget = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.layer2};
  border-color: ${({ theme }) => theme.layer2};
  border-style: solid;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border: none;
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 15px;
  .budgetTitle {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .toggleAndInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .miscInfo {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 25px;
      .dates,
      .averageSpending,
      .remainingDays {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;
