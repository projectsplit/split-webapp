import { styled } from 'styled-components';
import { StyledDialog } from '../../../components/Menus/Layouts/Dialog/Dialog.styled';

export const StyledGroupTotalsByCurrency = styled(StyledDialog)`
  max-height: 80vh;
  overflow-y: auto;

  .legends {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.s12};

    .grouping {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s6};
      min-width: 0;
    }

    .legendUser,
    .legendGroup {
      width: ${({ theme }) => theme.space.s8};
      height: ${({ theme }) => theme.space.s8};
      flex-shrink: 0;
      border-radius: 2px;
    }

    .descr {
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.ink.tertiary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
