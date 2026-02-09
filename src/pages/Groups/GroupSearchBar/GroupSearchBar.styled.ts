import styled from "styled-components";

export const StyledGroupSearchBar = styled.input`
  border-radius: 10px;
  padding: 0.5rem;
  outline: none;
  font-size: 16px;
  border: none;
  color: white;
  background-color: ${({ theme }) => theme.inputGrey};
  margin-top: 8px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
   
  }
`;