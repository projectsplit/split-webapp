import styled from 'styled-components';
import { StyledMiddleScreenMenu } from '../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledSupportMenu = styled(StyledMiddleScreenMenu)`
  /* The form is taller than the other middle-screen menus, so it scrolls inside itself rather than
     pushing the card off a short viewport. */
  max-height: 84vh;
  overflow-y: auto;

  .loading {
    display: flex;
    justify-content: center;
    padding: 24px 0;
  }

  .manage {
    align-self: center;
    background: none;
    padding: 8px 14px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.greyOutline};
    color: ${({ theme }) => theme.whiteText};
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.highlightColor};
    }
  }

  .close {
    align-self: center;
    background: none;
    border: none;
    padding: 4px;
    font-family: inherit;
    font-size: 13px;
    color: ${({ theme }) => theme.secondaryTextColor};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.primaryTextColor};
    }
  }
`;
