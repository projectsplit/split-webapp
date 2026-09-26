import styled from 'styled-components';
import { StyledTransactionCard } from '../TransactionCard.styled';

export const StyledExpense = styled(StyledTransactionCard)`
  .descr {
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    line-height: 1.4;
  }

  .userShare {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s16};
    letter-spacing: -0.01em;
    line-height: 1.4;
    color: ${({ theme }) => theme.accent.you.inkRow};
  }

  .noShare {
    display: block;
    font-size: ${({ theme }) => theme.size.s14};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .noShareDescr {
    color: ${({ theme }) => theme.ink.secondary};
  }

  .groupTotal {
    grid-column: 2;
    grid-row: 2;
    justify-self: end;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.accent.group.ink};
  }

  .locationIcon {
    display: block;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .labels {
    flex: 1 1 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: ${({ theme }) => theme.space.s4};
  }

  .labels > * {
    flex-shrink: 0;
  }

  .labels .title {
    max-width: 112px;
  }

  .moreLabels {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s12};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
