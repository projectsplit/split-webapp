import styled from 'styled-components';

/* Keep the row geometry in sync with User.styled.ts — see the note there. */
export const StyledConnectableUserItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  cursor: pointer;

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    min-height: 3rem;

    .name {
      flex: 1;
    }
  }
`;
