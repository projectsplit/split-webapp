import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledErrorMenu = styled(StyledMiddleScreenMenu)`
  .headerSeparator {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: ${({ theme }) => theme.layer2};

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
        color: ${({ theme }) => theme.redish};
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
  .info {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;
