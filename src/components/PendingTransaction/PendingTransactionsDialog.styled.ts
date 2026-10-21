import styled from 'styled-components';
import { StyledDialog } from '../Menus/Layouts/Dialog/Dialog.styled';

export const StyledPendingTransactionsDialog = styled(StyledDialog)`
  .list {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    max-height: 50dvh;
    overflow-y: auto;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    row-gap: ${({ theme }) => theme.space.s4};
    column-gap: ${({ theme }) => theme.space.s12};
    width: 100%;
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.primary};
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  .amount {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s14};
    color: ${({ theme }) => theme.accent.you.inkRow};
  }

  .meta {
    grid-column: 1 / -1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .meta.rejected {
    color: ${({ theme }) => theme.direction.owe};
  }
`;
