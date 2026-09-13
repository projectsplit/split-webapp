import { css, keyframes, styled } from 'styled-components';

export const StyledMyButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['variant', 'isLoading', 'hasFailed', 'size'].includes(prop),
})<StyledMyButtonProps>`
  padding: ${({ size }) => (size === 'compact' ? '7px 14px' : '13px 20px')};
  font-weight: ${({ theme, size, variant }) =>
    size === 'compact' && variant === 'secondary'
      ? theme.weight.medium
      : theme.weight.semibold};
  border: 1px solid transparent;
  border-radius: ${({ theme, size }) =>
    size === 'compact' ? theme.radius.buttonSmall : theme.radius.button};
  font-size: ${({ theme, fontSize, size }) =>
    fontSize
      ? `${fontSize}px`
      : size === 'compact'
        ? theme.size.s13
        : theme.size.s15};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.ink.primary : 'transparent'};
  border-color: ${({ theme, variant }) =>
    variant === 'primary' ? 'transparent' : theme.surface.outline};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.surface.page : theme.ink.primary};
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

  &:hover,
  &:active {
    ${({ disabled, isLoading, variant, theme }) =>
      !disabled &&
      !isLoading &&
      css`
        background-color: ${variant === 'primary'
          ? theme.ink.secondary
          : theme.surface.raised};
      `}
  }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;

export type MyButtonVariant = 'primary' | 'secondary';
export type MyButtonSize = 'default' | 'compact';

interface StyledMyButtonProps {
  variant: MyButtonVariant;
  size?: MyButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  hasFailed?: boolean;
  fontSize?: string;
  style?: React.CSSProperties;
}
