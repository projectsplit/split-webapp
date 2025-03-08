import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MyButtonVariant, StyledMyButton } from './StyledMyButton';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid #26272B;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  transform: translate(-50%, -50%);
`;

const MyButton = ({
  children,
  variant = 'primary',
  disabled ,
  isLoading ,
  hasFailed ,
  onClick,
  primaryBackgroundColor,
  ...props
}: MyButtonProps) => {
  return (
    <StyledMyButton
      variant={variant}
      disabled={disabled}
      isLoading={isLoading}
      hasFailed={hasFailed}
      onClick={onClick}
      {...props}
    >
      {isLoading && <Spinner />}
      <span style={{ opacity: isLoading ? 0 : 1 }}>
        {children}
      </span>
    </StyledMyButton>
  );
};

export default MyButton;

interface MyButtonProps {
  variant?: MyButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  hasFailed?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  primaryBackgroundColor?:string;
}