import styled from 'styled-components';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const Row = styled.div<{ $accent?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  &:last-child {
    border-bottom: none;
  }
`;

export const MetricName = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  color: #a1a1aa;
  letter-spacing: 0.02em;
`;

export const MetricValue = styled.span<{ $color?: string }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ $color }) => $color ?? '#e2e2e2'};
  letter-spacing: -0.01em;
`;

export const SectionLabel = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #ddb7ff;
  padding: 0.75rem 0 0.25rem;
  border-bottom: 1px solid rgba(221, 183, 255, 0.15);
  margin-top: 0.5rem;
`;
