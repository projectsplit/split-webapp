import styled from "styled-components";

export const StyledGroups = styled.div`
  overflow: auto;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};


  .groupCategories {
    margin:14px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 4px;
    margin-top: 0px;
    position: relative;
  }
  
`;
