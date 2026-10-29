import styled from 'styled-components';
import { dialogFieldStyles } from '@/styles/dialogField';
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

  ${dialogFieldStyles}

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
