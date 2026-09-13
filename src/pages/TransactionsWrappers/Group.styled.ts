import styled from 'styled-components';
import { StyledTransactionsShell } from './TransactionsShell.styled';

export const StyledGroup = styled(StyledTransactionsShell)`
  .group {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .retry {
    display: flex;
    justify-content: center;
    margin-top: ${({ theme }) => theme.space.s24};
  }
`;
