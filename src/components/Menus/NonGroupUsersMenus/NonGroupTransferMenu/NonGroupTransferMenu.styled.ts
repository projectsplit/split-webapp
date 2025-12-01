import styled from "styled-components";

export const StyledNonGroupTransferUsersMenu = styled.div`
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
  gap: 20px;
  bottom: 0;
  overflow-y: auto;

  .fixedHeader {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: ${({ theme }) => theme.layer2};

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      padding: 12px 16px;

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
  }

  .scrollable-content {
    overflow-y: auto;
    flex: 1;
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
      padding-right: 12px;
      padding-left: 12px;
      .search-input {
        width: 100%;
        flex: 1;
        font-size: 16px;
      }
      .main {
        width: 100%;
        transition: border-color 0.15s;
        background-color: ${({ theme }) => theme.inputGrey};
        display: flex;
        gap: 4px;
        border-radius: 8px;
        padding: 8px 16px;
        flex-wrap: wrap;
        position: relative;

        .search-annotation {
          position: absolute;
          flex: 1;
          color: grey;
          cursor: text;
        }
        .selected-label {
          color: #000000a2;
          display: flex;
          gap: 8px;
          align-items: center;
          border-radius: 5px;
          padding: 2px 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          .info {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
          }
        }
      }
    }
    .dropdown {
      margin-top: 20px;
      .spinner {
        display: flex;
        justify-content: center;
      }
    }
  }

  .doneButton {
    position: fixed;
    bottom: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    cursor: pointer;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 5;
    padding: 16px;
    display: flex;
    justify-content: stretch;
    cursor: pointer;
    & > * {
      flex: 1;
    }
  }
`;
