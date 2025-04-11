import styled from "styled-components";

export const StyledSearchUsersToInvite = styled.div`
  position: fixed;
  font-size: 1.125rem;
  bottom: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.layer2};
  z-index: 3;
  display: flex;
  flex-direction: column;

  .fixed-header-container {
    position: sticky;
    top: 0;
    z-index: 4;
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

  .search-result {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    display: flex;
    flex-direction: column;
    padding: 0 0.875rem;

    .top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .action-button {
        border: none;
        border-radius: 4px;
        user-select: none;
        color: ${({ theme, color }) => (color ? color : theme.text)};
        display: flex;
      }
    }

    .bottom-row {
      display: flex;
      color: ${({ theme }) => theme.secondaryTextColor};
      font-size: 14px;
    }
  }
`;
