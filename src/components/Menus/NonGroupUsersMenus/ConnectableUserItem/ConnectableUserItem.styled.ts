import styled from 'styled-components';
import { StyledUserListRow } from '../UserListRow.styled';

export const StyledConnectableUserItem = styled(StyledUserListRow)`
  .top-row {
    position: relative;

    button {
      flex-shrink: 0;
    }
  }
`;
