import styled from 'styled-components';

export const PageRoot = styled.div`
  position: relative;
  min-height: 100%;
  background-color: #131313;
  color: #e2e2e2;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;

  ::selection {
    background: rgba(221, 183, 255, 0.3);
  }
`;

export const Main = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;

  @media (min-width: 1024px) {
    padding: 3rem 1.5rem 4rem;
    margin-left: 16rem;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 3rem;
`;

export const PageTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ddb7ff;
  margin: 0 0 0.5rem;
`;

export const PageSubtitle = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #968e99;
  margin: 0;
`;

export const SectionTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #e2e2e2;
  margin: 0 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SectionIcon = styled.span`
  color: #ddb7ff;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;

export const Section = styled.section`
  margin-bottom: 3rem;
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
