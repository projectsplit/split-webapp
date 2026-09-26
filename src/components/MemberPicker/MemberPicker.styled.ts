import { keyframes, styled } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const StyledMemberPicker = styled.div<{
  $hasError?: boolean;
  $isOpen?: boolean;
  $selectedCount: number;
  $category: string;
}>`
  color: ${({ theme, $selectedCount }) =>
    $selectedCount > 0 ? '' : theme.ink.secondary};
  display: flex;
  flex-direction: column;
  position: relative;
  .main {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    min-height: 48px;
    padding: ${({ theme }) => `0 ${theme.space.s14}`};
    position: relative;
    cursor: pointer;

    .rowLabel {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.size.s14};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .rowChevron {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => `0 ${theme.space.s4}`};
    font-size: ${({ theme }) => theme.size.s12};
    background-color: ${({ theme }) => theme.surface.page};
    .description {
      color: ${({ theme }) => theme.ink.secondary};
    }

    .error {
      color: ${({ theme }) => theme.direction.owe};
      font-weight: ${({ theme }) => theme.weight.regular};
    }
  }

  .menu {
    position: fixed;
    color: ${({ theme }) => theme.ink.primary};
    background-color: ${({ theme }) => theme.surface.page};
    width: 100%;
    height: 100dvh;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `${theme.space.s20} ${theme.space.s20} ${theme.space.s20}`};
    gap: ${({ theme }) => theme.space.s16};
    top: 0;
    overflow: hidden;
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;

      .title {
        flex: 1;
        min-width: 0;
        text-align: center;
        font-size: ${({ theme }) => theme.size.s17};
        font-weight: ${({ theme }) => theme.weight.semibold};
        letter-spacing: -0.01em;
      }
      .gap {
        width: 34px;
        flex-shrink: 0;
      }
    }
    .categories {
      margin-top: 0;
    }
    .member-list {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;

      > * {
        flex-shrink: 0;
      }

      .textAndCheck {
        display: flex;
        justify-content: start;
        gap: 10px;
        align-items: center;

        .nameAndAmount {
          display: flex;
          flex-direction: column;
          min-width: 0;
          .name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .amount {
            font-size: ${({ theme }) => theme.size.s12};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .selected {
      color: ${({ theme }) => theme.ink.primary};
    }

    .available {
      color: ${({ theme }) => theme.ink.secondary};
    }

    .tick-cube {
      position: relative;
      height: 25px;
      width: 25px;
      min-width: 25px;
      background-color: ${({ theme }) => theme.surface.raised};
      border-radius: ${({ theme }) => theme.space.s4};
      cursor: pointer;
      .checkmark {
        font-size: ${({ theme }) => theme.icon.lg};
        color: ${({ theme }) => theme.ink.primary};
      }
    }

    .option {
      animation: ${fadeIn} 0.15s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;

      .right {
        display: flex;
        flex-direction: row;
        justify-items: end;
        align-items: center;
        gap: ${({ theme }) => theme.space.s6};
        .inputField {
          display: flex;
          flex-direction: row;
          ${({ $category }) => ($category === 'Shares' ? 'gap:5px' : '')};
          align-items: center;
          .shares {
            display: flex;
            flex-direction: row;
            .fraction {
              .nominatorDenominator {
                color: ${({ theme }) => theme.ink.tertiary};
              }
              display: flex;
              flex-direction: row;
              font-size: ${({ theme }) => theme.size.s12};
              gap: ${({ theme }) => theme.space.s4};
            }
          }
        }

        .currency {
          color: ${({ theme }) => theme.ink.secondary};
        }

        .amount-input {
          background-color: transparent;
          color: ${({ theme }) => theme.ink.primary};
          border: none;
          border-radius: 0;
          text-align: right;
          outline: solid;
          outline-width: 1px;
          outline-color: transparent;
          font-size: ${({ theme }) => theme.size.s16};
        }

      }
    }
    .spacer {
      flex-grow: 1;
    }
    .text {
      color: ${({ theme }) => theme.ink.secondary};
    }
    .remainders {
      display: flex;
      flex-direction: column;
      font-size: ${({ theme }) => theme.size.s15};

      .checkmark {
        font-size: ${({ theme }) => theme.icon.lg};
        bottom: 0px;
        color: ${({ theme }) => theme.direction.owed};
      }
      .firstRow {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: ${({ theme }) => theme.space.s10};
      }
      .secondRow {
        .redText {
          color: ${({ theme }) => theme.direction.owe};
        }
        .greenText {
          color: ${({ theme }) => theme.direction.owed};
        }
      }
    }
  }
  .member-list {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s16};
  }

  .includedCard {
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;
  }

  .includedCard .option {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 11px;
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s16}`};
    animation: none;
  }

  .includedCard .option + .option::before {
    content: '';
    position: absolute;
    left: 57px;
    right: 0;
    top: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.surface.raisedHigh};
  }

  .notIncludedLabel {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: left;
    color: ${({ theme }) => theme.ink.tertiary};
    margin-bottom: ${({ theme }) => `-${theme.space.s8}`};
  }

  .memberAvatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    cursor: pointer;
  }

  .memberAvatar.you {
    background-color: ${({ theme }) => theme.accent.you.tint};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.accent.you.tintBorder};
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .includedCard .textAndCheck {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    flex: 1;
    min-width: 0;
  }

  .includedCard .nameAndAmount {
    min-width: 0;
    text-align: left;
  }

  .includedCard .name {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .includedCard .nameAndAmount .amount {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .includedCard .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    flex-shrink: 1;
    min-width: 0;
    max-width: 60%;
  }

  .includedCard .inputField > div {
    min-width: 0;
    max-width: 100%;
  }

  .includedCard .amount-input {
    max-width: 100%;
  }

  .includedCard .inputField {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1px;
    min-width: 80px;
    max-width: 100%;
    height: 35px;
    padding: 7px 10px;
    border-radius: ${({ theme }) => theme.radius.control};
    background-color: ${({ theme }) => theme.surface.raised};
    border: 1px solid transparent;
    color: ${({ theme }) => theme.ink.primary};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  .remainders {
    width: 100%;
  }

  .remainders .firstRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: ${({ theme }) => theme.space.s12};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s12};
    font-weight: ${({ theme }) => theme.weight.regular};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .remainders .firstRow .amounts {
    font-family: ${({ theme }) => theme.font.sans};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .remainders .firstRow .money {
    font-family: ${({ theme }) => theme.font.mono};
    color: ${({ theme }) => theme.ink.primary};
  }

  .remainders .firstRow .secondRow {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .remainders .firstRow .secondRow .greenText,
  .remainders .firstRow .secondRow .redText {
    font-family: ${({ theme }) => theme.font.mono};
  }

  .remainders .firstRow .secondRow .greenText {
    color: ${({ theme }) => theme.direction.owed};
  }

  .remainders .firstRow .secondRow .redText {
    color: ${({ theme }) => theme.direction.owe};
  }

  .remainders .balanced {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.s4};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.direction.owed};
  }

  .remainders .balanced .checkmark {
    display: flex;
    font-size: ${({ theme }) => theme.size.s13};
  }

  .includedCard .lockToggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    margin-right: -6px;
    flex-shrink: 0;
    cursor: pointer;
  }

  .includedCard .locked-icon,
  .includedCard .unlocked-icon {
    display: block;
    width: 14px;
    height: 14px;
    font-size: ${({ theme }) => theme.size.s14};
  }

  .includedCard .unlocked-icon {
    color: ${({ theme }) => theme.surface.mark};
  }

  .includedCard .locked-icon {
    color: ${({ theme }) => theme.state.locked};
  }

  .pickerFooter {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    margin: ${({ theme }) => `0 -${theme.space.s20}`};
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s20} 22px`};
    background-color: ${({ theme }) => theme.surface.footer};
    border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};
  }

  .pickerFooter button {
    width: 100%;
    padding: ${({ theme }) => `${theme.space.s14} 0`};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .includedCard .fieldCurrency {
    flex-shrink: 0;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .includedCard .tick-cube {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    min-width: 20px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.space.s6};
    background-color: ${({ theme }) => theme.ink.primary};
    cursor: pointer;

    .checkmark {
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.surface.page};
    }
  }

  .includedCard .available .tick-cube {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.surface.outline};

    .checkmark {
      display: none;
    }
  }

`;
