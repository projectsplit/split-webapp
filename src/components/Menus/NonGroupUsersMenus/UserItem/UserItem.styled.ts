import styled from 'styled-components';
import { StyledUserListRow } from '../UserListRow.styled';

export const StyledUserItem = styled(StyledUserListRow)`
  .top-row {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};

    .avatar {
      font-size: ${({ theme }) => theme.icon.sm};
    }

    > div {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
