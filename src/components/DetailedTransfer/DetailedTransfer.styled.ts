import styled from 'styled-components';
import { StyledDetailSheet } from '../DetailSheet.styled';

export const StyledDetailedTransfer = styled(StyledDetailSheet)`
  .summary {
    padding: ${({ theme }) => `0 0 ${theme.space.s4}`};
  }


  .amount.sent {
    color: ${({ theme }) => theme.transfer.out};
  }

  .amount.received {
    color: ${({ theme }) => theme.transfer.in};
  }

  .partiesCard {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    background-color: ${({ theme }) => theme.surface.page};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
  }

  .partyLines {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
  }

  .partyLine {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: ${({ theme }) => theme.space.s8};
  }

  .partyRole {
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .partyName {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    text-align: right;
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

`;
