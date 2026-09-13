import styled from 'styled-components';

export const StyledSharedContainer = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surface.page};
  position: relative;

  .segmentedWrapper {
    flex-shrink: 0;
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s16}`};
  }

  .groupsPane {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .bottom-bar {
    margin-top: auto;
  }
`;
