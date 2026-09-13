import styled from 'styled-components';

export const StyledFiltersAndBarsSkeleton = styled.div`
  .label,
  .figure,
  .percent {
    position: relative;
    display: inline-block;
  }

  .label > div,
  .figure > div,
  .percent > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
