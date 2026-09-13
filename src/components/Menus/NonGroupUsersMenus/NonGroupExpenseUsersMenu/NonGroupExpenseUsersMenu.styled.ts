import styled from 'styled-components';
import { StyledFullScreenMenu } from '../../Layouts/FullScreenMenu/FullScreenMenu.styled';

export const StyledNonGroupExpenseUsersMenu = styled(StyledFullScreenMenu)`
  .fixedHeader {

    > .categories {
      padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s4}`};
    }
  }

  .scrollable-content {
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) =>
      `${theme.space.s16} ${theme.space.s20} ${theme.space.s24}`};

    .inputField {
      .main {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        min-height: 47px;
        gap: ${({ theme }) => theme.space.s6};
        padding: ${({ theme }) => `9px ${theme.space.s14}`};
        background-color: ${({ theme }) => theme.surface.card};
        border: 1px solid ${({ theme }) => theme.surface.hairline};
        border-radius: ${({ theme }) => theme.radius.iconButton};
        cursor: text;
        position: relative;

        .input {
          flex: 1;
          min-width: 60px;
          font-size: ${({ theme }) => theme.size.s15};
        }

        .search-annotation {
          position: absolute;
          left: ${({ theme }) => theme.space.s14};
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          white-space: nowrap;
          font-size: ${({ theme }) => theme.size.s15};
          color: ${({ theme }) => theme.ink.tertiary};
        }
      }
    }

    .dropdown {
      display: flex;
      flex-direction: column;
      background-color: ${({ theme }) => theme.surface.card};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.surface};
      overflow: hidden;

      > * + *::before {
        content: '';
        position: absolute;
        left: 58px;
        right: 0;
        top: 0;
        height: 1px;
        background-color: ${({ theme }) => theme.surface.raisedHigh};
      }

      > * {
        position: relative;
        flex-shrink: 0;
      }
    }
  }

  .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s16};
    flex: 1;
    padding: ${({ theme }) => `${theme.space.s24} 0`};

    .msg {
      font-size: ${({ theme }) => theme.size.s13};
      color: ${({ theme }) => theme.ink.tertiary};
      text-align: center;
      text-wrap: pretty;
    }

    .icon {
      display: flex;
      font-size: 56px;
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .doneButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s20} 22px`};
    background-color: ${({ theme }) => theme.surface.footer};
    border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};

    button {
      width: 100%;
      padding: ${({ theme }) => `${theme.space.s14} 0`};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      font-size: ${({ theme }) => theme.size.s15};
    }
  }
`;
