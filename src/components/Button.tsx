import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { styled } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: ReactNode;
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props) => {

  const {
    onClick,
    disabled,
    children,
    ...rest
  } = props;

  return (
    <StyledButton onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button`
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