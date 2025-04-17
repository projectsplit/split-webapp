import { styled } from "styled-components";
import { StyledMiddleScreenMenu } from "../../../components/Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledGroupTotalExpensesByCurrency = styled(StyledMiddleScreenMenu)`
  font-size: 14px;
  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
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
  .legends {
    display: flex;
    flex-direction: row;
    gap: 10px;

    .grouping {
      display: flex;
      flex-direction: row;
      gap: 10px;
      .legendUser,
      .legendGroup {
        font-size: 18px;
        width: 1rem;
        height: 1rem;

        border-radius: 5px;
      }
      .descr {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
