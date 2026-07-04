import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled, { keyframes } from 'styled-components';
import { StyledMyButton } from './StyledMyButton';
const spin = keyframes `
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const Spinner = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== 'selected',
}) `
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid
    ${({ variant }) => (variant === 'secondary' ? '#8594E0' : '#26272B')};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  transform: translate(-50%, -50%);
`;
const MyButton = ({ children, variant = 'primary', disabled, isLoading, hasFailed, onClick, fontSize, style, }) => {
    return (_jsxs(StyledMyButton, { variant: variant, disabled: disabled, isLoading: isLoading, hasFailed: hasFailed, onClick: onClick, fontSize: fontSize, style: style, children: [isLoading && _jsx(Spinner, { variant: variant }), _jsx("span", { style: { opacity: isLoading ? 0 : 1 }, children: children })] }));
};
export default MyButton;
