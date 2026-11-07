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

const easeOut = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

export const StyledScene = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

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

  /* As large as the stage allows, never stretched. The capture goes on below the crop, so it fades
     out there rather than ending on a hard edge. */
  .screen {
    position: relative;
    display: block;
    min-width: 0;
    min-height: 0;
    max-width: 100%;
    max-height: 100%;
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.sheet};
    -webkit-mask-image: linear-gradient(to bottom, #000 76%, transparent);
    mask-image: linear-gradient(to bottom, #000 76%, transparent);
    user-select: none;
    opacity: 0;
    transform: translateY(14px);
  }

  &.active .screen {
    animation: ${rise} 520ms ${easeOut} both;
  }

  @media (prefers-reduced-motion: reduce) {
    .screen {
      opacity: 1;
      transform: none;
    }

    &.active .screen {
      animation: none;
    }
  }
`;
