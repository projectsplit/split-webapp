import styled from "styled-components";

export const StyledExpenses = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%; /* Important: parent must have a defined height */
  overflow: hidden; /* Stops the whole page from scrolling */
  flex: 1;

  .scroll-area {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 16px 8px; /* Moves the list padding here */
    gap: 16px;

    .expense-highlight {
      animation: highlight-fade 8s ease-out;
      border-radius: 10px;
      }
  }
  
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
  @keyframes highlight-fade {
      0% {
        box-shadow: 0 0 0 4px #8300e7, 0 0 10px #8300e7;
      }
      100% {
        box-shadow: 0 0 0 0px transparent, 0 0 0px transparent;
      }
    }
`;
