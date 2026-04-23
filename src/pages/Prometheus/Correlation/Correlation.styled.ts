import styled from 'styled-components';

export const PageRoot = styled.div`
  position: relative;
  min-height: 100%;
  background-color: #131313;
  color: #e2e2e2;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  padding-bottom: 2.5rem;

  ::selection {
    background: rgba(221, 183, 255, 0.3);
  }
`;

export const Main = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 0;
`;

export const Vignette = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 60;
  background: radial-gradient(
    circle at top right,
    rgba(221, 183, 255, 0.05) 0%,
    transparent 50%
  );
`;
