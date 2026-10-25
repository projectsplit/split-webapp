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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s8};
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

  /* The shimmer's own base colour is the card's, which would hide it on this card. */
  .noteShimmer > div,
  .rowShimmer > div {
    background-color: ${({ theme }) => theme.surface.raised};
    background-image: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.surface.raised} 0%, ${theme.surface.outline} 50%, ${theme.surface.raised} 100%)`};
    background-size: 200% 100%;
  }

  /* Two bars on the note's two 21px lines, so nothing moves when the text arrives. */
  .noteShimmer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px 0;
  }

  /* Keeps the label's text for the row's height, hidden behind the bar. */
  .rowShimmer {
    position: relative;
    color: transparent;

    > div {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
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
