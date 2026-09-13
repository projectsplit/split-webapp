import { css } from 'styled-components';

export const formFooterStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s8};
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s20} 22px`};
  background-color: ${({ theme }) => theme.surface.footer};
  border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};

  .submitButton {
    flex: 1;
    min-width: 0;
  }

  .submitButton > * {
    width: 100%;
    padding: ${({ theme }) => `${theme.space.s14} 0`};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    font-size: ${({ theme }) => theme.size.s15};
  }

  .main {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.iconButton};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;
  }

  .locationIcon,
  .calendarIcon,
  .recurringIcon {
    display: block;
    flex-shrink: 0;
    margin: 0;
    font-size: ${({ theme }) => theme.icon.md};
    color: inherit;
  }
`;
