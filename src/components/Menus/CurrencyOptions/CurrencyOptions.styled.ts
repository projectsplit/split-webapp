import styled from 'styled-components';
import { StyledBottomMenu } from '../Layouts/BottomMenu/BottomMenu.styled';

export const StyledCurrencyOptions = styled(StyledBottomMenu)`
  overflow: hidden;
  gap: 0;
  padding: 0;

  .headerAndSearchbar {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s14};
    padding: ${({ theme }) =>
      `${theme.space.s10} ${theme.space.s20} ${theme.space.s14}`};
    background-color: ${({ theme }) => theme.surface.card};

    .header {
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
    }

    .searchBar {
      box-sizing: border-box;
      padding: ${({ theme }) => `11px ${theme.space.s14}`};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      outline: none;
      background-color: ${({ theme }) => theme.surface.page};
      font-family: ${({ theme }) => theme.font.sans};
      font-size: ${({ theme }) => theme.size.s15};
      color: ${({ theme }) => theme.ink.primary};
      transition: border-color 0.15s;

      &::placeholder {
        color: ${({ theme }) => theme.ink.tertiary};
        opacity: 1;
      }

      &:focus {
        border-color: ${({ theme }) => theme.accent.you.ink};
      }
    }
  }

  .currencyList {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s6};
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s20}`};

    > * {
      flex-shrink: 0;
    }
  }

  .currencyOption {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    cursor: pointer;
  }

  .currencyOption.clicked {
    background-color: ${({ theme }) => theme.surface.hairline};
  }

  .currencyOption > .currencyFlag {
    font-size: 28px;
  }

  .currency {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s2};
  }

  .currencyTicker {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
  }

  .currencyDescr {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.secondary};

    .currencyName {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .currencyCheck {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s15};
    color: ${({ theme }) => theme.direction.owed};
  }

  .noResults {
    padding: ${({ theme }) => `${theme.space.s16} ${theme.space.s20}`};
    text-align: center;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
