import styled from 'styled-components';
import { StyledRecommendationProps } from '../../../interfaces';
import { StyledBudgetMessageCard } from '../BudgetMessageCard.styled';

export const StyledRecommendation = styled(
  StyledBudgetMessageCard
)<StyledRecommendationProps>`
  .main .signParagraphWrap {
    .sign {
      display: none;
    }

    .paragraphs {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s8};

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

        strong {
          font-weight: ${({ theme }) => theme.weight.semibold};
          color: ${({ theme }) => theme.ink.primary};
        }
      }

      .amount {
        font-family: ${({ theme }) => theme.font.mono};
        font-weight: ${({ theme }) => theme.weight.medium};
        color: ${({ theme }) => theme.ink.primary};
      }
    }
  }
`;
