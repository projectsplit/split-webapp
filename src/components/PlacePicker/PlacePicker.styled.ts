import { styled } from 'styled-components';

export const StyledPlacePicker = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  box-sizing: border-box;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surface.page};
  color: ${({ theme }) => theme.ink.primary};

  .pickerHeader {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) =>
      `${theme.space.s16} ${theme.space.s20} ${theme.space.s12}`};

    .searchBar {
      box-sizing: border-box;
      flex: 1;
      min-width: 0;
      height: 47px;
      padding: ${({ theme }) => `0 ${theme.space.s14}`};
      background-color: ${({ theme }) => theme.surface.card};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      outline: none;
      font-family: ${({ theme }) => theme.font.sans};
      font-size: ${({ theme }) => theme.size.s15};
      color: ${({ theme }) => theme.ink.primary};
      transition: border-color 0.15s;

      &::placeholder {
        color: ${({ theme }) => theme.ink.tertiary};
      }

      &:focus {
        border-color: ${({ theme }) => theme.accent.you.ink};
      }
    }

    .closeButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      margin-right: -6px;
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.icon.lg};
      cursor: pointer;
    }
  }

  .mapArea {
    flex: 1;
    min-height: 0;
    position: relative;
    margin: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s16}`};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;

    .map {
      width: 100%;
      height: 100%;
    }
  }

  .footer {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s20} 22px`};
    background-color: ${({ theme }) => theme.surface.footer};
    border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};

    .selection {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s10};
      min-width: 0;
      min-height: 34px;

      .selectionIcon {
        display: flex;
        flex-shrink: 0;
        font-size: ${({ theme }) => theme.icon.sm};
        color: ${({ theme }) => theme.ink.secondary};
      }

      .selectionName {
        flex: 1;
        min-width: 0;
        font-size: ${({ theme }) => theme.size.s14};
        font-weight: ${({ theme }) => theme.weight.medium};
        line-height: 1.4;
        color: ${({ theme }) => theme.ink.primary};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mapsLink {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: ${({ theme }) => `7px ${theme.space.s14}`};
        border: 1px solid ${({ theme }) => theme.surface.outline};
        border-radius: ${({ theme }) => theme.radius.pill};
        background-color: transparent;
        font-size: ${({ theme }) => theme.size.s13};
        font-weight: ${({ theme }) => theme.weight.medium};
        line-height: 1.4;
        color: ${({ theme }) => theme.ink.primary};
        white-space: nowrap;
        text-decoration: none;
        cursor: pointer;
      }
    }

    button {
      width: 100%;
      padding: ${({ theme }) => `${theme.space.s14} 0`};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      font-size: ${({ theme }) => theme.size.s15};
    }
  }
`;
