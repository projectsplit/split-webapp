import styled from 'styled-components';
import { StyledDetailSheet } from '../DetailSheet.styled';

export const StyledDetailedExpense = styled(StyledDetailSheet)`
  .summary {
    padding: ${({ theme }) => `0 0 ${theme.space.s2}`};
  }

  .summary .labels {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s6};
  }


  .recurringBadge {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.ink.tertiary};

    .recurringIcon {
      display: flex;
      font-size: ${({ theme }) => theme.icon.xs};
    }
  }

  .footer.navigateFooter {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.space.s10};

    .info {
      text-align: center;
      font-size: ${({ theme }) => theme.size.s12};
      line-height: 1.5;
      color: ${({ theme }) => theme.ink.secondary};
    }
  }
`;
