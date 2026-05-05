import styled from 'styled-components';

export const SummaryPanel = styled.div`
  background: #353534;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
    gap: 1rem;
  }
`;

export const SummaryIcon = styled.span`
  color: #ddb7ff;
  opacity: 0.8;
  flex-shrink: 0;

  svg {
    font-size: 1.875rem;
  }
`;

export const SummaryContent = styled.div`
  flex: 1;
`;

export const SummaryLabel = styled.h4`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #968e99;
  margin: 0 0 0.5rem;
`;

export const SummaryText = styled.p`
  color: #e5e2e1;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.6;
  margin: 0;
  word-break: break-word;
  overflow-wrap: break-word;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;
