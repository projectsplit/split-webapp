import styled from "styled-components";

export const StyledTopMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;

  .bellIconAndNumberOfNotifications {
    position: relative;
  }
  .notification {
    font-size: 12px;
    font-weight: 800;
    position: absolute;
    background-color: red;
    border-radius: 50%; 
    width: 0.5rem; 
    height: 0.5rem; 
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 5px;
    left: 5px;
  }
  .titleStripe {
    display: flex;
    flex-direction: row;

    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;
