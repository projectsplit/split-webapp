import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const StyledHome2 = styled.div`
  display: flex;
  flex-direction: column;
  color: #e2e2e2;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #0e0e0e;

  .fadeIn {
    animation: ${fadeIn} 0.3s ease-out;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
`;

export const ScrollableContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 1.5rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const WelcomeSection = styled.section`
  padding: 1rem 1.5rem 0;

  h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 900;
    color: #e2e2e2;
    letter-spacing: -0.02em;
    margin: 0 0 0.25rem;
  }

  p {
    font-size: 0.75rem;
    color: #cfc2d6;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin: 0;
  }
`;

export const FAB = styled.button<{ $isGlowing?: boolean }>`
  position: fixed;
  bottom: 40px;
  right: 24px;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ddb7ff 0%, #b76dff 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(183, 109, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:active {
    transform: scale(0.9);
  }

  svg {
    font-size: 30px;
    color: white;
  }

  ${({ $isGlowing }) =>
    $isGlowing &&
    `
    animation: glowRandom 2.5s infinite ease-in-out;
    transform: scale(1.08);
  `}

  @keyframes glowRandom {
    0% {
      box-shadow: 0 0 10px rgba(183, 109, 255, 0.6),
        2px -2px 15px rgba(183, 109, 255, 0.4),
        -3px 3px 20px rgba(183, 109, 255, 0.3);
    }
    50% {
      box-shadow: -3px -1px 12px rgba(183, 109, 255, 0.5),
        2px 3px 18px rgba(183, 109, 255, 0.4),
        0 0 25px rgba(183, 109, 255, 0.3);
    }
    100% {
      box-shadow: 0 0 10px rgba(183, 109, 255, 0.6),
        2px -2px 15px rgba(183, 109, 255, 0.4),
        -3px 3px 20px rgba(183, 109, 255, 0.3);
    }
  }
`;
