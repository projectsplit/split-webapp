import styled, { keyframes } from 'styled-components';

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 60;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

export const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 70;
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(100%)')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    transform 0.5s cubic-bezier(0.32, 0.72, 0, 1),
    opacity 0.3s ease;
  background: rgba(28, 27, 27, 0.95);
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem 1.5rem 0 0;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.5);

  @media (min-width: 1024px) {
    top: 50%;
    left: 50%;
    bottom: auto;
    right: auto;
    transform: ${({ $open }) =>
      $open
        ? 'translate(-50%, -50%) scale(1)'
        : 'translate(-50%, -40%) scale(0.95)'};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition:
      transform 0.35s cubic-bezier(0.32, 0.72, 0, 1),
      opacity 0.25s ease;
    width: min(90vw, 56rem);
    height: auto;
    max-height: 85vh;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  }
`;

export const Handle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  cursor: pointer;

  &::after {
    content: '';
    width: 4rem;
    height: 0.375rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.03);

  @media (min-width: 1024px) {
    padding: 1.5rem 2rem 1rem;
  }
`;

export const DrawerTitleBlock = styled.div``;

export const DrawerTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e5e2e1;
  margin: 0 0 0.25rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const DrawerSubtitle = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ddb7ff;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #e5e2e1;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ddb7ff;
  }

  svg {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem 2rem;

  @media (min-width: 1024px) {
    padding: 1.5rem 2rem 2rem;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  svg {
    font-size: 1rem;
    color: #ddb7ff;
  }
`;

export const CategoryLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(221, 183, 255, 0.8);
`;

export const FactorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;

export const FactorButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.03);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition: all 0.15s ease;
  text-align: left;

  &:hover:not([disabled]) {
    background: rgba(221, 183, 255, 0.1);
    border-color: rgba(221, 183, 255, 0.3);
  }

  svg {
    color: #968e99;
    font-size: 1rem;
    margin-bottom: 0.375rem;
  }

  &:hover:not([disabled]) svg {
    color: #ddb7ff;
  }
`;

export const FactorName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: #e5e2e1;
  font-weight: 500;
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseOrb = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 2rem;
`;

export const LoadingOrb = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(221, 183, 255, 0.15),
    rgba(221, 183, 255, 0.03)
  );
  border: 1px solid rgba(221, 183, 255, 0.1);
  animation: ${pulseOrb} 2s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5rem;
    color: rgba(221, 183, 255, 0.4);
  }
`;

export const LoadingLabel = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(221, 183, 255, 0.5);
  margin: 0;
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SkeletonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SkeletonBar = styled.div<{ $width?: string }>`
  height: 0.625rem;
  width: ${({ $width }) => $width ?? '100%'};
  border-radius: 0.25rem;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(221, 183, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
`;

export const SkeletonCard = styled.div`
  height: 2.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(221, 183, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
`;
