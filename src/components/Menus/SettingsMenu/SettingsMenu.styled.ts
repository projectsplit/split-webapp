import styled from "styled-components";

export const StyledSettingsMenu = styled.div`
  position: fixed;
  font-size: 1.125rem;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.layer2};
  z-index: 3;
  display: flex;
  flex-direction: column;

  .headerWrapper {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: ${({ theme }) => theme.layer2};
    .header {
      position: sticky;
      z-index: 4;
      padding: 0.875rem;
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
        font-size: 1.875rem;
      }

      .closeButtonContainer:hover::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: rgba(128, 128, 128, 0.3);
        pointer-events: none;
      }

      .name {
        font-weight: 600;
      }
    }
  }

  .optionsContainer {
    overflow-y: auto;
    flex: 1;
    padding: 0 0.875rem;
    margin-top: 1rem;
    
    .option {
      margin-top: 1rem;
      font-weight: 600;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;
      padding: 1rem;
      background-color: #2d2d2d;
      border-radius: 10px;
      cursor: pointer;
      .description {
        font-size: 1rem;
      }
      .icon {
        font-size: 1.5rem;
      }
    }
    .toggleOption{
      margin-top: 1rem;
      font-weight: 600;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;
      padding: 1rem;
      background-color: #2d2d2d;
      border-radius: 10px;
      justify-content: space-between;
      cursor: pointer;
      .description {
        flex:1;
        font-size: 1rem;
      }
      .icon {
        font-size: 1.5rem;
      }
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: grey;
    font-size: 0.8rem;
    .appName,
    .version {
      display: flex;
      justify-content: center;
    }
  }
`;
