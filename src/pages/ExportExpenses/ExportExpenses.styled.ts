import styled from 'styled-components';

export const StyledExportExpenses = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.ink.primary};
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  margin: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.surface.page};

  .stepScroll {
    margin-top: 15px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s24};
    padding: ${({ theme }) =>
      `${theme.space.s4} ${theme.space.s20} ${theme.space.s20}`};

    > * {
      flex-shrink: 0;
    }
  }

  .section {
    display: flex;
    flex-direction: column;
  }

  /* The same section furniture the budget form uses, so the reused scope selector sits in it
     without noticing it has moved. */
  .prompt {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .sectionHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    margin-bottom: ${({ theme }) => theme.space.s10};

    .information {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.xs};
      color: ${({ theme }) => theme.ink.tertiary};
      cursor: pointer;
    }
  }

  .sectionNote {
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s2} 0`};
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.tertiary};
    text-wrap: pretty;
  }

  .sectionNote.warning {
    color: ${({ theme }) => theme.direction.owe};
  }

  .presets {
    margin-bottom: ${({ theme }) => theme.space.s10};
  }

  .dateCard {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;
  }

  .dateRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
    width: 100%;
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;

    & + .dateRow {
      border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};
    }

    .dateLabel {
      font-size: ${({ theme }) => theme.size.s13};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .dateValue {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.s8};
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s14};
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
    }

    .dateChevron {
      display: flex;
      font-size: ${({ theme }) => theme.size.s16};
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .formatCards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.space.s10};
  }

  .formatCard {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.s6};
    padding: ${({ theme }) => theme.space.s14};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s ease-in-out;

    .formatIcon {
      display: flex;
      margin-bottom: ${({ theme }) => theme.space.s4};
      font-size: ${({ theme }) => theme.icon.lg};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .formatName {
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
    }

    .formatText {
      font-size: ${({ theme }) => theme.size.s12};
      line-height: 1.45;
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .formatCheck {
      position: absolute;
      top: ${({ theme }) => theme.space.s12};
      right: ${({ theme }) => theme.space.s12};
      display: flex;
      font-size: ${({ theme }) => theme.icon.md};
      color: ${({ theme }) => theme.ink.primary};
    }

    &.selected {
      border-color: ${({ theme }) => theme.ink.primary};

      .formatIcon {
        color: ${({ theme }) => theme.ink.primary};
      }
    }
  }

  .previewCard {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s6};
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    transition: opacity 0.2s ease-in-out;

    &.fetching {
      opacity: 0.55;
    }
  }

  .previewFigure {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.figure.card};
    font-weight: ${({ theme }) => theme.weight.medium};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .previewMeta {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.45;
    color: ${({ theme }) => theme.ink.secondary};
    text-wrap: pretty;
  }

  .previewEmpty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.s4};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.secondary};

    span {
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.tertiary};
    }
  }

  .previewRows {
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme }) => theme.space.s6};

    .previewRow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: ${({ theme }) => theme.space.s12};
      padding: ${({ theme }) => `${theme.space.s6} 0`};
      border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};
      font-size: ${({ theme }) => theme.size.s13};

      .rowLabel {
        color: ${({ theme }) => theme.ink.secondary};
      }

      .rowValue {
        font-family: ${({ theme }) => theme.font.mono};
        color: ${({ theme }) => theme.ink.primary};
      }
    }
  }

  .retry {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: ${({ theme }) => theme.ink.primary};
    text-decoration: underline;
    cursor: pointer;
  }

  .shimmerText {
    position: relative;
    display: inline-block;
  }

  .shimmerText > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .submitButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    padding: ${({ theme }) =>
      `${theme.space.s12} ${theme.space.s20} ${theme.space.s20}`};
    background: ${({ theme }) =>
      `linear-gradient(to top, ${theme.surface.page} 60%, transparent)`};

    /* Keeps the export button its own colour on hover instead of MyButton's darker grey. */
    button:hover {
      background-color: ${({ theme }) => theme.ink.primary};
    }
  }

  .errorMsg {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    text-align: center;
    color: ${({ theme }) => theme.direction.owe};
  }
`;
