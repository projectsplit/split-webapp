import styled from "styled-components";

export const StyledSearchUsersToInvite = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  gap: 16px;
  
  .search-result {
    display: flex;
    flex-direction: column;
    
    .top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .action-button {
        border: none;
        border-radius: 4px;
        user-select: none;
        color: ${({ theme, color }) => (color ? color : theme.text)};
        display: flex;
      }
    }
    
    .bottom-row {
      display: flex;
      color: ${({ theme }) => theme.secondaryTextColor};
      font-style: italic;
    }
  }
`;