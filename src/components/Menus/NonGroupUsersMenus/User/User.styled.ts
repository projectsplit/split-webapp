import styled from 'styled-components';

interface StyledUserProps {
  $isSelected: boolean;
}
/* Row geometry is shared with ConnectableUserItem: both kinds of row sit in the same list and a
   user has no idea that "already connected" is why one of them renders differently, so any
   difference in indent or height reads as the list being broken. Keep these three values in sync
   with ConnectableUserItem.styled.ts. */
export const StyledUser = styled.div<StyledUserProps>`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  cursor: pointer;

  .nameAndTick {
    background-color: ${(props) =>
      props.$isSelected ? props.theme.inputGrey : 'transparent'};
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    min-height: 3rem;
    .name {
      flex: 1;
    }
    .tick {
      font-size: 20px;
    }
  }
`;
