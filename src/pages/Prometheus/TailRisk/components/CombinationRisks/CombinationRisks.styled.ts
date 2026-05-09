import styled from 'styled-components';

export const Panel = styled.section`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

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

export const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const TabChip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: ${({ $active }) =>
    $active ? 'rgba(221, 183, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid
    ${({ $active }) => ($active ? '#ddb7ff' : 'rgba(255, 255, 255, 0.08)')};
  color: ${({ $active }) => ($active ? '#ddb7ff' : 'rgba(255, 255, 255, 0.5)')};
  border-radius: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? 'rgba(221, 183, 255, 0.15)' : 'rgba(255, 255, 255, 0.07)'};
    color: ${({ $active }) => ($active ? '#ddb7ff' : '#e5e2e1')};
  }

  span.idx {
    color: rgba(255, 255, 255, 0.35);
    font-weight: 400;
  }
`;

export const PairLabel = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
`;

export const Explanation = styled.p`
  margin: 0;
  padding: 0.75rem 0.875rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

export type CellTone = 'safe' | 'critical' | 'elevated' | 'moderate' | 'neutral';

const CELL_STYLES: Record<CellTone, string> = {
  safe: `
    background: rgba(74, 225, 118, 0.08);
    border: 1px solid rgba(74, 225, 118, 0.2);
  `,
  critical: `
    background: rgba(239, 68, 68, 0.12);
    border: 2px solid #ef4444;
  `,
  elevated: `
    background: rgba(249, 115, 22, 0.1);
    border: 1px solid rgba(249, 115, 22, 0.35);
  `,
  moderate: `
    background: rgba(253, 186, 116, 0.08);
    border: 1px solid rgba(253, 186, 116, 0.25);
  `,
  neutral: `
    background: rgba(40, 40, 40, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
  `,
};

export const Cell = styled.div<{ $tone: CellTone }>`
  position: relative;
  border-radius: 0.375rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 6rem;
  overflow: hidden;
  ${({ $tone }) => CELL_STYLES[$tone]}
`;

const BADGE_BG: Record<string, string> = {
  critical: '#ef4444',
  elevated: '#f97316',
  moderate: '#fdba74',
};

export const SeverityBadge = styled.span<{ $tone: CellTone }>`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ $tone }) => BADGE_BG[$tone] ?? 'rgba(255,255,255,0.15)'};
  color: ${({ $tone }) => ($tone === 'moderate' ? '#1a1a1a' : '#000')};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.5rem;
  letter-spacing: 0.04em;
  padding: 0.125rem 0.4rem;
  text-transform: capitalize;
`;

export const CellLabels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CellLabel = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};

  svg {
    font-size: 0.75rem;
  }
`;

export const CellValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin-top: 0.5rem;

  small {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.5625rem;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
  }

  strong {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.875rem;
    font-weight: 700;
    color: #e5e2e1;
  }
`;

export const StatsBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0.25rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StatLabel = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

export const StatLine = styled.div<{ $tone?: 'error' | 'primary' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;

  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  ${StatLabel} {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0;
    color: rgba(255, 255, 255, 0.45);
  }

  span:last-child {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${({ $tone }) =>
      $tone === 'error'
        ? '#ef4444'
        : $tone === 'primary'
          ? '#ddb7ff'
          : '#e5e2e1'};
  }
`;

export const HintIcon = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.8125rem;
  height: 0.8125rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Inter', sans-serif;
  font-size: 0.4375rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.25);
  cursor: help;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(221, 183, 255, 0.35);
    color: rgba(221, 183, 255, 0.6);
    background: rgba(221, 183, 255, 0.05);
  }

  &:hover > span {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

export const HintTooltip = styled.span`
  position: absolute;
  bottom: calc(100% + 0.625rem);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  width: 15rem;
  padding: 0.625rem 0.75rem;
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.005em;
  color: rgba(255, 255, 255, 0.6);
  white-space: normal;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  z-index: 10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

export const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
`;
