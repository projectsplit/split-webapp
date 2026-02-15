import styled from "styled-components";

export const StyledExpenses = styled.div`
  min-width: 100%;
  display: flex;
  padding: 16px 8px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  gap: 16px;
  flex: 1;

  .same-date-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    .date-only {
      background-color: ${({ theme }) => theme.backgroundcolor};
      align-self: center;
      position: sticky;
      top: 0;
      font-size: 14px;
      margin: 0px 0px 1px 0px;
      padding: 0px 8px 0px 8px;
      border-radius: 4px;
      color: ${({ theme }) => theme.secondaryTextColor};
      font-weight: 600;
    }
    .expenses {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

`;
