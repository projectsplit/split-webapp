import styled from "styled-components";

export const StyledCurrentSearchField = styled.div`
  border: none;
  background-color: transparent;

  font-size: 20px;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 15px;

  .type {
    color: ${({ theme }) => theme.grey};
  }

  .category{
    font-size:18px;
    color: white;
  }
  .pills {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }
`;
