import styled from 'styled-components';

export const StyledFiltersAndBarsSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.s12};

  .barsShimmer {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s4};
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s20}`};
  }

  .rowShimmer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    height: 21px;
  }

  .rowShimmer.below {
    justify-content: flex-end;
    height: 18.5px;
  }

  .bandShimmer {
    display: flex;
    align-items: center;
    height: 11px;
  }

`;
