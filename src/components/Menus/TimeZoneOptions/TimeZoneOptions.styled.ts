import styled from 'styled-components';
import { StyledBottomMenu } from '../Layouts/BottomMenu/BottomMenu.styled';

export const StyledTimeZoneOptions = styled(StyledBottomMenu)`
  overflow: auto;
  padding: 0;

  .headerAndSearchbar {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s14};
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s14}`};
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: ${({ theme }) => theme.surface.card};

    .header {
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
    }

    .searchBar {
      padding: 11px 15px;
      border-radius: ${({ theme }) => theme.radius.iconButton};
      outline: none;
      font-size: ${({ theme }) => theme.size.s15};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      color: ${({ theme }) => theme.ink.primary};
      background-color: ${({ theme }) => theme.surface.page};

      &::placeholder {
        color: ${({ theme }) => theme.ink.tertiary};
        opacity: 1;
      }
    }
  }

  .timeZoneOption {
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radius.iconButton};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    margin: ${({ theme }) => `0 ${theme.space.s20}`};
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s12};
    align-items: center;
  }

  .timeZoneOption.clicked {
    background-color: ${({ theme }) => theme.surface.hairline};
  }

  .timeZoneDescr {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
  }

  .noResults {
    padding: ${({ theme }) => `${theme.space.s16} ${theme.space.s20}`};
    text-align: center;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
