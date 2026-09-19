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

  .figures {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
  }

  .figuresRow {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .figureBlock {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .figureBlock.cap {
    align-items: flex-end;
    flex-shrink: 0;
  }

  .figureLabel {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .spentFigure {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.figure.page};
    font-weight: ${({ theme }) => theme.weight.medium};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .capFigure {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s16};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .progress {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .track {
    position: relative;
    display: flex;
    height: ${({ theme }) => theme.space.s8};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.accent.you.fill};
    transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .marker {
    position: absolute;
    top: -3px;
    width: 1px;
    height: 14px;
    background-color: ${({ theme }) => theme.ink.tertiary};
  }

  .captions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.size.s11};
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
  }

  .cycleValue {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
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
