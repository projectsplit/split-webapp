import styled from 'styled-components';
import { StyledMiddleScreenMenu } from '../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledEditEmail = styled(StyledMiddleScreenMenu)`
  .title {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.lightColor};
  }

  .current {
    font-size: 14px;
    color: ${({ theme }) => theme.lightColor};
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .badge {
    display: inline-block;
    align-self: flex-start;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge.verified {
    background-color: ${({ theme }) => theme.green};
    color: black;
  }

  .badge.unverified {
    background-color: ${({ theme }) => theme.redish};
    color: white;
    cursor: pointer;
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

  .input {
    border-radius: 10px;
    padding: 0.8rem;
    outline: none;
    color: white;
    background-color: ${({ theme }) => theme.layer2};
    border-style: none;
    font-size: 18px;
  }

  .resend {
    background: none;
    border: none;
    padding: 0;
    color: ${({ theme }) => theme.lightColor};
    text-decoration: underline;
    cursor: pointer;
    align-self: flex-start;
    font-size: 14px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
`;
