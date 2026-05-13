import styled from 'styled-components';

export const StyledFiltersAndBarsSkeleton = styled.div`
  display: flex;
  flex-direction: column;

  .pillsShimmer {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow: hidden;
  }

  .barsShimmer {
    padding: 0.7rem;
    display: flex;
    flex-direction: column;

    .legendsShimmer {
      display: flex;
      flex-direction: row;
      gap: 10px;

      .groupingShimmer {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
      }
    }

    .barRowShimmer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
`;
