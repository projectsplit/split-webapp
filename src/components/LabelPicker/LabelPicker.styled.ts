import { keyframes, styled } from 'styled-components';

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
  $deleteClicked: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s12};
  color: ${({ theme }) => theme.ink.primary};

  .inputField {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};

    .main {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      min-height: 47px;
      gap: ${({ theme }) => theme.space.s6};
      padding: ${({ theme }) => `9px ${theme.space.s14}`};
      background-color: ${({ theme }) => theme.surface.card};
      border: 1px solid
        ${({ theme, $hasError }) =>
          $hasError ? theme.direction.owe : theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      transition: border-color 0.15s;
      cursor: text;
      position: relative;

      &:focus-within {
        border-color: ${({ theme, $hasError, $deleteClicked }) =>
          $hasError
            ? theme.direction.owe
            : $deleteClicked
              ? theme.surface.hairline
              : theme.accent.you.ink};
      }

      .input {
        flex: 1;
        min-width: 60px;
        font-size: ${({ theme }) => theme.size.s15};
      }

      .search-annotation {
        position: absolute;
        left: 35px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        white-space: nowrap;
        font-size: ${({ theme }) => theme.size.s15};
        color: ${({ theme }) => theme.ink.tertiary};
      }
    }

    .hint {
      font-size: ${({ theme }) => theme.size.s12};
      line-height: 1.5;
      color: ${({ theme }) => theme.ink.tertiary};
    }
  }

  .tagIcon {
    display: block;
    flex-shrink: 0;
    align-self: center;
    margin-right: ${({ theme }) => theme.space.s2};
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .selected-label {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    padding: ${({ theme }) => `5px ${theme.space.s10}`};
    border-radius: ${({ theme }) => theme.radius.chip};
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    cursor: pointer;

    svg {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.xs};
      opacity: 0.6;
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => theme.space.s16};
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
      left: ${({ theme }) => theme.space.s14};
      right: 0;
      top: 0;
      height: 1px;
      background-color: ${({ theme }) => theme.surface.raisedHigh};
    }

    .suggested-label-container {
      animation: ${fadeIn} 0.15s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: ${({ theme }) => theme.space.s12};
      min-height: 52px;
      padding: ${({ theme }) => `8px ${theme.space.s14}`};
      box-sizing: border-box;
      cursor: pointer;

      .suggested-label-text {
        display: flex;
        align-items: center;
        min-width: 0;
        padding: ${({ theme }) => `5px ${theme.space.s10}`};
        border-radius: ${({ theme }) => theme.radius.chip};
        font-size: ${({ theme }) => theme.size.s13};
        font-weight: ${({ theme }) => theme.weight.medium};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .spinnerAndTrash {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 34px;
        height: 34px;
        margin-right: -6px;

        .trash {
          font-size: ${({ theme }) => theme.icon.sm};
          color: ${({ theme }) => theme.surface.mark};
          cursor: pointer;
        }
      }
    }
  }
`;
