import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledEditUsername = styled(StyledMiddleScreenMenu)`


  .username-status {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: ${({ theme }) => theme.redish};
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
      .checkmark{
    
        font-size: 25px;
        bottom: 0px;
        color: ${({ theme }) => theme.green};
      }
      .warning{
        font-size: 25px;
        bottom: 0px;
        color: ${({ theme }) => theme.redish};
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
