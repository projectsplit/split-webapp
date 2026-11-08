import styled from 'styled-components';

export const StyledTransactionTabs = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Each page scrolls up and down on its own. Not positioned, so whatever a page places absolutely
     is still placed against the screen around the track, as before. */
  .tabPage {
    box-sizing: border-box;
    flex: 0 0 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`;
