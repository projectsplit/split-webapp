import styled from 'styled-components';

export const StyledBudgetScopeGroupsMenu = styled.div<{ $maxHeight?: string }>`
  overflow: auto;
  padding: 0;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.greyOutline};
  border-radius: 12px 12px 12px 12px;
  max-height: ${(props) => props.$maxHeight || '49vh'};

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
    background-color: ${({ theme }) => theme.checkmarkGreen};
    color: black;
    border-color: black;
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
      padding-bottom: 10px;
      .groupNameAndArchivedStatus {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .archived {
          margin-top: 3px;
          margin-left:4px;
          display: flex;
          color: ${({ theme }) => theme.archivedActive};
        }
      }
    }
    .groups.selected {
      background-color: transparent;
    }
    .checkIcon {
      margin-left: auto;
      color: ${({ theme }) => theme.checkmarkGreen};
      font-size: 20px;
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
