import styled from 'styled-components';

export const Select = styled.select`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: #e2e2e2;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.875rem;
  appearance: none;
  cursor: pointer;

  option {
    background: #131313;
    color: #e2e2e2;
  }
`;

export const TrailingIcon = styled.span`
  color: rgba(207, 194, 214, 0.4);
  pointer-events: none;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;

  svg {
    font-size: 1.125rem;
  }
`;
