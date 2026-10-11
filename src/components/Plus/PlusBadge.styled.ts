import styled from 'styled-components';

export type PlusBadgeSize = 'sm' | 'md' | 'lg';

const metrics: Record<
  PlusBadgeSize,
  { height: string; padding: string; font: string; tracking: string }
> = {
  sm: { height: '18px', padding: '0 7px', font: '10px', tracking: '0.02em' },
  md: { height: '22px', padding: '0 9px', font: '12px', tracking: '0.01em' },
  lg: { height: '32px', padding: '0 15px', font: '17px', tracking: '-0.005em' },
};

/**
 * A small metal pill. The edge is a gradient stroke, bright at the top-left and fading out, so it
 * catches the light the way a machined bevel does; the face is a shallow dark gradient with a
 * one-pixel sheen along the top. The word itself is silver, brightest at the top.
 */
export const StyledPlusBadge = styled.span<{
  $size: PlusBadgeSize;
  $interactive: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  height: ${({ $size }) => metrics[$size].height};
  padding: ${({ $size }) => metrics[$size].padding};
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid transparent;
  background:
    linear-gradient(
        180deg,
        ${({ theme }) => theme.plus.fillTop} 0%,
        ${({ theme }) => theme.plus.fillBottom} 100%
      )
      padding-box,
    linear-gradient(
        155deg,
        ${({ theme }) => theme.plus.edgeStrong} 0%,
        ${({ theme }) => theme.plus.edgeSoft} 42%,
        ${({ theme }) => theme.plus.edgeSoft} 68%,
        ${({ theme }) => theme.plus.edgeMid} 100%
      )
      border-box;
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.plus.sheen},
    0 1px 2px rgba(0, 0, 0, 0.4);
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ $size }) => metrics[$size].font};
  font-weight: ${({ theme }) => theme.weight.semibold};
  letter-spacing: ${({ $size }) => metrics[$size].tracking};
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  /* Isolates the stacking so the text gradient below is clipped to the glyphs only. */
  isolation: isolate;

  .word {
    display: block;
    /* Nudges the baseline so the word sits optically centred in the pill. */
    transform: translateY(-0.5px);
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.plus.ink} 0%,
      ${({ theme }) => theme.plus.ink} 45%,
      ${({ theme }) => theme.plus.inkSoft} 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  /* A faint halo so the pill lifts off a card as well as off the page. */
  &::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    background: radial-gradient(
      ellipse at 50% 0%,
      ${({ theme }) => theme.plus.glow},
      transparent 70%
    );
    pointer-events: none;
    z-index: -1;
  }

  ${({ $interactive }) =>
    $interactive &&
    `
    transition: transform 120ms ease, filter 120ms ease;

    &:active {
      transform: scale(0.96);
      filter: brightness(1.15);
    }
  `}
`;
