import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../../../components/Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledSpendingCycleInfo = styled(StyledMiddleScreenMenu)`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 5px;
      .infoLogo {
        font-size: 30px;
        color: ${({ theme }) => theme.yellow};
      }
    }
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
  .text {
    color: rgb(193, 193, 193);
    font-size: 14px;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
