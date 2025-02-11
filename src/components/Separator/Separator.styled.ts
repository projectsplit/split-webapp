import styled from "styled-components";

export const StyledSeparator = styled.div`
&::after {
    content: '';
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
    height: 1px; 
    background-color: rgb(54,54,54); 
    
  }
`