import styled from 'styled-components';

export const StyledBudgetScopeGroupsMenu = styled.div<{ height: string }>`
  overflow: auto;
  padding: 0;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.greyOutline};
  border-radius: 12px 12px 12px 12px;
  height: ${(props) => props.height};

  .headerAndSearchbar {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: ${({ theme }) => theme.greyOutline};

    .searchBar {
      border-radius: 10px;
      padding: 0.5rem;
      outline: none;
      font-size: 16px;
      border: none;
      color: white;
      background-color: ${({ theme }) => theme.layer2};
      margin-top: 8px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .selectAll {
    display: flex;
    width: 35px;
    padding: 5px;
    margin: 10px;
    margin-left: 14px;
    cursor: pointer;
    border-color: black;
    border: solid;
    border-width: 1px;
    border-radius: 16px;
    border-color: grey;
  }
  .selectAll.selected {
    background-color: white;
    color: black;
    border-color: white;
  }
  .groupSection {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .groups {
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
    .groups.selected {
      background-color: white;
      color: black;
      border-color: white;
    }
  }
  .noResults {
    font-size: 14px;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 15px;
  }
`;
