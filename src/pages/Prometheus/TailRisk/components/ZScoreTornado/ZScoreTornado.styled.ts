import styled from 'styled-components';

export const Panel = styled.section`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;

  @media (min-width: 768px) {
    padding: 1.75rem 2rem;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ddb7ff;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 0.875rem;
  }
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.4);
  flex-wrap: wrap;
`;

export const LegendDot = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
`;

export const ChartArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.25rem;
`;

export const ThresholdLine = styled.div<{ $offsetPct: number }>`
  position: absolute;
  top: 0;
  bottom: 1.5rem;
  left: ${({ $offsetPct }) => $offsetPct}%;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    rgba(221, 183, 255, 0.35) 0,
    rgba(221, 183, 255, 0.35) 3px,
    transparent 3px,
    transparent 6px
  );
  pointer-events: none;
`;

export const ThresholdLabel = styled.span<{ $offsetPct: number }>`
  position: absolute;
  top: 0;
  left: ${({ $offsetPct }) => $offsetPct}%;
  transform: translateX(-50%);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  letter-spacing: 0.1em;
  color: rgba(221, 183, 255, 0.6);
  white-space: nowrap;
  pointer-events: none;
`;

export const Centerline = styled.div`
  position: absolute;
  top: 0;
  bottom: 1.5rem;
  left: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.15);
  pointer-events: none;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  position: relative;
  z-index: 1;
`;

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 0.5rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
`;

export const FactorName = styled.span`
  color: #e5e2e1;
  font-weight: 500;
`;

export const ZValue = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-weight: 600;
`;

export const Track = styled.div`
  position: relative;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const Bar = styled.div<{
  $widthPct: number;
  $direction: 'left' | 'right';
  $color: string;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ $direction }) => ($direction === 'right' ? 'left: 50%;' : 'right: 50%;')}
  width: ${({ $widthPct }) => $widthPct}%;
  background: ${({ $color, $direction }) =>
    $direction === 'right'
      ? `linear-gradient(to right, ${$color}55, ${$color}cc)`
      : `linear-gradient(to left, ${$color}55, ${$color}cc)`};
  transition: width 0.4s cubic-bezier(0.32, 0.72, 0, 1);
`;

export const ValueLabels = styled.div<{ $direction: 'left' | 'right' }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $direction }) =>
    $direction === 'right' ? 'flex-start' : 'flex-end'};
  padding: 0 0.75rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
  gap: 0.625rem;
  flex-wrap: wrap;
`;

export const ValueChip = styled.span<{ $tone: 'pop' | 'tail' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1875rem 0.5rem;
  border-radius: 0.25rem;
  background: ${({ $tone }) =>
    $tone === 'pop' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
  border: 1px solid
    ${({ $tone }) =>
      $tone === 'pop' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.12)'};
  font-size: 0.625rem;
  letter-spacing: 0.05em;

  small {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.5625rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  strong {
    color: ${({ $tone }) =>
      $tone === 'pop' ? 'rgba(255, 255, 255, 0.65)' : '#e5e2e1'};
    font-weight: 600;
  }
`;

export const AxisRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  margin-top: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.3);
`;

export const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
`;
