import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  MyButtonSize,
  MyButtonVariant,
  StyledMyButton,
} from './StyledMyButton';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
interface SpinnerProps {
  variant: string;
}
export const Spinner = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'selected',
})<SpinnerProps>`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid
    ${({ theme, variant }) =>
      variant === 'secondary' ? theme.ink.secondary : theme.surface.raised};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  transform: translate(-50%, -50%);
`;

const MyButton = ({
  children,
  variant = 'primary',
  size = 'default',
  disabled,
  isLoading,
  hasFailed,
  onClick,
  fontSize,
  style,
}: MyButtonProps) => {
  return (
    <StyledMyButton
      variant={variant}
      size={size}
      disabled={disabled}
      isLoading={isLoading}
      hasFailed={hasFailed}
      onClick={onClick}
      fontSize={fontSize}
      style={style}
    >
      {isLoading && <Spinner variant={variant} />}
      <span style={{ opacity: isLoading ? 0 : 1 }}>{children}</span>
    </StyledMyButton>
  );
};

export default MyButton;

interface MyButtonProps {
  variant?: MyButtonVariant;
  size?: MyButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  hasFailed?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  primaryBackgroundColor?: string;
  fontSize?: string;
  style?: React.CSSProperties;
}
