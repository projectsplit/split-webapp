import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const HeroSection = styled.div`
  margin-bottom: 3rem;
`;

export const Tagline = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const Pulse = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #ddb7ff;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const TaglineText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #cfc2d6;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

export const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;
  color: #e2e2e2;
  line-height: 1.05;

  .accent {
    color: #ddb7ff;
    font-style: italic;
  }
`;

export const Lead = styled.p`
  color: #cfc2d6;
  max-width: 36rem;
  line-height: 1.6;
  margin: 0;
`;
