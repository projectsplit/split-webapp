import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #a1a1aa;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-bottom: 2rem;

  &:hover {
    background: rgba(221, 183, 255, 0.08);
    border-color: rgba(221, 183, 255, 0.3);
    color: #ddb7ff;
  }

  svg {
    font-size: 1rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.4s ease forwards;
`;

export const PercentileTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(221, 183, 255, 0.1);
  border: 1px solid rgba(221, 183, 255, 0.2);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #ddb7ff;
  margin-bottom: 0.75rem;
`;

export const Title = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ddb7ff;
  margin: 0.75rem 0 0.5rem;
`;

export const Subtitle = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #968e99;
  margin: 0;
`;

export const WealthDisplay = styled.div`
  margin-top: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.01em;

  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
`;

export const WealthLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: #71717a;
  display: block;
  margin-bottom: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 0.03em;
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease 0.1s both;

  @media (min-width: 1024px) {
    grid-template-columns: 1.4fr 1fr;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1.5rem;
  padding: 1.5rem 2rem;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    pointer-events: none;
    background: radial-gradient(
      ellipse at top left,
      rgba(221, 183, 255, 0.03) 0%,
      transparent 60%
    );
  }
`;

export const CardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #ddb7ff;
  margin: 0 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.01em;

  svg {
    font-size: 1.125rem;
  }
`;

export const NarrativeText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #c4c4cc;
  margin: 0;
  font-style: italic;
`;

export const ChartWrap = styled.div`
  position: relative;
  height: 280px;
  margin-top: 0.5rem;
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
