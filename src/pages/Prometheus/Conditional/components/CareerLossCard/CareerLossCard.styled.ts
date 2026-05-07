import styled from 'styled-components';

export const HeaderInfo = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

export const InfoIcon = styled.button`
  background: none;
  border: none;
  color: #968e99;
  cursor: help;
  padding: 0;
  display: inline-flex;
  align-items: center;

  svg {
    font-size: 0.875rem;
  }

  &:hover {
    color: #ddb7ff;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.375rem;
  padding: 0.625rem 0.75rem;
  width: 18rem;
  max-width: 80vw;
  background: rgba(20, 20, 20, 0.97);
  border: 1px solid rgba(221, 183, 255, 0.15);
  border-radius: 0.375rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  line-height: 1.45;
  color: #cfc7d1;
  z-index: 5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
  pointer-events: none;
`;

export const SummaryBlock = styled.div`
  margin-top: 0.875rem;
  padding: 0.75rem 0.875rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SummaryHeadline = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ddb7ff;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
`;

export const SummaryLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #968e99;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

export const FixedTag = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
`;

export const SummaryValue = styled.span<{ $variant?: 'gain' | 'cost' | 'muted' }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $variant }) => {
    if ($variant === 'gain') return '#7ee5a3';
    if ($variant === 'cost') return '#e5e2e1';
    if ($variant === 'muted') return 'rgba(255, 255, 255, 0.45)';
    return '#e5e2e1';
  }};
`;

export const SummaryDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 0.125rem 0;
`;

export const NoteLine = styled.div<{ $variant?: 'gain' | 'cost' }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  line-height: 1.4;
  color: ${({ $variant }) =>
    $variant === 'gain' ? '#7ee5a3' : '#cfc7d1'};
  margin-top: 0.25rem;
`;
