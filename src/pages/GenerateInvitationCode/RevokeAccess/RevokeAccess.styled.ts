import styled from "styled-components";

export const StyledRevokeAccess = styled.div`
  display: flex;
  padding: 16px 8px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  gap: 16px;
  flex: 1;

  .scrollable-content {
    overflow-y: auto;
    flex: 1;
    padding-top: 1rem;
    padding-bottom: 180px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .promptText {
    padding: 10px;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: center;
  }
  
  .spinner {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    height: 100%;
  }
`;
