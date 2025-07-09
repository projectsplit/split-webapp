import { styled } from "styled-components";

export const StyledAnalytics = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  /* background-color: ${({ theme }) => theme.layer2}; */
  width: 100%;
  height: 100%;
  padding: 14px;
  gap: 20px;
  position: relative;

  .buttons {
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .groupCategories {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 4px;
  }

  .buttonChart {
    font-size: 40px;
    color: ${({ theme }) => theme.deepPurple};
  }
  .calendar {
    font-size: 25px;
    color: ${({ theme }) => theme.layer6};
    border-top: 15px;
  }

  .dashed {
    width: 40px;
    fill: ${({ theme }) => theme.deepPurple};
  }

  .charts {
    .chartWrapper {
      display: flex;
      flex-direction: column;
      .chart {
        width: 600px;
        align-self: center;
      }
    }
  }
  .dateOptions {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    .height {
      height: 13px;
    }
  }
   .spinner {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
 
    height: 100%;
  }
`;
