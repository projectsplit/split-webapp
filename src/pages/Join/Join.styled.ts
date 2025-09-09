import styled from "styled-components";
import { StyledMiddleScreenMenu } from "../../components/Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled";

export const StyledJoin = styled(StyledMiddleScreenMenu)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-sizing: border-box;
  max-height: 50%;
  padding: 0px;
  background-color: ${({ theme }) => theme.layer2};
  padding-bottom: 20px;

  .spinner {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    height: 100%;
  }
  
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
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;

      .info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .NoErrors {
    .text {
      padding: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-size: 0.9rem;
      gap: 5px;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 15px;
    }
  }
  .errors {
    .text {
      padding: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-size: 0.9rem;
      gap: 5px;
      word-break: break-word;
      overflow-wrap: break-word;
      color: ${({ theme }) => theme.redish};
    }
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 15px;
    }
  }

  .invitations {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    width: 100%;
  }
`;
