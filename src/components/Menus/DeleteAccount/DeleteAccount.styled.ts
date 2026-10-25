import styled from 'styled-components';
import { inlineEditFieldStyles } from '@/styles/inlineEditField';
import { StyledDialog } from '../Layouts/Dialog/Dialog.styled';

export const StyledDeleteAccount = styled(StyledDialog)`
  /* Taller than the other dialogs once the keyboard is up, so it scrolls inside itself rather than
     pushing its buttons off a short viewport. */
  max-height: 84dvh;
  overflow-y: auto;

  ${inlineEditFieldStyles}

  /* Not the dialog layout's own .info, although it looks the same. This dialog opens inside
     Settings, whose footer is also called .info and lays its children out in a row — which is
     what these paragraphs did, side by side, until they had a name of their own. */
  .explanation {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};

    p {
      margin: 0;
    }

    > * + * {
      margin-top: ${({ theme }) => theme.space.s6};
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

  .deleteError {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.45;
    color: ${({ theme }) => theme.direction.owe};
  }
`;
