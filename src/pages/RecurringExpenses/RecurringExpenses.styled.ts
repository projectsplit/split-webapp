import { styled } from 'styled-components';
import { paddedScrollPageStyles } from '@/styles/paddedScrollPage';

export const StyledRecurringExpenses = styled.div`
  ${paddedScrollPageStyles}

  .scrollContainer {
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) => `0 ${theme.space.s20}`};

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.surface.raisedHigh};
      border-radius: ${({ theme }) => theme.space.s4};
    }
  }

  .spinnerContainer,
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: ${({ theme }) => theme.ink.secondary};
    text-align: center;
    padding: ${({ theme }) => `0 ${theme.space.s24}`};
    gap: ${({ theme }) => theme.space.s10};
  }

  .empty {
    .emptyIcon {
      font-size: 56px;
      color: ${({ theme }) => theme.surface.mark};
    }

    .emptyTitle {
      color: ${({ theme }) => theme.ink.primary};
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.semibold};
    }

    .emptyHint {
      font-size: ${({ theme }) => theme.size.s13};
      line-height: 1.5;
      max-width: 260px;
    }
  }

  .submitButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: 12px 20px 20px;
    background: ${({ theme }) =>
      `linear-gradient(to top, ${theme.surface.page} 60%, transparent)`};
  }
`;

export const StyledRecurringExpenseRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s8};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  padding: ${({ theme }) => theme.space.s14};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  .topRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
  }

  .scope {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};

    svg {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.xs};
    }

    .scopeName {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .amount {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
  }

  .descr {
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .labels {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.s6};
  }

  .bottomRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .cycle {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    min-width: 0;

    svg {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.size.s12};
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .nextRun {
    flex-shrink: 0;
  }

  .paused {
    flex-shrink: 0;
    padding: ${({ theme }) => `${theme.space.s3} ${theme.space.s8}`};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s10};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .error {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.direction.owe};
    text-wrap: pretty;
  }
`;
