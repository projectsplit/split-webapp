import { styled } from "styled-components";

export const StyledInvitation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.lineColor};
  gap: 10px;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  
  .message {
    overflow: hidden;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
    max-width: 100%;
    color: ${({ theme }) => theme.secondaryTextColor};
    
    .highlighted {
      color: ${({ theme }) => theme.primaryTextColor};
      font-weight: 500;
    }
  }
  
  .actions {
    font-size: 14px;
    display: flex;
    gap: 16px;
    margin-left: auto;
    
    .accept {
      background-color: ${({ theme }) => theme.highlightColor};
      color: ${({ theme }) => theme.backgroundColor};
    }
    
    .decline {
      border: 1px solid ${({ theme }) => theme.highlightColor};
      color: ${({ theme }) => theme.secondaryTextColor};
    }
  }
`;