import styled from "styled-components";

export const StyledFiltersAndBars = styled.div<{ $collapsed: boolean }>`
  overflow: hidden;
  max-height: ${({ $collapsed }) => ($collapsed ? "0px" : "200px")};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.35s ease;
  padding: ${({ $collapsed }) => ($collapsed ? "0 0.7rem" : "0.7rem")};

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
`;
