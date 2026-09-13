import styled from 'styled-components';
import { StyledBottomMenu } from '@/components/Menus/Layouts/BottomMenu/BottomMenu.styled';
import { StyledDirectionCard } from '../DirectionCard/DirectionCard.styled';

export const StyledGroupMenu = styled(StyledDirectionCard)`
  .nonGroupGroupPill {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StyledMemberSheet = styled(StyledBottomMenu)`
  max-height: 70dvh;
  overflow: hidden;

  .sheetTitle {
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    flex-shrink: 0;
  }

  .membersCard {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.surface.page};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
  }

  .memberRow {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s16}`};
    min-height: 56px;
    box-sizing: border-box;
    flex-shrink: 0;
    cursor: pointer;
  }

  .memberRow + .memberRow::before {
    content: '';
    position: absolute;
    left: 58px;
    right: 0;
    top: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.surface.raisedHigh};
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .memberRow .name {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .memberRow.taken {
    cursor: default;

    .avatar,
    .name {
      opacity: 0.45;
    }
  }

  .memberRow.picked .sideTag {
    background-color: ${({ theme }) => theme.surface.mark};
    color: ${({ theme }) => theme.ink.primary};
  }

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

`;
