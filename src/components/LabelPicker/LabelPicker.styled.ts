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
  // $isOpen?: boolean;
}>`
  color: ${({ theme }) => theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: text;

  .main {
    &:focus-within {
      border-color: ${({ theme, $hasError }) =>
        $hasError ? theme.errorColor : theme.highlightColor};
    }
      transition: border-color 0.15s;
    background-color: ${({ theme }) => theme.layer2};
    display: flex;
    gap: 4px;
    align-items: center;
    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.errorColor : theme.lineColor};
    border-radius: 8px;
    padding: 8px 16px;
    flex-wrap: wrap;
    position: relative;

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* position: absolute; */
    z-index: 3;
    width: 100%;
    /* box-sizing: border-box; */

    overflow-y: auto;
    top: calc(100% + 10px);

    @media (max-width: 768px) {
      max-height: 200px;
    }

    .suggested-label-container {
      animation: ${fadeIn} 0.15s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;

      .suggested-label-text {
        display: flex;
        gap: 8px;
        align-items: center;
        border-radius: 2px;
        padding: 2px 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
`;
