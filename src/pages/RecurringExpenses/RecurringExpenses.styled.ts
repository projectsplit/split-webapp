import { styled } from 'styled-components';

export const StyledRecurringExpenses = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  margin: 0;
  padding: 14px 0;
  gap: 15px;
  overflow: hidden;

  & > *:not(.scrollContainer) {
    padding-left: 14px;
    padding-right: 14px;
  }

  .scrollContainer {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 14px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }
  }

  .spinnerContainer,
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: ${({ theme }) => theme.secondaryTextColor};
    text-align: center;
    padding: 0 24px;
    gap: 10px;
  }

  .empty {
    .emptyIcon {
      font-size: 40px;
      color: ${({ theme }) => theme.lineColor};
    }

    .emptyTitle {
      color: ${({ theme }) => theme.whiteText};
      font-size: 16px;
    }

    .emptyHint {
      font-size: 14px;
      max-width: 260px;
    }
  }

  .submitButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: 10px 14px 14px 14px;
  }
`;

export const StyledRecurringExpenseRow = styled.div<{ $isPaused: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) => theme.layer2};
  border: 1px solid ${({ theme }) => theme.lineColor};
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  /* Paused rows stay legible but visibly inert, so a stopped series is never mistaken for a
     running one at a glance. */
  opacity: ${({ $isPaused }) => ($isPaused ? 0.55 : 1)};

  .topRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .scope {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.secondaryTextColor};
    font-size: 13px;
    min-width: 0;

    .scopeName {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .amount {
    font-weight: 600;
    white-space: nowrap;
  }

  .descr {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottomRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: ${({ theme }) => theme.secondaryTextColor};
  }

  .cycle {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }

  .paused {
    color: ${({ theme }) => theme.orange};
  }

  .error {
    color: ${({ theme }) => theme.errorColor};
    font-size: 13px;
  }

  .labels {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
  }
`;
