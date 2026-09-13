import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledHomepage = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.ink.primary};
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .fadeIn {
    animation: ${fadeIn} 0.3s ease-out;
    display: contents;
  }

  > div[style*='position: fixed'] {
    z-index: 1;
  }

  .actions {
    position: fixed;
    bottom: 28px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.ink.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.fab};
    transition: transform 0.3s ease;

    .thunder {
      font-size: ${({ theme }) => theme.icon.lg};
      color: ${({ theme }) => theme.surface.page};
    }

    &.glow {
      transform: scale(1.08);
    }
  }
`;
