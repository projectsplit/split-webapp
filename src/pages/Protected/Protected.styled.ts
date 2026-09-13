import { styled } from 'styled-components';

export const StyledProtected = styled.div`
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  > div[style*='position: fixed'] {
    z-index: 4;
  }
`;
