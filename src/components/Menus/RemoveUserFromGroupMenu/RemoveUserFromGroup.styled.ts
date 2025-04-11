import { styled } from "styled-components";

export const StyledRemoveUserFromGroup = styled.div`
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
  /* z-index: 1; */
  display: flex;
  flex-direction: column;
  .fixed-header-container {
    position: sticky;
    top: 0;
    z-index: 0;
    background-color: ${({ theme }) => theme.layer2};
  }
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
  .scrollable-content {
    overflow-y: auto;
    flex: 1;
    padding-top: 10px;

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
        .guestWrap {
          display: flex;
          flex-direction: column;
          .guest {
            color: ${({ theme }) => theme.textInactiveColor};
            font-size: 11px;
          }
        }
      }
    }
  }
  .input {
    display: flex;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;

    .search-input {
      width: 100%;
      flex: 1;
      padding-top: 7px;
      padding-bottom: 7px;
      font-size: 16px;
    }
  }
`;
