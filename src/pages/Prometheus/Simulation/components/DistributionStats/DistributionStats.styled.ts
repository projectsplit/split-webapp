import styled, { css, keyframes } from 'styled-components';

/* ─── Grid & Stat Cards ─── */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled.div<{ $active?: boolean }>`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $active }) =>
    $active &&
    css`
      border-color: rgba(221, 183, 255, 0.35);
      background: rgba(221, 183, 255, 0.06);
      box-shadow: 0 0 24px -6px rgba(221, 183, 255, 0.15);
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 640px) {
    padding: 2rem;
    min-height: 180px;
  }
`;

export const StatLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #a1a1aa;
  margin: 0 0 0.25rem;
  letter-spacing: -0.01em;
`;

export const StatValue = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.01em;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

export const StatFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;

  svg {
    font-size: 0.875rem;
  }
`;

export const RuinCardInner = styled.div`
  position: relative;
  z-index: 1;
`;

export const RuinRing = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 5rem;
  height: 5rem;

  @media (min-width: 640px) {
    top: 1.5rem;
    right: 1.5rem;
    width: 6rem;
    height: 6rem;
  }
`;

export const RuinBadge = styled.span`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background: rgba(221, 183, 255, 0.1);
  border: 1px solid rgba(221, 183, 255, 0.2);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #ddb7ff;
`;

/* ─── Explanation Panel ─── */

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 600px;
  }
`;

export const ExplainerWrapper = styled.div`
  margin-top: 1.5rem;
  animation: ${slideIn} 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  overflow: hidden;
`;

export const ExplainerCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1.5rem;
  padding: 2rem 2.25rem 2rem 2.25rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    pointer-events: none;
    background: radial-gradient(
      ellipse at top left,
      rgba(221, 183, 255, 0.04) 0%,
      transparent 60%
    );
  }
`;

export const ExplainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

export const ExplainerTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ddb7ff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  letter-spacing: -0.01em;
`;

export const ExplainerCloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #a1a1aa;
  cursor: pointer;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(221, 183, 255, 0.3);
    color: #ddb7ff;
    transform: scale(1.05);
  }

  svg {
    font-size: 1rem;
  }
`;

export const ExplainerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ExplainerParagraph = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.7;
  color: #c4c4cc;
  margin: 0;
`;

export const ExplainerHighlight = styled.span`
  color: #ffffff;
  font-weight: 600;
`;

export const ExplainerAccent = styled.span`
  color: #ddb7ff;
  font-weight: 600;
`;

export const ExplainerDivider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(221, 183, 255, 0.15) 50%,
    transparent 100%
  );
  margin: 0.25rem 0;
`;

export const ExplainerCallout = styled.div`
  background: rgba(221, 183, 255, 0.04);
  border-left: 2px solid rgba(221, 183, 255, 0.3);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 0.875rem 1.125rem;
  font-size: 0.85rem;
  line-height: 1.65;
  color: #d4d4dc;
`;
