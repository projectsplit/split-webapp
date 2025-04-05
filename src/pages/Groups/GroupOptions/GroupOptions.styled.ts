import styled from "styled-components";

export const StyledGroupOptions = styled.div`
  position: fixed;
  font-size: 1.125rem;
  left: 0;
  right: 0;
  margin: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.layer2};
  z-index: 3;
  display: flex;
  flex-direction: column;

  .groupName{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .headerWrapper {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: ${({ theme }) => theme.layer2};
    .header {
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

      .title {
        font-weight: 600;
      }
      .gap {
        margin-right: 0.9375rem;
      }
    }
  }
  .optionsContainer {
    display: flex;
    flex-direction: column;
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

    .option-leave {
      margin-top: auto;
      margin-bottom: 20px;
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
      .icon-exit {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.redish};
      }
    }
  }
  .archiveGroupText{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:10px;
    text-align: start;
    .handshake{
      display: flex;
      justify-content: center;
      font-size: 25px;
    }
  }
`;
