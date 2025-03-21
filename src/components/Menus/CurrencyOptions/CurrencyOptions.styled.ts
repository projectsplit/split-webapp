import styled from "styled-components";
import { StyledBottomMenu } from "../Layouts/BottomMenu/BottomMenu.styled";


export const StyledCurrencyOptions = styled(StyledBottomMenu)`
  overflow: auto;
  padding: 0;

  .headerAndSearchbar {
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: ${({ theme }) => theme.layer2};

    .searchBar {
      border-radius: 10px;
      padding: 0.5rem;
      outline: none;
      font-size: 16px;
      border: none;
      color: white;
      background-color: ${({ theme }) => theme.inputGrey};
      margin-top: 8px;
    }
  }

  .currencyOption {
    cursor: pointer;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-left: 10px;
    margin-right: 10px;
    align-items: center;
  }
  .currencyOption.clicked {
    background-color: ${({ theme }) => theme.clicked};
  }

  .noResults {
    font-size: 14px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
