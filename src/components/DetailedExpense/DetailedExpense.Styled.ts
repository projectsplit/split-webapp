import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledDetailedExpense = styled(StyledMiddleScreenMenu)`
  display: flex;
  flex-direction: column;
  height: 99%;
  top: 0.3%;
  overflow: auto;
  scrollbar-width: thin;
  margin: 2px;
  box-shadow: ${({ theme }) => `0 0 0 1px ${theme.lightBorder}`};
  z-index:4;
  .dateAndLabels {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .labelsWrapper {
      overflow-x: auto;
      text-align: center;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .labelsWrapper::-webkit-scrollbar {
      display: none;
    }

    .labels {
      display: inline-flex;
      gap: 5px;
    }
  }
  .descriptionAndCloseButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .expenseName{
      font-size: 20px;
    }
    .descreption {
      display: flex;
      justify-content: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-weight: 400;
      color: ${({theme})=>theme.whiteText};
      font-style: italic;
      min-height: 21px;
    }
    .closeButton {
      font-size: 30px;
      color: #6f6f6f;
      height: 17px;
      margin-top: -15px;
      margin-right: -8px;
      &:hover {
        color: ${({ theme }) => theme.whiteText};
      }
      .close {
        cursor: pointer;
        display: block;
      }
    }
  }

  .total {
    display: flex;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 400;
    color: ${({theme})=>theme.whiteText};

    min-height: 21px;
    font-weight: bold;
  }
  .editDeleteButtons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .buttons {
      display: flex;
      flex-direction: row;
      gap: 25px;
      .editButton {
      }
    }
  }
  .createdBy,.date {
    display: flex;
    flex-direction: row;
    justify-content: center;

    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.grey};
  }
  p {
    margin: 0;
  }

  .textEditor {
    display: flex;
    flex-direction: column;
    position: relative;
    max-height: 90px;
    overflow-y: auto;
  }

  .options {
    background-color: ${({ theme }) => theme.inputGrey};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5rem;
  }
  .sendIcon {
    cursor: pointer;
    font-size: 20px;
  }

  .commentSection {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    min-height: 200px;
    position: relative;
    justify-content: end;

    .contentEditable {
      position: relative;
      border: 1px solid #ccc;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding: 0.7rem;
      color: white;
      background-color: ${({ theme }) => theme.inputGrey};
      border-style: none;
      font-size: 15px;
      outline: none;
    }
    .contentEditablePlaceholder {
      position: absolute;
      padding: 0.6rem;
      color: ${({ theme }) => theme.grey};
      pointer-events: none;
    }
    .editor-bold {
    }

    .trigger {
      background-color: ${({ theme }) => theme.grey};
    }
    .value {
    }

    .container {
      background-color: ${({ theme }) => theme.grey};
      border-radius: 5px;
    }

    .containerFocused {
      background-color: ${({ theme }) => theme.grey};
      border-radius: 5px;
    }
  }
  .comments {
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin-bottom: 5px;
  }

  .editDeleteButtons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
      justify-content: center;

      .editButton,
      .deleteButton {
        .buttonChildren {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
        flex: 1; /* Optional: Make buttons take equal space */
      }
    }
  }
`;
