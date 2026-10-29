import styled from 'styled-components';
import { dialogFieldStyles } from '@/styles/dialogField';
import { StyledDialog } from '../Layouts/Dialog/Dialog.styled';

export const StyledChangePassword = styled(StyledDialog)`
  /* Three fields and the keyboard outgrow a short viewport, so it scrolls inside itself rather
     than pushing its buttons off the screen. */
  max-height: 84dvh;
  overflow-y: auto;

  ${dialogFieldStyles}

  .fields {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
  }

  .fieldNote {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
