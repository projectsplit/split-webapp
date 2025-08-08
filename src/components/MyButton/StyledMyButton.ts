import { css, keyframes, styled } from "styled-components";

export const StyledMyButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["variant", "isLoading", "hasFailed"].includes(prop),
})<StyledMyButtonProps>`
  font-family: "Roboto";
  padding: 0.5em 1em;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  font-size: ${({fontSize})=>fontSize?`${fontSize}px`:"14px"};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  /* z-index: 5; */
  background-color: ${({ variant }) => buttonVariants[variant].background};
  color: ${({ variant }) => buttonVariants[variant].color};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.8;
    `}

  ${({ hasFailed }) =>
    hasFailed &&
    css`
      animation: ${shake} 0.4s ease;
      animation-fill-mode: forwards;
    `}

  &:hover {
    ${({ disabled, isLoading, variant }) =>
      !disabled &&
      !isLoading &&
      css`
        background-color: ${buttonVariants[variant].hover};
      `}
  }

  &:active {
    ${({ disabled, isLoading, variant }) =>
      !disabled &&
      !isLoading &&
      css`
        background-color: ${buttonVariants[variant].active};
      `}
  }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); background-color: #ff5c63; }
  50% { transform: translateX(4px); background-color: #ff5c63; }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;

const buttonVariants = {
  primary: {
    background: "#f0f0f0",
    color: "#2d2d2d",
    hover: "#a3a3a3",
    active: "#a3a3a3",
  },
  secondary: {
    background: "#2d2d2d",
    color: "#f0f0f0",
    hover: "#1a1b1d",
    active: "#1a1b1d",
  },

} as const;

export type MyButtonVariant = keyof typeof buttonVariants;

export interface StyledMyButtonProps {
  variant: MyButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  hasFailed?: boolean;
  fontSize?:string
}
