import styled from 'styled-components';

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const Track = styled.div<{ $checked: boolean }>`
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  position: relative;
  background: ${({ $checked }) => ($checked ? '#ddb7ff' : '#353535')};
  transition: background 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid #d1d5db;
    transition: transform 0.2s ease;
    transform: ${({ $checked }) =>
      $checked ? 'translateX(1.25rem)' : 'translateX(0)'};
  }
`;
