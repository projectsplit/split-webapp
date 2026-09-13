import styled from 'styled-components';
import { StyledUserCardRow } from '@/components/UserCardRow.styled';

export const StyledMemberItem = styled(StyledUserCardRow)`
  .memberIdentity {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s3};
  }

  .memberName {
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .memberMeta {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chip {
    cursor: pointer;
  }
`;
