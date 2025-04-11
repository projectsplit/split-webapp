import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledRenameGroupMenu = styled(StyledMiddleScreenMenu)`
.errorMessage{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    text-align: start;
    font-size: 14px;
    .closeButton {
        font-size: 30px;
        color: #6f6f6f;
        height: 17px;
        margin-top: -15px;
        margin-right: -8px;
        align-self: flex-end; 
        &:hover {
          color: ${({ theme }) => theme.whiteText};
        }
        .close {
          cursor: pointer;
          display: block;
        }
      }
    .exclamation {
      display: flex;
      justify-content: center;
      font-size: 25px;
    }
  }
  .headerSeparator {
    position: sticky;
    top: 0;

    background-color: ${({ theme }) => theme.layer2};
    .input {
      width: 85%;
    }
    .separator {
      transform: translateZ(0);
      position: sticky;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      .infoLogo {
        font-size: 30px;
        /* color: ${({ theme }) => theme.yellow}; */
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
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
`;
