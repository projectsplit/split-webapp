import styled from 'styled-components';

export const HeroSection = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  background: #0e0e0e;
`;

export const AmbientOrb = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24rem;
  height: 24rem;
  background: rgba(221, 183, 255, 0.05);
  filter: blur(80px);
  border-radius: 50%;
  pointer-events: none;
`;

export const HeroContent = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 10;
`;

export const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const HeroTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e5e2e1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;

  svg {
    color: #ddb7ff;
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const ComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 3rem 0;
  position: relative;
`;

export const BackgroundOrbLeft = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 12rem;
  height: 12rem;
  background: rgba(74, 225, 118, 0.1);
  filter: blur(60px);
  border-radius: 50%;
  pointer-events: none;
`;

export const BackgroundOrbRight = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 12rem;
  height: 12rem;
  background: rgba(221, 183, 255, 0.1);
  filter: blur(60px);
  border-radius: 50%;
  pointer-events: none;
`;

export const OrbRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  position: relative;
  z-index: 10;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

export const ProbabilityOrb = styled.div<{ $variant: 'baseline' | 'conditional' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
  backdrop-filter: blur(12px);

  ${({ $variant }) =>
    $variant === 'baseline'
      ? `
    border: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(32, 31, 31, 0.3);
    box-shadow: inset 0 0 20px rgba(74, 225, 118, 0.05);

    &:hover {
      border-color: rgba(74, 225, 118, 0.3);
    }
  `
      : `
    border: 1px solid rgba(221, 183, 255, 0.3);
    background: rgba(32, 31, 31, 0.6);
    box-shadow: inset 0 0 40px rgba(221, 183, 255, 0.1), 0 0 30px rgba(221, 183, 255, 0.05);

    &:hover {
      border-color: rgba(221, 183, 255, 0.5);
    }
  `}

  @media (min-width: 768px) {
    width: 14rem;
    height: 14rem;
  }
`;

export const OrbGradient = styled.div<{ $variant: 'baseline' | 'conditional' }>`
  position: absolute;
  inset: 0;

  ${({ $variant }) =>
    $variant === 'baseline'
      ? `background: linear-gradient(to bottom right, rgba(74, 225, 118, 0.05), transparent, transparent); opacity: 0.5;`
      : `background: linear-gradient(to top right, rgba(221, 183, 255, 0.2), transparent, transparent);`}
`;

export const OrbLabel = styled.span<{ $variant: 'baseline' | 'conditional' }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.25rem;
  position: relative;

  ${({ $variant }) =>
    $variant === 'baseline'
      ? `color: rgba(74, 225, 118, 0.7);`
      : `color: rgba(221, 183, 255, 0.8);`}

  @media (min-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

export const OrbValue = styled.div<{ $variant: 'baseline' | 'conditional' }>`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.875rem;
  letter-spacing: -0.02em;
  position: relative;
  transition: transform 0.5s ease;

  ${({ $variant }) =>
    $variant === 'baseline'
      ? `
    color: #e5e2e1;
    filter: drop-shadow(0 0 12px rgba(74, 225, 118, 0.3));
  `
      : `
    color: #ffffff;
    filter: drop-shadow(0 0 15px rgba(221, 183, 255, 0.5));
  `}

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const VsSeparator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

export const VsLine = styled.div`
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.1);
`;

export const VsBadge = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: #968e99;
  background: #131313;
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  margin: 0.5rem 0;
`;

export const FilterChips = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 36rem;
`;

export const FilterChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(42, 42, 42, 0.4);
  backdrop-filter: blur(4px);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: #cdc3d0;

  svg {
    font-size: 0.75rem;
    margin-right: 0.375rem;
    color: #ddb7ff;
  }
`;

export const SampleWarning = styled.div<{ $severity: 'caution' | 'severe' }>`
  margin-top: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${({ $severity }) =>
      $severity === 'severe'
        ? 'rgba(239, 96, 96, 0.35)'
        : 'rgba(245, 200, 90, 0.3)'};
  background: ${({ $severity }) =>
    $severity === 'severe'
      ? 'rgba(239, 96, 96, 0.08)'
      : 'rgba(245, 200, 90, 0.06)'};

  svg {
    color: ${({ $severity }) =>
      $severity === 'severe' ? '#ef6060' : '#f5c85a'};
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
`;

export const SampleWarningText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
`;

export const SampleWarningTitle = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e5e2e1;
`;

export const SampleWarningBody = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #cdc3d0;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MetricBox = styled.div`
  background: rgba(14, 14, 14, 0.5);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;

  &:hover p {
    color: #ddb7ff;
  }
`;

export const MetricLabel = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  text-transform: uppercase;
  color: #cdc3d0;
  margin: 0 0 0.5rem;
  transition: color 0.15s ease;
`;

export const MetricValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const MetricValue = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
  color: #e5e2e1;
`;

export const MetricSuffix = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: #968e99;
  text-transform: uppercase;
`;
