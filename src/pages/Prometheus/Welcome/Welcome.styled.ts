import styled from 'styled-components';

export const PageRoot = styled.div`
  position: relative;
  background-color: #131313;
  color: #e2e2e2;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  ::selection {
    background: rgba(221, 183, 255, 0.3);
  }
`;

export const Main = styled.main`
  position: relative;
  max-width: 64rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;
