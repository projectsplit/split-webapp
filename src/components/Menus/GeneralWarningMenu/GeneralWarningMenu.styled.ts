import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledGeneralWarningMenu = styled(StyledMiddleScreenMenu)`
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
      font-size: 16px;
      .infoLogo {
        font-size: 30px;
        color: ${({ theme }) => theme.yellow};
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px 0;
    text-align: center;
  }
  .confirmButton {
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
`;
