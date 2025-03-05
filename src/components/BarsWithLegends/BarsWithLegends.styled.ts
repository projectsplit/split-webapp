import styled from "styled-components";

export const StyledBarWithLegends = styled.div`
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
 
        border-radius: 10px;
        margin-right: 10px;
      }
      .bar2 {
        font-size: 1rem;

        height: 0.5rem;
        
        border-radius: 10px;
        margin-right: 10px;
      }
      .amount {
        font-weight: 600;
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

    }
  }
`;
