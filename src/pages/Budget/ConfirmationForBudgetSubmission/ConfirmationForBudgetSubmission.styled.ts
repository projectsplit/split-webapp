import styled from 'styled-components';
import { StyledBottomMenu } from '../../../components/Menus/Layouts/BottomMenu/BottomMenu.styled';

export const StyledConfirmationForBudgetSubmission = styled(StyledBottomMenu)`
  .header {
    text-align: left;
  }
  .prompt {
    text-align: left;
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
  }
`;
