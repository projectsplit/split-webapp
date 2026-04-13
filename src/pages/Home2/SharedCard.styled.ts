import styled from 'styled-components';

export const SharedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  border-radius: 1rem;
  background-color: #1b1b1b;
  border: 1px solid rgba(77, 67, 84, 0.1);
  cursor: pointer;
  gap: 0.375rem;
  transition: background-color 0.2s ease;

  &:active {
    background-color: #2a2a2a;
  }
`;

export const SharedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.5rem;
    color: #ddb7ff;
  }
`;

export const SharedLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #e2e2e2;
`;

export const SharedBalanceInfo = styled.div`
  font-size: 0.8125rem;
  color: #cfc2d6;

  .owe {
    color: ${({ theme }) => theme.redish};
  }

  .owed {
    color: ${({ theme }) => theme.green};
  }

  .settled {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .checkmark {
    color: ${({ theme }) => theme.green};
    font-size: 18px;
  }
`;
