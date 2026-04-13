import styled from 'styled-components';

export const TeaserWrapper = styled.section`
  position: relative;
  cursor: pointer;
  border-radius: 1.5rem;
  border: 1px solid rgba(221, 183, 255, 0.3);
  padding: 1.25rem 1.25rem 1.5rem;
  background: linear-gradient(to bottom right, #2a2a2a, #0e0e0e);
  box-shadow: 0 0 40px -10px rgba(74, 225, 118, 0.3);
  transition: border-color 0.3s ease;
`;

export const GlowOrb = styled.div<{ $position: 'top-right' | 'bottom-left' }>`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;

  ${({ $position }) =>
    $position === 'top-right'
      ? `
    top: -3rem;
    right: -3rem;
    width: 10rem;
    height: 10rem;
    background: rgba(221, 183, 255, 0.15);
    filter: blur(50px);
  `
      : `
    bottom: -3rem;
    left: -3rem;
    width: 6rem;
    height: 6rem;
    background: rgba(74, 225, 118, 0.1);
    filter: blur(35px);
  `}
`;

export const TeaserContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const TeaserLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  svg {
    font-size: 1.5rem;
    color: #ddb7ff;
  }

  span {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.625rem;
    font-weight: 900;
    color: #ddb7ff;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
`;

export const TeaserTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  line-height: 1.15;
  color: #e2e2e2;

  .highlight {
    color: #ddb7ff;
    font-style: italic;
  }
`;

export const TeaserDescription = styled.p`
  color: #cfc2d6;
  font-size: 0.75rem;
  margin: 0 0 1rem;
  max-width: 85%;
  line-height: 1.5;
`;

export const TeaserButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ddb7ff 0%, #b76dff 100%);
  color: #490080;
  font-weight: 900;
  padding: 0.875rem;
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 4px 12px rgba(183, 109, 255, 0.3);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition:
    filter 0.2s ease,
    transform 0.1s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  background: rgba(31, 31, 31, 0.6);
  border: 1px solid rgba(221, 183, 255, 0.15);
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #cfc2d6;
  transition:
    color 0.2s ease,
    background 0.2s ease;

  &:hover {
    color: #e2e2e2;
    background: rgba(31, 31, 31, 0.9);
  }

  svg {
    font-size: 1rem;
  }
`;
