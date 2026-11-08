import styled, { keyframes } from 'styled-components';

const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

// On translate rather than transform, so it adds to the rise and the tilt instead of replacing them.
const float = keyframes`
  0%, 100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -6px;
  }
`;

const easeOut = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

/* Every size and gap is a share of the scene's width, and the scene is no wider than the stage's
   height can hold (--ratio is each scene's width to its height), so a short screen gets the same
   picture, smaller. Browsers without container units take the first width. */
export const StyledScene = styled.div`
  position: relative;
  box-sizing: border-box;
  width: min(100%, 340px);
  width: min(100%, 340px, calc(100cqh * var(--ratio)));
  display: flex;
  flex-direction: column;
  align-items: center;

  /* A soft light behind the picture, in the "you" accent. */
  &::before {
    content: '';
    position: absolute;
    inset: -6% -4%;
    background: radial-gradient(
      closest-side,
      ${({ theme }) => theme.accent.you.tint},
      transparent
    );
    pointer-events: none;
  }

  .piece {
    position: relative;
    display: block;
    height: auto;
    filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.5));
    user-select: none;
    opacity: 0;
    transform: translateY(14px);
  }

  &.active .piece {
    animation: ${rise} 520ms ${easeOut} both;
  }

  &.active .piece:nth-child(2) {
    animation-delay: 90ms;
  }

  &.active .piece:nth-child(3) {
    animation-delay: 180ms;
  }

  &.active .piece:nth-child(4) {
    animation-delay: 270ms;
  }

  &.welcome {
    --ratio: 1.06;
    aspect-ratio: 1.06;
    justify-content: center;

    .appIcon {
      width: 26%;
      border-radius: 22%;
      filter: none;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.08),
        0 18px 48px rgba(225, 81, 238, 0.28);
    }

    .floater {
      position: absolute;
    }

    .coffee {
      top: 2%;
      left: -2%;
      width: 60%;
      rotate: -5deg;
    }

    .budget {
      top: 12%;
      right: -3%;
      width: 50%;
      rotate: 4deg;
    }

    .owed {
      bottom: 4%;
      left: 3%;
      width: 68%;
      rotate: -2deg;
    }

    &.active .coffee {
      animation:
        ${rise} 520ms ${easeOut} 90ms both,
        ${float} 6s ease-in-out 700ms infinite;
    }

    &.active .budget {
      animation:
        ${rise} 520ms ${easeOut} 180ms both,
        ${float} 7s ease-in-out 900ms infinite;
    }

    &.active .owed {
      animation:
        ${rise} 520ms ${easeOut} 270ms both,
        ${float} 6.5s ease-in-out 1100ms infinite;
    }
  }

  &.ledger {
    --ratio: 1.42;

    .row {
      width: 100%;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
    }

    .row + .row {
      margin-top: 3%;
    }
  }

  &.sharing {
    --ratio: 1.6;

    .debts {
      align-self: flex-start;
      width: 90%;
    }

    .groupRow {
      align-self: flex-end;
      width: 84%;
      margin-top: -5%;
      rotate: 1.5deg;
    }
  }

  &.budgets {
    --ratio: 1.2;

    .budgetCard {
      align-self: flex-end;
      width: 88%;
    }

    /* Over the card's empty bottom left, clear of its bar and of the cap on the right. */
    .chart {
      align-self: flex-start;
      width: 62%;
      margin-top: -4%;
      rotate: -1.5deg;
    }
  }

  &.notifications {
    --ratio: 1.36;

    .reviewRow {
      width: 100%;
    }

    .reviewRow + .reviewRow {
      align-self: flex-end;
      width: 92%;
      margin-top: 3%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .piece {
      opacity: 1;
      transform: none;
    }

    &.active .piece,
    &.welcome.active .floater {
      animation: none;
    }
  }
`;
