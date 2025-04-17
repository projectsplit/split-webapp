import { styled } from "styled-components";

export const StyledBarsAndAmounts = styled.div`
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
      font-size: 14px;
      font-weight: 600;
    }
  }
`;
