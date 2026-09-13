import styled from 'styled-components';
import { inlineEditFieldStyles } from '@/styles/inlineEditField';
import { StyledDialog } from '../Layouts/Dialog/Dialog.styled';

export const StyledRenameGroupMenu = styled(StyledDialog)`
  .errorMessage {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};

    .error {
      display: flex;
      justify-content: center;
      text-align: center;
      text-wrap: pretty;
    }

    .closeButton {
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-end;
      width: 34px;
      height: 34px;
      margin: ${({ theme }) => `-6px -${theme.space.s10} -6px 0`};
      font-size: ${({ theme }) => theme.icon.md};
      color: ${({ theme }) => theme.ink.tertiary};
      cursor: pointer;

      .close {
        display: block;
      }
    }

    .exclamation {
      display: flex;
      justify-content: center;
      font-size: ${({ theme }) => theme.icon.lg};
      color: ${({ theme }) => theme.direction.owe};
    }
  }
  ${inlineEditFieldStyles}

  .headerSeparator .header .closeButton {
    display: flex;
    flex-shrink: 0;
    color: ${({ theme }) => theme.ink.tertiary};
    font-size: ${({ theme }) => theme.icon.sm};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.ink.primary};
    }

    .close {
      display: block;
    }
  }

`;
