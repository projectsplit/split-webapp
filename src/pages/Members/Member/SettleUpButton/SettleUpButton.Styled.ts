import styled from "styled-components";

export const StyledSettleUpButton = styled.div`

  font-size: 14px;
  width:fit-content;
  background-color: ${({ theme }) => theme.buttonActive};
  display: flex;
  color:${({theme})=>theme.text};
  border-radius: 6px;
  padding: 3px 8px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.50) 0px 4px 4px; 
  white-space: nowrap; 
  `;