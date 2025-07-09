import styled from "styled-components";

export const StyledCumulativeSpending = styled.div`
  width: 100%;
  height: 330px;

  .periodOptions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #dddddd;
    font-weight: bold;
    font-size: 1.7em;
    margin-top: 20px;
    .period {
      align-self: center;
    }
    .rightArrow,
    .leftArrow {
      .arrow{
        font-size: 20px;
      }
      display: flex;
      display: row;
      justify-content: center;
      align-items: center;
      .futurePeriod,
      .pastPeriod {
  
        font-size: 15px;
      }
    }
  }
`;
