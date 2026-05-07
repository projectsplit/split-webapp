import styled, { keyframes } from 'styled-components';

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
  padding: 1.5rem 1rem 6rem;
  min-width: 0;

  @media (min-width: 768px) {
    padding: 2rem 1.5rem 6rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 1.5rem 4rem;
    margin-left: 16rem;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 2rem;
  @media (max-width: 1024px) {
    margin-bottom: 2rem;
    margin-top: 4.5rem;
  }
`;

export const BackLink = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #968e99;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0;
  margin-bottom: 0.5rem;

  svg {
    font-size: 0.875rem;
  }

  &:hover {
    color: #ddb7ff;
  }
`;

export const PageTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ddb7ff;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #968e99;
  margin: 0.375rem 0 0;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 4fr 8fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

export const FullWidthRow = styled.div`
  min-width: 0;

  @media (min-width: 1024px) {
    grid-column: 1 / -1;
  }
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem;
  animation: ${fadeIn} 0.5s ease;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  color: rgba(221, 183, 255, 0.3);
  margin-bottom: 1.5rem;

  svg {
    font-size: 4rem;
  }
`;

export const EmptyTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #e5e2e1;
  margin: 0 0 0.5rem;
`;

export const EmptyText = styled.p`
  color: #968e99;
  font-size: 0.875rem;
  max-width: 28rem;
  margin: 0 0 2rem;
  line-height: 1.5;
`;

export const EmptyButton = styled.button`
  background: #ddb7ff;
  color: #40215e;
  border: none;
  border-radius: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.75rem 2rem;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(221, 183, 255, 0.2);
  transition: all 0.15s ease;

  &:hover {
    background: #f0daff;
  }
`;
