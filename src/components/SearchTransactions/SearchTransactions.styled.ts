import styled from 'styled-components';

export const StyledSearchTransactions = styled.div<{ $bgColor?: string }>`
  box-sizing: border-box;
  top: 0;
  position: fixed;
  background-color: ${({ theme }) => theme.surface.page};
  width: 100%;
  height: 100dvh;
  z-index: 3;
  padding: 0;
  display: flex;
  flex-direction: column;

  .catSelector {
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;
  }
  p {
    margin: 3px;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) =>
      `${theme.space.s20} ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;

    .headerSpacer {
      width: 34px;
      flex-shrink: 0;
    }

    .searchingIn {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s3};
      text-align: center;
    }

    .searchingInLabel {
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .groupName {
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .closeSign {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      color: ${({ theme }) => theme.ink.secondary};
      cursor: pointer;

      .close {
        display: block;
        font-size: ${({ theme }) => theme.icon.lg};
      }
    }
  }

  .searchBarAndCategories {
    flex: 1;
    min-height: 0;
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s20}`};
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .lexicalSearch {
      position: relative;
      flex: 0 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .mentionMenuSlot {
        display: flex;
        flex-direction: column;
        flex: 0 1 auto;
        min-height: 0;
      }

      .contentEditableWrap {
        flex-shrink: 0;
      }

      .contentEditable {
        position: relative;
        line-height: 30px;
        padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s12}`};
        border: 1px solid ${({ theme }) => theme.surface.outline};
        border-radius: ${({ theme }) => theme.radius.surface};
        background-color: ${({ theme }) => theme.surface.card};
        color: ${({ theme }) => theme.ink.primary};
        caret-color: ${({ theme }) => theme.accent.you.ink};
        font-family: ${({ theme }) => theme.font.mono};
        font-size: ${({ theme }) => theme.size.s14};
        outline: none;

        p {
          margin: 0;
        }
      }
      .contentEditablePlaceholder {
        position: absolute;
        top: 15px;
        left: ${({ theme }) => theme.space.s12};
        font-size: ${({ theme }) => theme.size.s14};
        color: ${({ theme }) => theme.ink.tertiary};
        pointer-events: none;
      }
      .calendarHint {
        padding: ${({ theme }) => `${theme.space.s10} 2px 0`};
        font-size: ${({ theme }) => theme.size.s12};
        line-height: 1.5;
        color: ${({ theme }) => theme.ink.tertiary};
        text-wrap: pretty;
      }

      .addFilterLabel {
        flex-shrink: 0;
        margin-top: 18px;
        margin-bottom: ${({ theme }) => theme.space.s10};
        font-size: ${({ theme }) => theme.size.s11};
        font-weight: ${({ theme }) => theme.weight.semibold};
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${({ theme }) => theme.ink.tertiary};
      }

      .categoryButtons {
        display: flex;
        flex-direction: column;
        flex: 0 1 auto;
        min-height: 0;
        background-color: ${({ theme }) => theme.surface.card};
        border: 1px solid ${({ theme }) => theme.surface.hairline};
        border-radius: ${({ theme }) => theme.radius.surface};
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: contain;
      }

      .categoryButtons > * {
        position: relative;
        margin: 0;
        padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s16}`};
      }

      .categoryButtons > * + *::before {
        content: '';
        position: absolute;
        top: 0;
        left: ${({ theme }) => theme.space.s16};
        right: 0;
        height: 1px;
        background-color: ${({ theme }) => theme.surface.raisedHigh};
      }

      .trigger {
        font-family: ${({ theme }) => theme.font.mono};
        color: ${({ theme }) => theme.ink.tertiary};
        background-color: transparent;
        padding: 0;
      }
      .value {
      }

      .container,
      .containerFocused {
        display: inline-flex;
        align-items: center;
        gap: ${({ theme }) => theme.space.s6};
        font-size: ${({ theme }) => theme.size.s12};
        padding: ${({ theme }) => `${theme.space.s4} ${theme.space.s10}`};
        border-radius: ${({ theme }) => theme.radius.pill};
        background-color: ${({ theme }) => theme.surface.raised};
        border: 1px solid ${({ theme }) => theme.surface.mark};
      }

      .containerFocused {
        border-color: ${({ theme }) => theme.accent.you.tintBorder};
      }

      .value {
        font-weight: ${({ theme }) => theme.weight.medium};
      }
    }
  }

  .submitButtons {
    z-index: 4;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s8};
    padding: ${({ theme }) =>
      `${theme.space.s12} ${theme.space.s20} ${theme.space.s20}`};
    padding-bottom: ${({ theme }) =>
      `max(env(safe-area-inset-bottom), ${theme.space.s20})`};
    background: ${({ theme }) =>
      `linear-gradient(to top, ${theme.surface.page} 60%, transparent)`};

    button {
      flex: 1;
      padding: ${({ theme }) => `${theme.space.s12} 0`};
    }
  }
`;
