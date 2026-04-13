import styled from 'styled-components';

export const RecentSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 900;
    color: #cfc2d6;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin: 0;
  }
`;

export const RecentCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
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

export const RecentGroupName = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #e2e2e2;
`;

export const RecentBalanceInfo = styled.div`
  font-size: 13px;
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
