import styled from 'styled-components';

export const CapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  border-radius: 1rem;
  background-color: #1b1b1b;
  border: 1px solid rgba(77, 67, 84, 0.1);
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;

  &:active {
    background-color: #2a2a2a;
  }
`;

export const CapHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  svg {
    font-size: 1.125rem;
    color: #ddb7ff;
  }
`;

export const CapLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #e2e2e2;
`;

export const CapAmounts = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #e2e2e2;
  margin-bottom: 0.25rem;

  .separator {
    color: rgba(207, 194, 214, 0.4);
    font-weight: bold;
  }
`;

export const CapDates = styled.div`
  font-size: 12px;
  color: rgba(207, 194, 214, 0.6);
  font-weight: 500;
`;

export const CapProgress = styled.div<{ $percent: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: ${({ $percent }) => Math.min($percent, 100)}%;
  background: rgba(221, 183, 255, 0.3);
  border-radius: 0 2px 0 0;
`;
