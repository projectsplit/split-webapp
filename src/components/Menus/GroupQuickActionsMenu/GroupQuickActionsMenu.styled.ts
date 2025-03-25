import styled from "styled-components";
import { StyledBottomMenu } from "../Layouts/BottomMenu/BottomMenu.styled";

export const StyledGroupQuickActionsMenu = styled(StyledBottomMenu)`
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .new {
      .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        .icon {
          display: flex;
          align-self: center;
          font-size: 3rem;
          padding: 0.5rem;
          border: 2px solid ${({ theme }) => theme.greyOutline};
          border-radius: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-bottom: 1rem;
          color: ${({ theme }) => theme.layer6};
          background-color: ${({ theme }) => theme.greyOutline};
        }
        .descr {
          color: ${({ theme }) => theme.layer6};
          margin-bottom: 10px;
        }
      }
      .plus {
        font-size: 12px;
        font-weight: 800;
        position: absolute;
       
        border-radius: 50%;
        width: 1.1rem;
        height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 40px;
        left: 5px;
      }
    }
  }
  .closeButton {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .closeButton button {
    width: 100%;
  }
`;
