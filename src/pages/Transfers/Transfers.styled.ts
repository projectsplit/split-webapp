import styled from "styled-components";

export const StyledTransfers = styled.div`
  min-width: 100%;
  display: flex;
  padding: 16px 8px;
  flex-direction: column;
  /* align-items: center; */
  overflow-y: auto;
  height: 100%;
  gap: 16px;
  .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex:1;
    .msg {
      opacity: 0.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon {
      display: flex;
      font-size: 100px;
      opacity: 0.4;
    }
  }
  .same-date-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    .date-only {
      background-color: ${({ theme }) => theme.backgroundcolor};
      align-self: center;
      position: sticky;
      top: 0;
      font-size: 14px;
      margin: 0px 0px 1px 0px;
      padding: 0px 8px 0px 8px;
      border-radius: 4px;
      color: ${({ theme }) => theme.secondaryTextColor};
      font-weight: 600;
    }

    .transfers {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  
  .spinner {
    display: flex;
    flex-direction: column;
    flex: 1; 
    align-items: center; 
    justify-content: center; 
    margin-top: 2rem; 
    height: 100%;
  }
`;
