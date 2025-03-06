import styled from "styled-components";

export const StyledUserInvitations = styled.div`
  min-width: 100%;
  display: flex;
  padding: 16px 16px;
  flex-direction: column;
  align-items: center;
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
    
  .invitations {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    width: 100%;
  }
`;