import styled from "styled-components";

export const StyledNonGroupExpenseUsersMenu = styled.div`
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
    .categories {
      margin-top: 7px;
    }
  }

  .separator {
    position: sticky;
    min-height: 1px;
    transform: translateZ(0);
  }

  .spacer {
    flex-grow: 1; /* This pushes the button to the bottom */
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
      /* .createButton{
      margin-left: 10px;
    } */
      .main {
        width: 100%;
        transition: border-color 0.15s;
        background-color: ${({ theme }) => theme.inputGrey};
        display: flex;
        gap: 4px;
        align-items: center;

        border-radius: 8px;
        padding: 8px 16px;
        flex-wrap: wrap;
        position: relative;

        .input {
          flex: 1;
        }

        .icon {
          display: flex;
          font-size: 1.4rem;
          margin-left: auto; /* Pushes the button to the right */
          cursor: pointer;
        }
        .search-annotation {
          position: absolute;
          flex: 1;
          color: grey;
          cursor: text;
        }
      }
    }
    .noData{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin-top: 100px;
			.msg{
        color: ${({ theme }) => theme.textInactiveColor};
				text-wrap: wrap;
				text-align: center;
			}
      .icon{
        display: flex;
        font-size: 100px;
        opacity: 0.5;
        margin-top: 20px;
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
