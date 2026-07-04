import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from 'styled-components';
const Button = (props) => {
    const { onClick, disabled, children, ...rest } = props;
    return (_jsx(StyledButton, { onClick: onClick, disabled: disabled, ...rest, children: children }));
};
export default Button;
const StyledButton = styled.button `
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  border-color: ${({ theme }) => theme.inactiveColor};
  background-color: ${({ theme }) => theme.backgroundcolor};
  color: ${({ theme }) => theme.activeTabButtonTextColor};
  cursor: pointer;
  transition: border-color 0.25s;
  cursor: pointer;

  &:hover {
    /* border-color: #646cff; */
    /* border-color: ${({ theme }) => theme.highlightColor}; */
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
