import styled from 'styled-components';
import { StyledUserListRow } from '../UserListRow.styled';

interface StyledUserProps {
  $isSelected: boolean;
}

export const StyledUser = styled(StyledUserListRow)<StyledUserProps>`
  .top-row {
    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.surface.raised : 'transparent'};

    .sideTag {
      flex-shrink: 0;
      padding: ${({ theme }) => `${theme.space.s3} ${theme.space.s8}`};
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.tertiary};
      font-size: ${({ theme }) => theme.size.s10};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .sideTag.picked {
      background-color: ${({ theme }) => theme.surface.mark};
      color: ${({ theme }) => theme.ink.primary};
    }
  }

  .top-row.taken {
    cursor: default;

    .avatar,
    .name {
      opacity: 0.45;
    }
  }
`;
