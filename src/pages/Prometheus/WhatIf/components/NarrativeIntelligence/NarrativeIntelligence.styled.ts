import styled from 'styled-components';

export const Panel = styled.div`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;

  svg {
    color: #ffddaa;
    font-size: 1.25rem;
  }
`;

export const PanelTitle = styled.h3`
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

export const Headline = styled.p`
  color: #e5e2e1;
  margin: 0 0 1.5rem;
  line-height: 1.6;
  font-size: 0.8125rem;
  word-break: break-word;
  overflow-wrap: break-word;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const ImpactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ImpactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  min-width: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.05);
  }

  @media (min-width: 768px) {
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

export const ImpactIcon = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color ?? '#4ae176'};
  margin-top: 0.125rem;
  flex-shrink: 0;

  svg {
    font-size: 0.875rem;
  }
`;

export const ImpactText = styled.span`
  font-size: 0.8125rem;
  color: #e5e2e1;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: break-word;
  min-width: 0;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;
