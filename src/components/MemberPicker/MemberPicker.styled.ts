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
}>`
  color: ${({ theme, $selectedCount }) =>
    $selectedCount > 0 ? "" : theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.layer2};
  border-radius: 8px;
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid
      ${({ theme, $hasError, $isOpen }) =>
        $hasError
          ? theme.errorColor
          : $isOpen
          ? theme.highlightColor
          : theme.lineColor};
    border-radius: 8px;
    padding: 0.5em 1em;
    white-space: nowrap;
    cursor: pointer;
    text-overflow: clip;
    overflow: hidden;

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

  .dropdown {
    background-color: ${({ theme }) => theme.backgroundcolor};
    color: ${({ theme }) => theme.textActiveColor};
    border-color: ${({ theme }) => theme.lineColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 5;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;

    top: calc(100% + 1px);

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
      }
    }

    .selected {
      background-color: ${({ theme }) => theme.backgroundcolor};
      color: ${({ theme }) => theme.textActiveColor};
    }

    .available {
      color: ${({ theme }) => theme.secondaryTextColor};
    }

    .selectAll {
      display: flex;
      flex-direction: row;
      padding: 10px 14px;
      gap: 10px;
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
  }
`;
