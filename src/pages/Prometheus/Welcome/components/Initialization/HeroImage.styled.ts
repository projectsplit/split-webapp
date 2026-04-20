import styled from 'styled-components';

export const HeroWrapper = styled.div`
  width: 100%;
  height: 16rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
`;

export const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  opacity: 0.5;
  transition: transform 1s ease;

  ${HeroWrapper}:hover & {
    transform: scale(1.05);
  }
`;

export const HeroBottomFade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    #131313 0%,
    transparent 40%,
    transparent 100%
  );
`;

export const HeroColorWash = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(221, 183, 255, 0.05);
  mix-blend-mode: color;
`;
