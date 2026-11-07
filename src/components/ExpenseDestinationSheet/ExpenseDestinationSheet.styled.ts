import styled from 'styled-components';
import { StyledBottomMenu } from '../Menus/Layouts/BottomMenu/BottomMenu.styled';

/** Drawn like the currency sheet, the other choice made from a payment's row. */
export const StyledExpenseDestinationSheet = styled(StyledBottomMenu)`
  max-height: 75dvh;
  overflow: hidden;
  gap: ${({ theme }) => theme.space.s10};

  .sheetTitle {
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
  }

  .options {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s6};

    > * {
      flex-shrink: 0;
    }
  }

  /* Only the sheet's own rows: the split screen opened from it has rows called "option" too. */
  .options > .option {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    width: 100%;
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    border: none;
    border-radius: ${({ theme }) => theme.radius.iconButton};
    background: none;
    color: ${({ theme }) => theme.ink.primary};
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .options > .option.chosen {
    background-color: ${({ theme }) => theme.surface.hairline};
  }

  .optionIcon {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.md};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .optionText {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s2};
  }

  .optionName {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  .optionNote {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .optionCheck {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s15};
    color: ${({ theme }) => theme.direction.owed};
  }

  .optionNext {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s15};
    color: ${({ theme }) => theme.surface.mark};
  }

  .stepHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    min-width: 0;

    .sheetTitle {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    margin: 0 0 0 -${({ theme }) => theme.space.s8};
    padding: 0;
    border: none;
    background: none;
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.icon.lg};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .paidBy {
    margin: 0;
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .tickIcon {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.lg};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .tickIcon.on {
    color: ${({ theme }) => theme.accent.you.fill};
  }

  .share {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s14};
    color: ${({ theme }) => theme.accent.you.inkRow};
  }

  .split {
    flex-shrink: 0;
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
  }

  .splitError {
    margin: 0;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.direction.owe};
  }

  .done {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .unavailable {
    margin: 0;
    padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s14}`};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
