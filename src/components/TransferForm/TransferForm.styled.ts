import styled from 'styled-components';
import {
  formScrollStyles,
  fullScreenSurfaceStyles,
} from '@/styles/fullScreenSurface';
import { formFooterStyles } from '@/styles/formFooter';
interface StyledTransferFormProps {
  $inputError?: boolean;
  $noReceiverSelected?: boolean;
  $isSamePersonError: boolean;
}

export const StyledTransferForm = styled.div<StyledTransferFormProps>`
  ${fullScreenSurfaceStyles}
  ${formScrollStyles}

  .bottomButtons {
    ${formFooterStyles}
  }
`;
