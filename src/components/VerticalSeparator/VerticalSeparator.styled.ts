import styled from "styled-components";

export const StyledVerticalSeparator = styled.div`
  width: 1px;
  background-color: ${({ theme }) => theme.lightBorder};
  margin-left: 1.5rem; 
  margin-bottom:-0.5rem;
  align-self: stretch;
`;
