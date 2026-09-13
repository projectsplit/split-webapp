import styled from 'styled-components';
import { StyledFullScreenMenu } from '../../Layouts/FullScreenMenu/FullScreenMenu.styled';

export const StyledNonGroupTransferUsersMenu = styled(StyledFullScreenMenu)`
  .scrollable-content {
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s24}`};

    .inputField {
      display: flex;
      flex-direction: row;

      .search-input {
        width: 100%;
        flex: 1;
        font-size: ${({ theme }) => theme.size.s15};
      }

      .main {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: ${({ theme }) => theme.space.s6};
        min-height: 47px;
        padding: ${({ theme }) => `9px ${theme.space.s14}`};
        background-color: ${({ theme }) => theme.surface.card};
        border: 1px solid ${({ theme }) => theme.surface.hairline};
        border-radius: ${({ theme }) => theme.radius.iconButton};
        transition: border-color 0.15s;
        position: relative;

        .search-annotation {
          position: absolute;
          flex: 1;
          font-size: ${({ theme }) => theme.size.s15};
          color: ${({ theme }) => theme.ink.tertiary};
          cursor: text;
        }

        .selected-label {
          display: flex;
          align-items: center;
          gap: ${({ theme }) => theme.space.s6};
          padding: ${({ theme }) => `5px ${theme.space.s10}`};
          border-radius: ${({ theme }) => theme.radius.pill};
          font-size: ${({ theme }) => theme.size.s12};
          font-weight: ${({ theme }) => theme.weight.medium};
          cursor: pointer;

          .info {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: ${({ theme }) => theme.space.s6};
          }
        }
      }
    }

    .searchStatus {
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .dropdown {
      display: flex;
      flex-direction: column;
      background-color: ${({ theme }) => theme.surface.card};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.surface};
      overflow: hidden;

      > * {
        position: relative;
        flex-shrink: 0;
      }

      > * + *::before {
        content: '';
        position: absolute;
        left: 58px;
        right: 0;
        top: 0;
        height: 1px;
        background-color: ${({ theme }) => theme.surface.raisedHigh};
      }

      .spinner {
        display: flex;
        justify-content: center;
      }
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
