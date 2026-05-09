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

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Title = styled.h3`
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

export const Meta = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.05em;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const LeafRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 2.4fr) minmax(0, 0.9fr);
    gap: 1rem;
    align-items: center;
  }
`;

export const Rules = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  align-items: center;
`;

export const RuleChip = styled.span<{ $tone: 'down' | 'up' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: ${({ $tone }) =>
    $tone === 'down' ? 'rgba(74, 225, 118, 0.06)' : 'rgba(239, 68, 68, 0.08)'};
  border: 1px solid
    ${({ $tone }) =>
      $tone === 'down' ? 'rgba(74, 225, 118, 0.2)' : 'rgba(239, 68, 68, 0.25)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: ${({ $tone }) => ($tone === 'down' ? '#a5e8b9' : '#ffb4ab')};

  svg {
    font-size: 0.75rem;
  }
`;

export const RuleConnector = styled.span`
  color: rgba(255, 255, 255, 0.25);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
`;

export const BarTrack = styled.div`
  position: relative;
  height: 1.75rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $widthPct: number; $color: string }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $widthPct }) => Math.max(0.5, $widthPct)}%;
  background: linear-gradient(
    to right,
    ${({ $color }) => $color}66,
    ${({ $color }) => $color}cc
  );
  border-right: 1px solid ${({ $color }) => $color};
  transition: width 0.4s cubic-bezier(0.32, 0.72, 0, 1);
`;

export const BaselineLine = styled.div<{ $offsetPct: number }>`
  position: absolute;
  top: -0.25rem;
  bottom: -0.25rem;
  left: ${({ $offsetPct }) => $offsetPct}%;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    rgba(221, 183, 255, 0.5) 0,
    rgba(221, 183, 255, 0.5) 3px,
    transparent 3px,
    transparent 6px
  );
  pointer-events: none;
`;

export const BarLabel = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 0.625rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #fff;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

export const Annotation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  align-items: flex-end;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  text-align: right;

  @media (max-width: 1023px) {
    align-items: flex-start;
    text-align: left;
  }
`;

export const LiftTag = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1875rem 0.5rem;
  border-radius: 9999px;
  background: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}55;
  color: ${({ $color }) => $color};
  font-weight: 700;
  font-size: 0.6875rem;

  svg {
    font-size: 0.75rem;
  }
`;

export const Volume = styled.span`
  color: rgba(255, 255, 255, 0.55);
`;

export const Capture = styled.span`
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.5625rem;
`;

export const BaselineLegend = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.4);

  &::before {
    content: '';
    width: 1.5rem;
    height: 0;
    border-top: 1px dashed rgba(221, 183, 255, 0.6);
  }
`;

export const LeafExplanation = styled.p`
  margin: 0;
  padding: 0.5rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid rgba(221, 183, 255, 0.15);
  border-radius: 0 0.25rem 0.25rem 0;

  @media (min-width: 1024px) {
    grid-column: 1 / -1;
  }
`;

export const EmptyState = styled.div`
  padding: 2.5rem 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  line-height: 1.5;
`;
