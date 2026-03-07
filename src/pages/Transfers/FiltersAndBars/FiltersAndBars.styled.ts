import styled from "styled-components";

export const StyledFiltersAndBars = styled.div`
 
  flex-shrink: 0;
   .pills {
      display: flex;
      flex-direction: row;
      gap: 10px;
      overflow-x: auto;
      text-align: center;
      scrollbar-width: none;
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
`
