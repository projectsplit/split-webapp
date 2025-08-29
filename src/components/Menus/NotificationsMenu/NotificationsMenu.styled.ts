import { styled } from "styled-components";
import { StyledMiddleScreenMenu } from "../Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledNotificationsMenu = styled(StyledMiddleScreenMenu)`
  /* transform: translateZ(0); */
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-sizing: border-box;
  max-height: 50%;
  padding: 0;

  .headerSeparator {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: ${({ theme }) => theme.layer2};
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    .separator {
      transform: translateZ(0);
      position: sticky;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
   
      .info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      
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

  .notifications {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    .data {
      .item {
        padding-top: 16px;
      }
    }

    .noData {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding-top: 1rem;
      .msg {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        opacity: 0.5;
      }

      .icon {
        display: flex;
        font-size: 100px;
        opacity: 0.5;
      }
    }
  }
`;
