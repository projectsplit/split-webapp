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
  height: 85vh;
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
    width: min(90vw, 72rem);
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
  width: 100%;

  @media (min-width: 1024px) {
    padding: 1.5rem 3rem 1rem;
  }
`;

export const DrawerTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #e5e2e1;
  margin: 0 0 0.25rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const DrawerSubtitle = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #968e99;
  text-transform: uppercase;
  margin: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 0.5rem;
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
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  width: 100%;

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

export const DrawerGrid = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 8fr 4fr;
  }
`;

export const DrawerLeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DrawerRightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

type AccentColor = 'secondary' | 'primary' | 'tertiary';

const accentColors: Record<AccentColor, string> = {
  secondary: '#4ae176',
  primary: '#ddb7ff',
  tertiary: '#f9bb4d',
};

export const GlassPanel = styled.section<{ $accent?: AccentColor }>`
  background: rgba(28, 27, 27, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ $accent }) => accentColors[$accent ?? 'primary']};
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const PanelSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

export const PanelSectionIcon = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color ?? '#ddb7ff'};
  display: flex;
  align-items: center;

  svg {
    font-size: 1.25rem;
  }
`;

export const PanelSectionLabel = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #e5e2e1;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    letter-spacing: 0.1em;
  }
`;

export const SplitDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const SplitLabel = styled.span<{ $color?: string }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: ${({ $color }) => $color ?? '#e5e2e1'};
`;

export const SplitBar = styled.div`
  height: 1rem;
  width: 100%;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

export const SplitSegment = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  transition: width 0.2s ease;
`;

export const ExpenseCutDisplay = styled.div`
  margin-top: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  letter-spacing: 0.05em;
  color: #968e99;
  text-align: right;
`;

export const RunButton = styled.button`
  background: #ddb7ff;
  color: #40215e;
  border: none;
  border-radius: 0.25rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.625rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(221, 183, 255, 0.2);
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #f0daff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
    padding: 0.75rem 2rem;
    gap: 0.5rem;

    svg {
      font-size: 1.25rem;
    }
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseOrb = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

export const RiskLoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  gap: 1.5rem;
`;

export const RiskLoadingOrb = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(249, 187, 77, 0.15),
    rgba(249, 187, 77, 0.03)
  );
  border: 1px solid rgba(249, 187, 77, 0.1);
  animation: ${pulseOrb} 2s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.25rem;
    color: rgba(249, 187, 77, 0.4);
  }
`;

export const RiskLoadingLabel = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(249, 187, 77, 0.5);
  margin: 0;
`;

export const RiskSkeletonCard = styled.div`
  height: 5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(249, 187, 77, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
`;

export const RiskSkeletonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;
