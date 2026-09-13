import styled from 'styled-components';

export const StyledBudgetOverview = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surface.page};

  .budgetTopBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) =>
      `${theme.space.s20} ${theme.space.s20} ${theme.space.s14}`};
    flex-shrink: 0;
  }

  .iconButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.icon.md};
    cursor: pointer;
  }

  .title {
    flex: 1;
    min-width: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
  }

  .budgetScroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s20};
    padding: ${({ theme }) => `0 ${theme.space.s20} 28px`};
  }

  .cycleRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .budgetName {
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .budgetFrequency {
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.space.s24};
  }

  .emptyState {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    padding: ${({ theme }) => `${theme.space.s20} ${theme.space.s16}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
  }

  .emptyTitle {
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .emptyNote {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    text-wrap: pretty;
  }

  .monoValue {
    font-family: ${({ theme }) => theme.font.mono};
    word-spacing: -0.4em;
  }

  .cycleValue {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    word-spacing: -0.4em;

    .dateSep {
      font-family: ${({ theme }) => theme.font.sans};
      word-spacing: normal;
    }
  }

  .manageRow {
    justify-content: space-between;

    .manageLabel {
      font-size: ${({ theme }) => theme.size.s14};
      font-weight: ${({ theme }) => theme.weight.medium};
    }

    .manageMeta {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 9px;
    }

    .manageCount {
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .manageChevron {
      display: flex;
      font-size: ${({ theme }) => theme.size.s16};
      color: ${({ theme }) => theme.surface.mark};
    }
  }
`;
