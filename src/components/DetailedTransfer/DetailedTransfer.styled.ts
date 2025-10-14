import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledDetailedTransfer = styled(StyledMiddleScreenMenu)<{
  $outlineColor?: string;
}>`
  display: flex;
  flex-direction: column;
  height: 99%;
  top: 0.3%;
  //overflow: auto;
  scrollbar-width: thin;
  margin: 2px;
  box-shadow: ${({ theme }) => `0 0 0 1px ${theme.lightBorder}`};
  z-index: 4;
  .total {
    display: flex;
    justify-content: center;
  }
  .transfer {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: 100%;
    gap: 5px;
    padding: 10px;
    font-size: 14px;
    background-color: ${({ theme }) => theme.layer2};
    ${({ $outlineColor }) =>
      $outlineColor && `border: 1px solid ${$outlineColor};`}
    .sentFrom,.to,.sentTo,.descr {
      display: flex;
      justify-content: center;
    }
    .name {
      color: ${({ theme }) => theme.textActiveColor};
    }
    .sentFrom,
    .to {
      color: ${({ theme }) => theme.layer6};
    }
    .descr {
      display: flex;
      justify-content: center;
      color: ${({ theme }) => theme.layer6};
      font-style: italic;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 5px;
    }
  }
  .deleteButton {
    display: flex;
    justify-content: center;
  }
  .createdBy,
  .date {
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.layer6};
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
      padding-top: 0.1rem;
      padding-left: 0.9rem;
      padding-right: 0.3rem;
      padding-bottom: 0.3rem;
      color: white;
      background-color: ${({ theme }) => theme.inputGrey};
      border-style: none;
      font-size: 15px;
      outline: none;
    }
    .contentEditablePlaceholder {
      position: absolute;
      padding-left: 0.9rem;
      margin-top: 15px;
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

  .headlineAndClose {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .head {
      font-size: 20px;
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
`;
