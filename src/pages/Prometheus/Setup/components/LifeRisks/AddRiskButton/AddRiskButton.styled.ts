import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 1rem 0;
  background: transparent;
  border: 2px dashed rgba(77, 67, 84, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #cfc2d6;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  svg {
    font-size: 0.875rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ddb7ff;
    border-color: rgba(221, 183, 255, 0.4);
  }

  &:hover svg {
    transform: rotate(90deg);
  }
`;

export const Label = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;
