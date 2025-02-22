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
    
  .invitations {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    width: 100%;
  }
`;