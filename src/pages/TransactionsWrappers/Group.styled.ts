import styled from 'styled-components';
import { StyledTransactionsShell } from './TransactionsShell.styled';

export const StyledGroup = styled(StyledTransactionsShell)`
  .group {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .offlineNote {
    padding: ${({ theme }) => `${theme.space.s24} ${theme.space.s20}`};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    text-align: center;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .retry {
    display: flex;
    justify-content: center;
    margin-top: ${({ theme }) => theme.space.s24};
  }
`;
