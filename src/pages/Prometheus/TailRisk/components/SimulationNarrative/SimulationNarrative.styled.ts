import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Panel = styled.section`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;
  background-image: linear-gradient(
    180deg,
    rgba(221, 183, 255, 0.05) 0%,
    rgba(221, 183, 255, 0) 100%
  );

  @media (min-width: 768px) {
    padding: 1.75rem 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;

  svg {
    color: #ddb7ff;
    font-size: 1rem;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ddb7ff;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  animation: ${fadeUp} 0.4s ease;

  & + & {
    margin-top: 1.25rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const SectionLabel = styled.div<{ $tone: 'portrait' | 'diagnosis' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ $tone }) =>
    $tone === 'portrait' ? 'rgba(221, 183, 255, 0.85)' : 'rgba(249, 187, 77, 0.85)'};

  svg {
    font-size: 0.875rem;
    color: ${({ $tone }) =>
      $tone === 'portrait' ? '#ddb7ff' : '#f9bb4d'};
  }
`;

export const Paragraph = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: #cdc3d0;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
`;

export const BulletList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Bullet = styled.li<{ $highlight?: boolean }>`
  display: flex;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.375rem;

  ${({ $highlight }) =>
    $highlight
      ? `
    background: rgba(221, 183, 255, 0.05);
    border-left: 2px solid rgba(221, 183, 255, 0.6);
    color: #ddb7ff;
    font-weight: 500;
  `
      : `
    border-left: 2px solid rgba(255, 255, 255, 0.04);
  `}

  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: ${({ $highlight }) => ($highlight ? '#ddb7ff' : '#cdc3d0')};

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const BulletIcon = styled.span<{ $highlight?: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  margin-top: 0.125rem;
  color: ${({ $highlight }) =>
    $highlight ? '#ddb7ff' : 'rgba(221, 183, 255, 0.5)'};

  svg {
    font-size: 0.875rem;
  }
`;
