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
  .filtersAndBars {
    .pills {
      padding-left: 0.7rem;
      padding-right: 0.7rem;
      display: flex;
      flex-direction: row;
      gap: 10px;
      overflow-x: auto;
      text-align: center;
      scrollbar-width: none;
    }
  }
  .noFilteredData {
    display: flex;
    flex-direction: column;
    flex: 1;
    .pills {
      padding-left: 0.7rem;
      padding-right: 0.7rem;
      display: flex;
      flex-direction: row;
      gap: 10px;
      overflow-x: auto;
      text-align: center;
      scrollbar-width: none;
    }
    .textAndIcon {
      white-space: normal;
      text-align: center;
      margin-top: 10rem;

      .text {
        opacity: 0.5;
        white-space: normal;
        overflow: visible;
        text-overflow: clip;
        text-align: center;
         .emoji{
          opacity:1
        }
      }
    }

    .icon {
      display: flex;
      justify-self: center;
      font-size: 100px;
      opacity: 0.5;
      margin-top: 10px;
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
  .spinnerTotals {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    height: 100%;
  }
`;
