import { keyframes, styled } from "styled-components";
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const StyledLabelPicker = styled.div<{
  $hasError?: boolean;
  $isOpen?: boolean;
}>`
  color: ${({ theme }) => theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.layer2};
  cursor: pointer;
  .main {
    display: flex;
    gap: 4px;
    align-items: center;
    border: 1px solid
      ${({ theme, $hasError, $isOpen }) =>
        $hasError
          ? theme.errorColor
          : $isOpen
          ? theme.highlightColor
          : theme.lineColor};
    border-radius: 8px;
    padding: 8px 16px;
    flex-wrap: wrap;
    position: relative; /* Ensure relative positioning for child elements */

    .selected-label {
      color: #000000a2;
      display: flex;
      gap: 8px;
      align-items: center;
      border-radius: 2px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
    }

    .input {
      flex: 1;
    }

    .icon {
      display: flex;
      font-size: 1.4rem;
      color: ${({ $isOpen ,theme}) => ($isOpen ? theme.textActiveColor : "")};
      margin-left: auto; /* Pushes the button to the right */
      cursor: pointer;
    }
  }

  .meta {
    background-color: ${({ theme }) => theme.backgroundcolor};
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
    font-size: 12px;

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
    position: absolute;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    max-height: 300px;
    top: calc(100% - 12px);

    .suggested-label {
      animation: ${fadeIn} 0.15s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;
    }
  }
`;