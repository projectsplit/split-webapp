import { styled } from 'styled-components';

export const StyledInviteUsersToNewGroup = styled.div`
  position: fixed;
  font-size: 14px;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #0f0f0f;
  color: white;
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

export const Subtitle = styled.div`
  font-size: 0.85rem;
  color: #d1d1d1;
  padding: 1rem;
  font-weight: 600;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;

  .membersContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.inputGrey};
    border-radius: 10px;
    margin-bottom: 0.5rem;

    .status {
      display: flex;
      align-items: center;
      gap: 6px;
      color: grey;
    }

    .statusDot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .statusDot.invited {
      background-color: orange;
    }

    .statusDot.guest {
      background-color: ${({ theme }) => theme.ciel};
    }
    .statusDot.creator {
      background-color: green;
    }
  }
`;

export const BottomContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 2rem;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    padding: 0.5em 1em;
    font-weight: 400;
    cursor: pointer;
  }
`;
