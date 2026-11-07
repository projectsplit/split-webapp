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

const grow = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const easeOut = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

export const StyledScene = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  height: 100%;
  max-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.s12};

  /* A soft light behind the picture, in the "you" accent. */
  &::before {
    content: '';
    position: absolute;
    inset: 6% 0;
    background: radial-gradient(
      closest-side,
      ${({ theme }) => theme.accent.you.tint},
      transparent
    );
    pointer-events: none;
  }

  > * {
    position: relative;
  }

  .piece {
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

  .card {
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
  }

  .name {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
  }

  .sub {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
    white-space: nowrap;
  }

  .money {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s14};
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
  }

  .youInk {
    color: ${({ theme }) => theme.accent.you.inkRow};
  }

  .owedInk {
    color: ${({ theme }) => theme.direction.owed};
  }

  .oweInk {
    color: ${({ theme }) => theme.direction.owe};
  }

  .glyph {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.icon.sm};
  }

  .avatars {
    display: flex;
    flex-shrink: 0;
  }

  .avatar {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    margin-left: -8px;
    border-radius: ${({ theme }) => theme.radius.pill};
    border: 2px solid ${({ theme }) => theme.surface.card};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};

    &:first-child {
      margin-left: 0;
    }

    &.you {
      background-color: ${({ theme }) => theme.accent.you.tint};
      color: ${({ theme }) => theme.accent.you.ink};
      font-size: ${({ theme }) => theme.size.s12};
    }
  }

  .bar {
    display: block;
    width: 100%;
    height: 6px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    overflow: hidden;

    > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background-color: ${({ theme }) => theme.accent.you.fill};
    }

    &.big {
      height: 8px;
    }
  }

  .line {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .cardHead {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
  }

  &.welcome {
    .appIcon {
      width: 88px;
      height: 88px;
      border-radius: 22px;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.08),
        0 18px 48px rgba(225, 81, 238, 0.28);
    }

    .floater {
      position: absolute;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.s10};
      padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s12}`};
    }

    .coffee {
      top: 8%;
      left: 0;
      rotate: -5deg;
    }

    .budget {
      top: 24%;
      right: 0;
      width: 132px;
      flex-direction: column;
      align-items: stretch;
      gap: ${({ theme }) => theme.space.s8};
      rotate: 4deg;
    }

    .owed {
      bottom: 8%;
      left: 10%;
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
    .list {
      width: 100%;
      padding-bottom: ${({ theme }) => theme.space.s4};
    }

    .listHead {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: ${({ theme }) =>
        `${theme.space.s14} ${theme.space.s16} ${theme.space.s10}`};
    }

    .total {
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.figure.summary};
      color: ${({ theme }) => theme.ink.primary};
    }

    .row {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.s12};
      padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s16}`};
      border-top: 1px solid ${({ theme }) => theme.surface.hairline};
    }

    .rowText {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s2};
    }

    .sub.share {
      color: ${({ theme }) => theme.accent.you.ink};
    }

    .rowAmount {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: ${({ theme }) => theme.space.s2};
    }
  }

  &.sharing {
    gap: ${({ theme }) => theme.space.s14};

    .card {
      width: 92%;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s10};
      padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
    }

    .group {
      align-self: flex-start;
    }

    .quick {
      align-self: flex-end;
    }

    .cardHead .name {
      flex: 1;
    }

    .groupGlyph {
      background-color: oklch(0.62 0.15 258 / 0.18);
      color: ${({ theme }) => theme.accent.group.ink};
    }

    .tag {
      flex-shrink: 0;
      padding: ${({ theme }) => `${theme.space.s3} ${theme.space.s8}`};
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.size.s11};
    }
  }

  &.budgets {
    gap: ${({ theme }) => theme.space.s14};

    .budgetCard {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s10};
      padding: ${({ theme }) => theme.space.s16};
    }

    .cardHead {
      justify-content: space-between;
    }

    .figures {
      display: flex;
      align-items: baseline;
      gap: ${({ theme }) => theme.space.s8};
    }

    .figure {
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.figure.page};
      letter-spacing: -0.02em;
      color: ${({ theme }) => theme.ink.primary};
    }

    .chart {
      width: 100%;
      height: 104px;
      display: flex;
      align-items: stretch;
      gap: ${({ theme }) => theme.space.s10};
      padding: ${({ theme }) =>
        `${theme.space.s14} ${theme.space.s16} ${theme.space.s10}`};
    }

    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${({ theme }) => theme.space.s6};
    }

    .columnTrack {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: flex-end;
    }

    .columnBar {
      width: 100%;
      border-radius: 6px 6px 3px 3px;
      background-color: ${({ theme }) => theme.chart.spentBar};
      transform-origin: bottom;
    }

    .column:nth-child(6) .columnBar {
      background-color: ${({ theme }) => theme.accent.you.fill};
    }

    .columnDay {
      font-size: ${({ theme }) => theme.size.s10};
      color: ${({ theme }) => theme.ink.tertiary};
    }

    &.active .columnBar {
      animation: ${grow} 600ms ${easeOut} 260ms both;
    }

    &.active .column:nth-child(even) .columnBar {
      animation-delay: 330ms;
    }
  }

  &.notifications {
    gap: ${({ theme }) => theme.space.s10};

    .notification {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: ${({ theme }) => theme.space.s12};
      padding: ${({ theme }) => theme.space.s14};
      border-radius: ${({ theme }) => theme.radius.sheet};
      background-color: ${({ theme }) => theme.surface.raised};
      border: 1px solid ${({ theme }) => theme.surface.outline};
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
    }

    .appGlyph {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.accent.group.fill};
      color: ${({ theme }) => theme.ink.primary};
      font-size: ${({ theme }) => theme.icon.sm};
    }

    .notificationText {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s3};
    }

    .notificationTop {
      display: flex;
      align-items: baseline;
      gap: ${({ theme }) => theme.space.s6};
    }

    .appName {
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .flow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: ${({ theme }) => theme.radius.pill};
      border: 1px dashed ${({ theme }) => theme.surface.outline};
      color: ${({ theme }) => theme.accent.you.ink};
      font-size: ${({ theme }) => theme.icon.sm};
    }

    .reviewRow {
      width: 100%;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.s12};
      padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
      border-color: ${({ theme }) => theme.accent.you.tintBorder};
    }

    .tick {
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.lg};
      color: ${({ theme }) => theme.accent.you.fill};
    }

    .reviewText {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s6};
    }

    .chips {
      display: flex;
      gap: ${({ theme }) => theme.space.s6};
    }

    .chip {
      padding: ${({ theme }) => `${theme.space.s3} ${theme.space.s8}`};
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.size.s11};
    }

    /* Told as it happens: the notification, then where it goes, then the expense it becomes. */
    &.active .piece:nth-child(2) {
      animation-delay: 380ms;
    }

    &.active .piece:nth-child(3) {
      animation-delay: 700ms;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .piece {
      opacity: 1;
      transform: none;
    }

    &.active .piece,
    &.welcome.active .floater,
    &.budgets.active .columnBar {
      animation: none;
    }
  }
`;
