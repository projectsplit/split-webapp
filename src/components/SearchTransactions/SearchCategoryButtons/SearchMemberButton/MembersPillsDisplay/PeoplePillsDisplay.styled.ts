import styled from "styled-components";

export const StyledPeoplePillsDisplay = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  .category {
    cursor: pointer;
  }

  .pills {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  /* .pills::-webkit-scrollbar {
    height: 2px;
    
  }

  .pills:hover::-webkit-scrollbar {
    height: 8px;
  }

  .pills::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.grey};
    border-radius: 4px;
    cursor: pointer;
  } */

  .type{
    color: ${({ theme }) => theme.grey};
  }
`;
