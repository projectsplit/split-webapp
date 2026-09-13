import styled from 'styled-components';
import { inlineEditFieldStyles } from '@/styles/inlineEditField';
import { StyledDialog } from '../Layouts/Dialog/Dialog.styled';

export const StyledEditUsername = styled(StyledDialog)`
  .username-status {
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.direction.owe};
  }

  ${inlineEditFieldStyles}

  .headerSeparator .header {
    .checkmark {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.direction.owed};
    }

    .warning {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.direction.owe};
    }
  }

  .headerSeparator .input::placeholder {
    color: ${({ theme }) => theme.ink.tertiary};
    opacity: 1;
  }

  .fieldNote {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
  }

`;
