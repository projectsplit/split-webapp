import styled from 'styled-components';
import { StyledDialog } from '../Layouts/Dialog/Dialog.styled';

export const StyledEditEmail = styled(StyledDialog)`
  .title {
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .current {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    overflow-wrap: anywhere;
  }

  .badge {
    display: inline-block;
    align-self: flex-start;
    padding: ${({ theme }) => `3px ${theme.space.s10}`};
    border-radius: ${({ theme }) => theme.radius.pill};
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.04em;
  }

  .badge.verified {
    background-color: ${({ theme }) =>
      `color-mix(in oklab, ${theme.direction.owed} 18%, transparent)`};
    color: ${({ theme }) => theme.direction.owed};
  }

  .badge.unverified {
    background-color: ${({ theme }) =>
      `color-mix(in oklab, ${theme.direction.owe} 14%, transparent)`};
    color: ${({ theme }) =>
      `color-mix(in oklab, ${theme.direction.owe} 82%, white)`};
    cursor: pointer;
  }

  .description {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    white-space: initial;
    overflow-wrap: anywhere;
  }

  .errormsg {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.direction.owe};
    white-space: initial;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    height: 47px;
    padding: ${({ theme }) => `0 ${theme.space.s14}`};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    outline: none;
    background-color: ${({ theme }) => theme.surface.page};
    color: ${({ theme }) => theme.ink.primary};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.size.s16};
    transition: border-color 0.15s;

    &::placeholder {
      color: ${({ theme }) => theme.ink.tertiary};
      opacity: 1;
    }

    &:focus {
      border-color: ${({ theme }) => theme.accent.you.ink};
    }
  }

  .resend {
    align-self: flex-start;
    background: none;
    border: none;
    padding: 0;
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    text-decoration: underline;
    cursor: pointer;
  }
`;
