import styled from 'styled-components';
import { StyledUserCardRow } from '@/components/UserCardRow.styled';

export const StyledSearchResultItem = styled(StyledUserCardRow)`
  .resultName {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .resultName.muted {
    color: ${({ theme }) => theme.ink.secondary};
  }
`;
