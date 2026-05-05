import styled from 'styled-components';

export const ChartPanel = styled.div`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: 320px;

  @media (min-width: 768px) {
    padding: 2rem;
    min-height: 500px;
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.75rem;
  z-index: 10;
  position: relative;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    gap: 1rem;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #ddb7ff;
    font-size: 1.25rem;
  }
`;

export const ChartTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #e5e2e1;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    letter-spacing: 0.1em;
  }
`;

export const LegendRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LegendDot = styled.div<{ $color: string; $glow?: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  ${({ $glow, $color }) =>
    $glow ? `box-shadow: 0 0 10px ${$color}80;` : ''}
`;

export const LegendLabel = styled.span<{ $color?: string }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: ${({ $color }) => $color ?? '#968e99'};
`;

export const ChartContainer = styled.div`
  flex: 1;
  position: relative;
  min-height: 220px;

  @media (min-width: 768px) {
    min-height: 350px;
  }
`;
