import styled from 'styled-components';
import { StyledMiddleScreenMenu } from '../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledForgotCredentials = styled(StyledMiddleScreenMenu)`
  .title {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.lightColor};
  }

  .description {
    font-size: 14px;
    color: ${({ theme }) => theme.lightColor};
    white-space: initial;
  }

  .errormsg {
    font-size: 12px;
    color: ${({ theme }) => theme.redish};
    white-space: initial;
  }

  .confirmation {
    font-size: 14px;
    color: ${({ theme }) => theme.lightColor};
    white-space: initial;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
`;

export const StyledForgotBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

export const StyledForgotLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;

  .link {
    color: ${({ theme }) => theme.lightColor};
    text-decoration: underline;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-size: 14px;
  }
`;
