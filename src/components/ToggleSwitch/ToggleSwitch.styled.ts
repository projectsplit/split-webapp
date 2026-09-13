import styled from 'styled-components';

export const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 30px;
  flex-shrink: 0;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.direction.owed};
  }

  &:checked + span:before {
    background-color: ${({ theme }) => theme.ink.primary};
    transform: translateX(22px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.surface.dot};

  &:before {
    position: absolute;
    content: '';
    height: 24px;
    width: 24px;
    left: 3px;
    bottom: 3px;
    background-color: ${({ theme }) => theme.ink.secondary};
    transition: 0.4s;
    border-radius: ${({ theme }) => theme.radius.pill};
  }
`;
