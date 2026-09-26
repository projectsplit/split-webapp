import styled from 'styled-components';

export interface StyledDateTimePickerProps {
  $isSearchCalendar?: boolean;
}
export const StyledDateTimePicker = styled.div<StyledDateTimePickerProps>`
  z-index: 5;
  -webkit-tap-highlight-color: transparent;
  color: ${({ theme }) => theme.ink.primary};
  background-color: ${({ theme }) => theme.surface.card};
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  box-shadow: ${({ theme }) => theme.shadow.dialog};
  padding: ${({ theme }) => theme.space.s14};
  gap: ${({ theme }) => theme.space.s12};
  cursor: default;
  user-select: none;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(340px, calc(100vw - 40px));

  ${({ $isSearchCalendar, theme }) =>
    $isSearchCalendar &&
    `
    position: static;
    top: auto;
    left: auto;
    transform: none;
    width: auto;
    margin: ${theme.space.s8} 0 0;
    align-self: stretch;
    padding: 12px 12px 14px;
    gap: ${theme.space.s10};
    border-color: ${theme.surface.outline};
    border-radius: ${theme.radius.iconButton};
  `}

  .top-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};

    .month-year {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: ${({ theme }) => theme.space.s4};

      .text {
        display: flex;
        flex-direction: row;
        justify-content: center;
        min-width: 46px;
        font-size: ${({ theme }) => theme.size.s14};
        font-weight: ${({ theme }) => theme.weight.semibold};
        cursor: pointer;
      }

      &:last-child .text {
        font-family: ${({ theme }) => theme.font.mono};
        font-weight: ${({ theme }) => theme.weight.medium};
      }

      .button {
        box-sizing: border-box;
        width: 32px;
        height: 32px;
        padding: 8px;
        border-radius: ${({ theme }) => theme.radius.control};
        color: ${({ theme }) => theme.ink.secondary};
        cursor: pointer;
      }
    }
  }

  .bottom-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};

    .time {
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.medium};
      cursor: pointer;
    }

    .timezone {
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .button {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36px;
      padding: ${({ theme }) => `0 ${theme.space.s14}`};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.control};
      background-color: ${({ theme }) => theme.surface.page};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.size.s13};
      font-weight: ${({ theme }) => theme.weight.medium};
      cursor: pointer;

      &.active {
        background-color: ${({ theme }) => theme.ink.primary};
        border-color: transparent;
        color: ${({ theme }) => theme.surface.page};
      }
    }
  }

  .time-picker {
    background-color: ${({ theme }) => theme.surface.card};
    border-radius: ${({ theme }) => theme.radius.control};
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s8};
    height: 10em;
    left: ${({ theme }) => theme.space.s14};
    right: ${({ theme }) => theme.space.s14};
    bottom: 58px;
    box-sizing: border-box;
    padding: ${({ theme }) => theme.space.s8};
  }
`;
