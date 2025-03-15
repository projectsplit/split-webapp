import styled from "styled-components";
import { StyledBottomMenu } from "../../../components/Menus/Layouts/BottomMenu/BottomMenu.styled";


export const StyledSettleUpOptions = styled(StyledBottomMenu)`
  
  overflow: auto;
  padding: 0;

  .header {
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.layer2};
  }

  .settleUpOption{
    cursor: pointer;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${({ theme }) => theme.layer1};
    padding: 14px;
  }
  
  .settleUpOption.clicked {
    background-color: ${({ theme }) => theme.clicked};
  }

  .settleUpButton{
    margin-top: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: sticky;
    bottom:0px;
    z-index: 1;
    background-color: ${({ theme }) => theme.layer2};
  }
  .currencyOwes {
    color: ${({ theme }) => theme.redish};
  }
`;
