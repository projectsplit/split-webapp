import styled from 'styled-components';
import { StyledDirectionCard } from '../DirectionCard/DirectionCard.styled';

interface StyledNonGroupMenuProps {
  $noReceiverSelected?: boolean;
  $isSamePersonError: boolean;
}

export const StyledNonGroupMenu = styled(
  StyledDirectionCard
)<StyledNonGroupMenuProps>`
  .groupButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s8};
    padding: ${({ theme }) => `13px ${theme.space.s12}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    color: ${({ theme }) => theme.ink.primary};
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    cursor: pointer;

    .groupIcon {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.ink.secondary};
    }
  }
`;
