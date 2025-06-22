import styled from "styled-components";

interface StyledDateTimePickerProps {
  $isSearchCalendar?: boolean;
}
export const StyledDateTimePicker = styled.div<StyledDateTimePickerProps>`
  z-index: 5;
  -webkit-tap-highlight-color: transparent;
  color: ${({ theme }) => theme.activeTabButtonTextColor};
  background-color: ${({ theme }) => theme.backgroundcolor};
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.lineColor};
  border-radius: 5px;
  align-self: flex-start;
  padding: 0.5em;
  gap: 0.5em;
  cursor: default;
  user-select: none;
  position: fixed;
  box-sizing: border-box;
  top: ${({ $isSearchCalendar }) => ($isSearchCalendar ? "280px" : "50%")};
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top:10%;

  .top-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .month-year {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;

      .text {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;
        width: 2em;
        justify-content: center;
      }

      .button {
        font-size: 1.5em;
        color: ${({ theme }) => theme.inactiveTabButtonTextColor};
        cursor: pointer;
      }
    }
  }

  .bottom-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .time {
      cursor: pointer;
    }

    .timezone {
      color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    }

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({ theme }) => theme.inactiveTabButtonTextColor};
      padding: 0px 0.8em;
      height: 2em;
      border: 1px solid ${({ theme }) => theme.lineColor};
      border-radius: 5px;
      cursor: pointer;

      &.active {
        color: ${({ theme }) => theme.activeTabButtonTextColor};
        background-color: ${({ theme }) => theme.highlightColor};
      }
    }
  }

  .time-picker {
    background-color: ${({ theme }) => theme.backgroundcolor};
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5em;
    height: 10em;
    width: 100%;
    box-sizing: inherit;
    left: 0;
    right: 0;
    padding: 0.5em;
    bottom: 3em;
  }
`;
