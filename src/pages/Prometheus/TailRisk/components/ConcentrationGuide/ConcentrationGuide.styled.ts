import styled from 'styled-components';

export const Panel = styled.section`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;
  background-image: linear-gradient(
    180deg,
    rgba(221, 183, 255, 0.04) 0%,
    rgba(221, 183, 255, 0) 100%
  );

  @media (min-width: 768px) {
    padding: 1.75rem 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;

  svg {
    color: #ddb7ff;
    font-size: 1rem;
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ddb7ff;
`;

export const TierGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.625rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const TierCard = styled.div<{ $color: string; $bg: string; $border: string }>`
  padding: 1rem;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TierHead = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $color }) => $color};

  svg {
    font-size: 1.125rem;
  }
`;

export const TierLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.05em;
`;

export const TierText = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.55);
`;
