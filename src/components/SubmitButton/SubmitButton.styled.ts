import styled from 'styled-components';
import { SubmitButtonProps } from '../../interfaces';

export const StyledSubmitButton = styled.button<SubmitButtonProps>`
  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  user-select: none;
  padding: 13px 20px;
  font-weight: ${({ theme }) => theme.weight.semibold};
  cursor: ${({ disabled }) => (disabled === true ? 'not-allowed' : 'pointer')};
  color: ${({ theme, color }) => (color ? color : theme.surface.page)};
  background-color: ${({ backgroundColor, theme, disabled }) =>
    backgroundColor
      ? backgroundColor
      : disabled !== true
        ? theme.ink.primary
        : theme.surface.page};
  display: flex;
  justify-content: center;
  position: relative;
  font-size: ${({ theme }) => theme.size.s15};

  &:hover {
    opacity: ${({ disabled }) => (disabled === true ? 1 : 0.75)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 1;
  }
`;
