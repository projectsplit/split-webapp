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
  color: ${({ theme }) => theme.lightColor};
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
    z-index: 1; /* Ensure fixed children (background) are above */
  }
  .fixedTop {
   padding-left: 14px;
    padding-right: 14px;
  }

  .welcomeStripe {
    font-size: 15px;
    padding: 1rem 0 1rem 0;
    white-space: initial;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  /* Sits up here rather than at the foot of the page: the content below fills the screen and
     scrolls, and the bottom right corner already belongs to the quick actions button.

     Deliberately quiet — outlined, muted, small. It is the door that is always open, so it has no
     work to do beyond being findable; anything louder would turn the whole screen into an ask. */
  .supportButton {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.greyOutline};
    background-color: transparent;
    font-family: inherit;
    font-size: 13px;
    color: ${({ theme }) => theme.textInactiveColor};
    cursor: pointer;
    transition:
      border-color 150ms,
      color 150ms;

    .heart {
      font-size: 13px;
      color: ${({ theme }) => theme.pink};
    }

    &:hover {
      border-color: ${({ theme }) => theme.pink};
      color: ${({ theme }) => theme.primaryTextColor};
    }
  }

  .actions {
    position: fixed;
    bottom: 40px;
    right: 25px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.pinkish};
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    cursor: pointer;
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;
    box-shadow: 0 0 10px ${({ theme }) => theme.pinkish};
    will-change: box-shadow;
    overflow: hidden; /* clips glow to circular boundary */
    border-radius: 50%;

    .thunder {
      font-size: 30px;
      color: white;
    }

    &.glow {
      animation: glowRandom 2.5s infinite ease-in-out;
      transform: scale(1.08);
    }
  }

  @keyframes glowRandom {
    0% {
      box-shadow:
        0 0 10px ${({ theme }) => theme.pinkish},
        2px -2px 15px ${({ theme }) => theme.pinkish},
        -3px 3px 20px ${({ theme }) => theme.pinkish};
    }
    20% {
      box-shadow:
        -2px 1px 12px ${({ theme }) => theme.pinkish},
        3px -3px 18px ${({ theme }) => theme.pinkish},
        1px 2px 25px ${({ theme }) => theme.pinkish};
    }
    40% {
      box-shadow:
        3px 2px 10px ${({ theme }) => theme.pinkish},
        -2px -3px 20px ${({ theme }) => theme.pinkish},
        0 0 15px ${({ theme }) => theme.pinkish};
    }
    60% {
      box-shadow:
        -3px -1px 12px ${({ theme }) => theme.pinkish},
        2px 3px 18px ${({ theme }) => theme.pinkish},
        0 0 20px ${({ theme }) => theme.pinkish};
    }
    80% {
      box-shadow:
        2px 3px 10px ${({ theme }) => theme.pinkish},
        -1px -2px 18px ${({ theme }) => theme.pinkish},
        1px 1px 25px ${({ theme }) => theme.pinkish};
    }
    100% {
      box-shadow:
        0 0 10px ${({ theme }) => theme.pinkish},
        2px -2px 15px ${({ theme }) => theme.pinkish},
        -3px 3px 20px ${({ theme }) => theme.pinkish};
    }
  }
`;
