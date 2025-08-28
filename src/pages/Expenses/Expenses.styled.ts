import styled from "styled-components";

export const StyledExpenses = styled.div`
  min-width: 100%;
  display: flex;
  padding: 16px 8px;
  flex-direction: column;
  /* align-items: center; */
  overflow-y: auto;
  height: 100%;
  gap: 16px;
  flex: 1;
  .filtersAndBars {
    
    .pills {
      padding-left:0.7rem;
      padding-right:0.7rem;
      display: flex;
      flex-direction: row;
      gap: 10px;
      overflow-x: auto;
      text-align: center;
      scrollbar-width: none;
    }
  }
  .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    .emojiMessage {
      display: flex;
      flex-direction: row;
      gap: 5px;
      align-items: center;
      .msgExp {
        opacity: 0.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .icon {
      display: flex;
      font-size: 100px;
    }
  }
  .barsWithLegends {
    display: flex;
    flex-direction: column;
    /* align-self: flex-start; */
    padding: 0.7rem;
    .barsAndAmounts {
      display: flex;
      flex-direction: column;

      .barAndAmount {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        .bar1 {
          font-size: 1rem;

          height: 0.5rem;
          background-color: #5183ee;
          border-radius: 10px;
          margin-right: 10px;
        }
        .bar2 {
          font-size: 1rem;

          height: 0.5rem;
          background-color: #e151ee;
          border-radius: 10px;
          margin-right: 10px;
        }
        .amount {
        }
      }
    }
    .legends {
      display: flex;
      flex-direction: row;
      gap: 10px;

      .grouping {
        display: flex;
        flex-direction: row;
        gap: 10px;
        .legendUser,
        .legendGroup {
          font-size: 18px;
          width: 1rem;
          height: 1rem;

          border-radius: 5px;
        }
        .descr {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .legendUser {
          background-color: #e151ee;
        }
        .legendGroup {
          background-color: #5183ee;
        }
      }
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

  .spinner {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    height: 100%;
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
