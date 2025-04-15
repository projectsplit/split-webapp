import styled from "styled-components";

export const StyledMembers = styled.div`
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  overflow: auto;
  gap: 10px;
  padding: 14px;
  height: 100%;
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
