import styled from 'styled-components';

export const ChartPanel = styled.div`
  background-color: #1c1b1b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 26rem;

  @media (min-width: 768px) {
    min-height: 32rem;
  }
`;

export const ChartHeader = styled.div`
  background: #0e0e0e;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }
`;

export const ChartTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e5e2e1;
  margin: 0;
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const LegendDot = styled.span<{ $color: string; $dashed?: boolean }>`
  display: block;
  width: 0.75rem;
  height: 0.125rem;
  background: ${({ $color }) => $color};
  border-radius: 1px;
  ${({ $dashed }) =>
    $dashed
      ? `
    background: repeating-linear-gradient(
      90deg,
      currentColor 0,
      currentColor 3px,
      transparent 3px,
      transparent 6px
    );
  `
      : ''}
`;

export const LegendBand = styled.span`
  display: block;
  width: 0.75rem;
  height: 0.5rem;
  background: rgba(221, 183, 255, 0.2);
  border: 1px solid rgba(221, 183, 255, 0.4);
  border-radius: 1px;
`;

export const LegendLabel = styled.span<{ $color?: string }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: ${({ $color }) => $color ?? 'rgba(255, 255, 255, 0.5)'};
`;

export const ChartContainer = styled.div`
  flex: 1;
  padding: 1rem 1.25rem 1rem 0.5rem;
  position: relative;
  min-height: 20rem;

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 1.5rem 0.75rem;
  }
`;
