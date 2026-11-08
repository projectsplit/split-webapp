import styled from 'styled-components';

export const StyledFiltersAndBars = styled.div`
  flex-shrink: 0;

  .barsRow {
    border-bottom: 1px solid ${({ theme }) => theme.surface.hairline};
  }

  .pills {
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s6};
    /* Pills too many to fit scroll on their own, to either end, without swiping the page away. */
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s20} 0`};
  }

  .pills::-webkit-scrollbar {
    display: none;
  }
`;
