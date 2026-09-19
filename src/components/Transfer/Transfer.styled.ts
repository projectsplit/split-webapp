import styled from 'styled-components';
import { StyledTransactionCard } from '../TransactionCard.styled';

export const StyledTransfer = styled(StyledTransactionCard)`
  .head {
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
  }

  .emoji {
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s15};
    line-height: 1.4;
  }

  .title {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    line-height: 1.4;
  }

  .amount {
    grid-column: 2;
    grid-row: 1 / -1;
    justify-self: end;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s16};
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  .amount.sent {
    color: ${({ theme }) => theme.transfer.out};
  }

  .amount.received {
    color: ${({ theme }) => theme.transfer.in};
  }

  .amount.other {
    color: ${({ theme }) => theme.ink.secondary};
  }

  .meta {
    line-height: 16px;
  }

  .dot {
    color: ${({ theme }) => theme.surface.dot};
    flex-shrink: 0;
  }

  .descr {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
