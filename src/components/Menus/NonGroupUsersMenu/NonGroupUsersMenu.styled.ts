import styled from "styled-components";

export const StyledNonGroupUsersMenu = styled.div`
  position: fixed;
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.layer2};
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 20px;
  bottom: 0;
  overflow-y: auto;
  .header {
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

    .backButton {
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
  .categories {
    margin-top: 7px;
  }
  .separator {
    position: sticky;
    min-height: 1px;
  }

  .spacer {
    flex-grow: 1; /* This pushes the button to the bottom */
  }
  .scrollable-content {
    overflow-y: auto;
    flex: 1;
    padding-top: 1rem;
    padding-bottom: 180px;
    .members {
      display: flex;
      flex-direction: column;
      padding: 0.875rem;
      font-size: 15px;

      .memberWithButton {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 19px;
      }
    }
    .input {
      display: flex;
      width: 100%;

      .search-input {
        width: 100%;
        flex: 1;
        padding-top: 7px;
        padding-bottom: 7px;
        font-size: 16px;
      }
      /* .createButton{
      margin-left: 10px;
    } */
    }
  }
`;
