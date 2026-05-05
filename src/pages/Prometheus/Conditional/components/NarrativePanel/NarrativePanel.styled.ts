import styled from 'styled-components';

export const Panel = styled.section`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export const IconWrap = styled.div`
  color: #4b444f;
  margin-top: 0.125rem;
  flex-shrink: 0;

  svg {
    font-size: 1.5rem;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;

export const Title = styled.h3`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #ddb7ff;
  margin: 0;
`;

export const NarrativeText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #cdc3d0;
  margin: 0;
  max-width: 40rem;
  word-break: break-word;
`;
