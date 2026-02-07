import styled from "styled-components";

export const StyledMenuItem = styled.li<{
  $bgColor?: string;
  $selected?: boolean;
}>`
  font-weight: 400;
  font-size: 18px;
  background-color: ${(props) => props.$bgColor || "#131519c9"};
  -webkit-tap-highlight-color: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  padding: 1px 8px;
  gap: 3px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  color: ${(props) => (props.$bgColor ? "black" : props.color || "inherit")};
  margin-bottom: 20px;
`;
