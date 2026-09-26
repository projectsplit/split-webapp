import styled from 'styled-components';
import { StyledBudgetMessageCard } from '../BudgetMessageCard.styled';

export const StyledNoBudgetSubmittedMessage = styled(StyledBudgetMessageCard)`
  .main .signParagraphWrap {
    .paragraph {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: ${({ theme }) => theme.space.s8};
      min-width: 0;
      font-size: ${({ theme }) => theme.size.s13};
      line-height: 1.6;
      text-wrap: pretty;
      color: ${({ theme }) => theme.ink.secondary};
    }
  }
`;
