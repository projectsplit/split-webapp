import styled from 'styled-components';
import { formFooterStyles } from '@/styles/formFooter';

export const StyledExpenseFormFooter = styled.div`
  ${formFooterStyles}

  .main.set,
  .main:has(.recurringIcon.active) {
    background-color: ${({ theme }) => theme.surface.raised};
    border-color: ${({ theme }) => theme.surface.outline};
    color: ${({ theme }) => theme.ink.primary};
  }
`;
