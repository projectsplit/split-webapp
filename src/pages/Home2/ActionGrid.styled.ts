import styled from 'styled-components';

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

export const ActionButton = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #1b1b1b;
  border: 1px solid rgba(77, 67, 84, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #e2e2e2;

  ${({ $fullWidth }) => $fullWidth && 'grid-column: span 2; margin-bottom: 0.5rem;'}

  &:active {
    background-color: #2a2a2a;
  }

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #cfc2d6;
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: #ddb7ff;
  }
`;

export const ButtonLabel = styled.span<{ $isPrimary?: boolean }>`
  font-size: 10px;
  font-weight: ${({ $isPrimary }) => ($isPrimary ? 900 : 700)};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ $isPrimary }) => ($isPrimary ? '#e2e2e2' : '#cfc2d6')};
`;

export const ButtonSubtext = styled.span`
  font-size: 8px;
  text-transform: uppercase;
  color: rgba(207, 194, 214, 0.6);
  margin-top: 0.25rem;
`;
