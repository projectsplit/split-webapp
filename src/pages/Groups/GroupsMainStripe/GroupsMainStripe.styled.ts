import styled from "styled-components";

export const StyledGroupsMainStripe = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding:14px;

  .groupStripe {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: end;
    
    .title {
      margin-left: 20px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .backButtonContainer {
    position: relative;
    cursor: pointer;
    display: inline-block;
  }

  .backButton {
    cursor: pointer;
    display: block;
    font-size: 30px;
  }

  .backButtonContainer:hover::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(128, 128, 128, 0.3);
    pointer-events: none;
  }

`;
