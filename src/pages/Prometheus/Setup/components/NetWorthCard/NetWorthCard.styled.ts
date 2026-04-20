import styled from 'styled-components';

export const Card = styled.div`
  background: #1b1b1b;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(77, 67, 84, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const Label = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.625rem;
  color: #cfc2d6;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0 0 1rem;
`;

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
`;

export const Amount = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #4ae176;
  letter-spacing: -0.02em;
  line-height: 1;
`;

export const DeltaChip = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  color: #4ae176;
  background: rgba(74, 225, 118, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
`;
