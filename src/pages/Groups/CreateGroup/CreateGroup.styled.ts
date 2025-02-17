import styled from "styled-components";

export const StyledCreateGroup = styled.div`
  position: fixed;

  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.layer2};
  z-index: 3;
  display: flex;
  flex-direction: column;

  .submitButton,
  .input {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 0 14px;
  }

  .submitButton {
    margin-top: auto;
    margin-bottom: 14px;
  }

  .header {
    padding: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    .closeButtonContainer {
      position: relative;
      cursor: pointer;
      display: inline-block;
    }

    .closeButton {
      cursor: pointer;
      display: block;
      font-size: 30px;
    }

    .closeButtonContainer:hover::before {
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

    .title {
      font-weight: 600;
    }
    .gap {
      margin-right: 15px;
    }
  }
`;
