import styled from "styled-components";

export const StyledSearchTransactions = styled.div`
  box-sizing: border-box;
  bottom: 0;
  position: fixed;
  background-color: ${({ theme }) => theme.layer2};
  width: 100%;
  height: 100%;
  z-index: 3;
  padding: 0;
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }

  .header {
    padding: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    .closeSign {
      display: flex;
      align-self: center;
      font-size: 30px;
      margin-right: 15px;
      cursor: pointer;
    }

    .groupName {
      font-weight: 600;
    }
    .gap {
      margin-right: 15px;
    }
    .searchingIn {
      font-size: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .searchBarAndCategories {
    flex: 1;
    padding: 14px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .lexicalSearch {
      position: relative;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      .contentEditable {
        position: relative;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 0.5rem;
        color: white;
        background-color: ${({ theme }) => theme.inputGrey};
        border-style: none;
        font-size: 16px;
        outline: none;
        min-height: 20px;
      }
      .contentEditablePlaceholder {
        position: absolute;
        top: 8px;
        left: 12px;
        padding: 0 1px;
        color: ${({ theme }) => theme.grey};
        pointer-events: none;
      }
      .editor-bold {
      }

      .trigger {
        border-radius: 5px;
        background-color: ${({ theme }) => theme.grey};
        padding: 2px ;
      }
      .value {
      }

      .container {
        background-color: ${({ theme }) =>
          theme.grey}; // configured by the beautifulMentionsTheme
        border-radius: 5px;
        padding: 2px ;
      }

      .containerFocused {
        background-color: ${({ theme }) => theme.grey};
        border-radius: 5px;
      }
    }
  }

  .submitButtons {
    z-index: 4;
    display: flex;
    flex-direction: column;
    position: sticky;
    bottom: 14px;
    width: calc(100% - 28px);
    left: 14px;
    gap: 10px;
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  z-index: 4;
`;
