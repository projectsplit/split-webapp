import styled from 'styled-components';
import { StyledDialog } from '../Menus/Layouts/Dialog/Dialog.styled';

export const StyledPendingTransactionDialog = styled(StyledDialog)`
  .summary {
    display: flex;
    align-items: baseline;
    gap: ${({ theme }) => theme.space.s12};

    .title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.medium};
    }

    .amount {
      flex-shrink: 0;
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s16};
      color: ${({ theme }) => theme.accent.you.inkRow};
    }
  }

  .info .reason {
    color: ${({ theme }) => theme.ink.primary};
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s6};
    padding: ${({ theme }) => theme.space.s12};
    border-radius: ${({ theme }) => theme.radius.surface};
    background-color: ${({ theme }) => theme.surface.raised};
    font-size: ${({ theme }) => theme.size.s13};
    overflow-wrap: anywhere;

    .row {
      display: flex;
      gap: ${({ theme }) => theme.space.s10};
    }

    .label {
      flex-shrink: 0;
      width: 64px;
      color: ${({ theme }) => theme.ink.tertiary};
    }
  }
`;
