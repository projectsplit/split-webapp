import styled from 'styled-components';

export const RecentSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  /* Hide the duplicate "Most recent" label from the inner MostRecentSection */
  .mostRecentMsg {
    display: none;
  }

  /* Restyle the inner MostRecentSection to match the new theme */
  > div {
    margin-bottom: 0;
  }

  /* Override TreeAdjustedContainer / OptionsContainer card styles */
  ${({ theme }) => theme.layer2} {
    background-color: rgba(31, 31, 31, 0.4);
  }

  .groupName {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.875rem;
    color: #e2e2e2;
    letter-spacing: 0.02em;
  }

  .groupsInfo {
    font-size: 0.8125rem;
    color: #cfc2d6;

    .owe {
      color: #fc6f6f;
    }
    .owed {
      color: #4ae176;
    }
    .settled {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .checkmark {
      color: #4ae176;
      font-size: 18px;
    }
  }
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
