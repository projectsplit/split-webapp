import styled from 'styled-components';

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const GlassCard = styled.div<{ $accentColor: string }>`
  background: rgba(31, 31, 31, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(221, 183, 255, 0.08);
  border-left: 4px solid ${({ $accentColor }) => $accentColor}80;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
  position: relative;
  overflow: hidden;

  &:active {
    opacity: 0.9;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
`;

export const CardIcon = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  color: ${({ $color }) => $color};
  font-size: 1rem;
`;

export const CardLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #cfc2d6;
`;

export const CardAmount = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #e2e2e2;
`;

export const CardSubtext = styled.div`
  font-size: 10px;
  color: rgba(207, 194, 214, 0.6);
  font-weight: 500;
  line-height: 1.4;
`;

export const BalanceLine = styled.div<{ $color?: string }>`
  font-size: 10px;
  color: ${({ $color }) => $color || 'rgba(207, 194, 214, 0.6)'};
  font-weight: 500;
  line-height: 1.4;
`;

export const ProgressBar = styled.div<{ $percent: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: ${({ $percent }) => Math.min($percent, 100)}%;
  background: rgba(221, 183, 255, 0.3);
  border-radius: 0 2px 0 0;
`;
