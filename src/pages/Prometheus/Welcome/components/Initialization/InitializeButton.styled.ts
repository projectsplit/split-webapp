import styled from 'styled-components';

export const ButtonShell = styled.button`
  position: relative;
  width: 100%;
  max-width: 28rem;
  padding: 1.25rem;
  border: none;
  border-radius: 0.25rem;
  background: #ddb7ff;
  color: #490080;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 900;
  letter-spacing: 0.2em;
  font-size: 0.875rem;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(221, 183, 255, 0.2);
  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background: #b76dff;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(100%);
  transition: transform 0.3s ease;

  ${ButtonShell}:hover & {
    transform: translateY(0);
  }
`;

export const Label = styled.span`
  position: relative;
`;
