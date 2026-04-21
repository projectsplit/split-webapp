import styled from 'styled-components';

export const TitleInput = styled.input`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: #e2e2e2;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  min-width: 0;
  width: 100%;

  &::placeholder {
    color: rgba(226, 226, 226, 0.35);
  }

  &:focus {
    border-bottom: 1px dashed rgba(255, 180, 171, 0.4);
  }
`;

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: rgba(207, 194, 214, 0.4);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: #ffb4ab;
    background: rgba(255, 180, 171, 0.08);
  }

  svg {
    font-size: 1rem;
  }
`;
