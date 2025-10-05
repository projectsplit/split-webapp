import { keyframes, styled } from "styled-components";

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
    $selectedCount > 0 ? "" : theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  position: relative;
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    text-overflow: clip;
    overflow: hidden;
    position: relative;
    .icon {
      font-size: 1.4rem;
      &:hover {
        color: ${({ theme }) => theme.whiteText};
      }
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
    font-size: 12px;
    background-color: ${({ theme }) => theme.backgroundcolor};
    .description {
      color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    }

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }

  .menu {
    position: fixed;
    color: ${({ theme }) => theme.textActiveColor};
    background-color: ${({ theme }) => theme.backgroundcolor};
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    gap: 20px;
    bottom: 0;
    overflow-y: auto;
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;

      .closeButtonContainer {
        position: relative;
        cursor: pointer;
        display: inline-block;
      }

      .backButton {
        cursor: pointer;
        display: block;
        font-size: 1.875rem;
      }

      .closeButtonContainer:hover::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: rgba(128, 128, 128, 0.3);
        pointer-events: none;
      }

      .title {
        font-weight: 600;
      }
      .gap {
        margin-right: 0.9375rem;
      }
    }
    .categories {
      margin-top: 7px;
    }
    .separator {
      margin-left: 10px;
      margin-right: 10px;
      transform: translateZ(0);
      position: sticky;
      min-height: 1px;
    }

    .member-list {
      overflow: auto;
      .textAndCheck {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        .nameAndAmount {
          display: flex;
          flex-direction: column;
          .amount {
            font-size: 12px;
          }
        }
      }
    }

    .selected {
      background-color: ${({ theme }) => theme.backgroundcolor};
      color: ${({ theme }) => theme.textActiveColor};
    }

    .available {
      color: ${({ theme }) => theme.secondaryTextColor};
    }

    .tick-cube {
      position: relative;
      height: 25px;
      width: 25px;
      min-width: 25px;
      background-color: #585858;
      border-radius: 3px;
      cursor: pointer;
      .checkmark {
        position: absolute;
        font-size: 25px;
        bottom: 0px;
        color: ${({ theme }) => theme.highlightColor};
      }
    }

    .option {
      animation: ${fadeIn} 0.15s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;

      .right {
        display: flex;
        flex-direction: row;
        justify-items: end;
        align-items: center;
        gap: 10px;
        .inputField {
          display: flex;
          flex-direction: row;
          ${({ $category }) => ($category === "Shares" ? "gap:5px" : "")};
          align-items: center;
          .shares {
            display: flex;
            flex-direction: row;
            .fraction {
              .nominatorDenominator {
                color: grey;
              }
              display: flex;
              flex-direction: row;
              gap: 10px;
              font-size: 12px;
              gap: 4px;
            }
          }
        }

        .sharesInput {
          background-color: white;
          color: black;
        }
        .currency {
          color: ${({ theme }) => theme.secondaryTextColor};
        }

        .amount-input {
          background-color: ${({ theme }) => theme.backgroundcolor};
          color: ${({ theme }) => theme.textActiveColor};
          border-color: ${({ theme }) => theme.lineColor};
          border-style: none;
          border-width: 1px;
          border-radius: 5px;
          text-align: right;
          width: 100px;
          outline: solid;
          outline-width: 1px;
          outline-color: transparent;
          font-size: 16px;
        }

        .locked-icon {
          color: ${({ theme }) => theme.primaryTextColor};
        }

        .unlocked-icon {
          color: ${({ theme }) => theme.lineColor};
        }
      }
    }
    .spacer {
      flex-grow: 1; /* This pushes the button to the bottom */
    }
  }
`;
