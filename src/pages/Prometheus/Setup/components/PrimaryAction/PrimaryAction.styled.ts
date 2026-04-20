import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 6rem;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 100%;
  max-width: 32rem;
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 0.5rem;
  background: #ddb7ff;
  color: #490080;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1.125rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: 0 25px 50px -12px rgba(221, 183, 255, 0.3);
  transition:
    filter 0.2s ease,
    transform 0.2s ease;

  svg {
    font-size: 1.375rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:hover svg {
    transform: translateX(0.25rem);
  }

  &:active {
    transform: scale(0.95);
  }
`;
