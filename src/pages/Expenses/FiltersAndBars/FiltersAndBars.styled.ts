import styled from 'styled-components';

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
`;
