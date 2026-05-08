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
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 8rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    padding: 2rem 1.5rem 8rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 1.5rem 6rem;
    margin-left: 16rem;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    margin-top: 4.5rem;
  }
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BackLink = styled.button`
  display: inline-flex;
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
  align-self: flex-start;

  svg {
    font-size: 0.875rem;
  }

  &:hover {
    color: #ddb7ff;
  }
`;

export const PageTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #e5e2e1;
  margin: 0;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #968e99;
`;

export const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
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
  background: rgba(28, 27, 27, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
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
  max-width: 32rem;
  margin: 0 0 2rem;
  line-height: 1.6;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 0 15px rgba(221, 183, 255, 0.2);
  transition: all 0.2s ease;

  svg {
    font-size: 1.125rem;
  }

  &:hover {
    background: #f0daff;
  }
`;
