import styled from 'styled-components';
import { StyledOnTrackMessageProps } from '../../../interfaces';
import { StyledBudgetMessageCard } from '../BudgetMessageCard.styled';

export const StyledOnTrackMessage = styled(
  StyledBudgetMessageCard
)<StyledOnTrackMessageProps>`
  .main .signParagraphWrap {
    .information {
      color: ${({ theme }) => theme.direction.owed};
    }

    .paragraphs {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s8};
      min-width: 0;

      .firstParagraph {
        font-size: ${({ theme }) => theme.size.s13};
        line-height: 1.6;
        text-wrap: pretty;
        color: ${({ theme }) => theme.ink.primary};
      }

      .secondParagraph {
        font-size: ${({ theme }) => theme.size.s13};
        line-height: 1.6;
        text-wrap: pretty;
        color: ${({ theme }) => theme.ink.secondary};
      }

      .amount {
        font-family: ${({ theme }) => theme.font.mono};
        font-weight: ${({ theme }) => theme.weight.medium};
        color: ${({ theme }) => theme.direction.owed};
      }
    }
  }
`;
