import styled from 'styled-components';
import { fullScreenSurfaceStyles } from '@/styles/fullScreenSurface';

export const StyledWelcomeTourDialog = styled.div`
  ${fullScreenSurfaceStyles}
  padding-top: env(safe-area-inset-top);
  padding-bottom: max(
    env(safe-area-inset-bottom),
    ${({ theme }) => theme.space.s16}
  );
  outline: none;

  &.welcome-enter {
    opacity: 0;
  }

  &.welcome-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-out;
  }

  &.welcome-exit {
    opacity: 1;
  }

  &.welcome-exit-active {
    opacity: 0;
    transition: opacity 200ms ease-in;
  }

  .topBar {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    min-height: 44px;
    padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s16} 0`};
  }

  .skip {
    padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s8}`};
    border: none;
    background: none;
    color: ${({ theme }) => theme.ink.secondary};
    font-family: inherit;
    font-size: ${({ theme }) => theme.size.s15};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .track {
    flex: 1;
    min-height: 0;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .slide {
    box-sizing: border-box;
    flex: 0 0 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space.s20};
    padding: ${({ theme }) => `0 ${theme.space.s24}`};
    overflow-y: auto;
    scroll-snap-align: center;
    scroll-snap-stop: always;

    /* Centred in the height there is, by margins rather than justify-content, which on a short
       screen would push the top of the picture out of reach instead of letting it scroll. */
    > :first-child {
      margin-top: auto;
    }

    > :last-child {
      margin-bottom: auto;
    }
  }

  /* A size container, so a scene can be as large as the height left over from the words allows. */
  .stage {
    flex: 1 1 auto;
    min-height: 200px;
    max-height: 360px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    container-type: size;
  }

  .text {
    flex-shrink: 0;
    width: 100%;
    max-width: 420px;
    text-align: center;
  }

  .title {
    margin: 0 0 ${({ theme }) => theme.space.s10};
    font-size: 24px;
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: ${({ theme }) => theme.ink.primary};
    text-wrap: balance;

    /* The Plus mark follows the last word, so a title that wraps keeps it beside the words
       rather than out at the edge between the two lines. */
    > span {
      margin-left: ${({ theme }) => theme.space.s4};
      vertical-align: 0.2em;
    }
  }

  .body {
    margin: 0;
    font-size: ${({ theme }) => theme.size.s15};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .note {
    margin: ${({ theme }) => `${theme.space.s12} 0 0`};
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .controls {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    max-width: 468px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s14};
    padding: ${({ theme }) => `${theme.space.s16} ${theme.space.s24} 0`};
  }

  .dots {
    display: flex;
    justify-content: center;
  }

  /* A dot to see, inside a target large enough to tap. */
  .dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &::after {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.surface.dot};
      transition:
        width 200ms ease,
        background-color 200ms ease;
    }

    &.on::after {
      width: 18px;
      background-color: ${({ theme }) => theme.accent.you.fill};
    }
  }

  .status {
    margin: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.secondary};

    &.warning {
      color: ${({ theme }) => theme.direction.owe};
    }
  }

  .actions {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: ${({ theme }) => theme.space.s10};
  }

  /* A phone on its side has no room for the picture above the words, which matter more. */
  @media (max-height: 520px) {
    .stage {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &.welcome-enter-active,
    &.welcome-exit-active {
      transition: none;
    }

    .dot::after {
      transition: none;
    }
  }
`;
