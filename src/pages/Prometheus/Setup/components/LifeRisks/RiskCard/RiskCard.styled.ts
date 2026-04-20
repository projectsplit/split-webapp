import styled, { css } from 'styled-components';
import type { RiskVariant } from '../risks.data';

export const Outer = styled.div`
  position: relative;
`;

export const Glow = styled.div<{ $variant: RiskVariant }>`
  position: absolute;
  inset: -2px;
  border-radius: 0.75rem;
  filter: blur(12px);
  opacity: ${({ $variant }) => ($variant === 'primary' ? 0.2 : 0.1)};
  background: linear-gradient(
    to bottom right,
    rgba(255, 180, 171, ${({ $variant }) => ($variant === 'primary' ? 0.3 : 0.2)}),
    transparent
  );
  transition: opacity 1s ease;
  pointer-events: none;

  ${Outer}:hover & {
    opacity: ${({ $variant }) => ($variant === 'primary' ? 0.4 : 0.3)};
  }
`;

export const Card = styled.div<{ $variant: RiskVariant }>`
  position: relative;
  background: #353535;
  padding: 1.5rem;
  border-radius: 0.75rem;
  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          border: 1px solid rgba(255, 180, 171, 0.2);
        `
      : css`
          border: 1px solid rgba(255, 180, 171, 0.1);
        `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconDisk = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 180, 171, 0.1);
  color: #ffb4ab;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
  }
`;

export const CardTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: #e2e2e2;
  margin: 0;
`;

export const PresetTag = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: rgba(207, 194, 214, 0.4);
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const DurationRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const DurationInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #e2e2e2;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.875rem;
  text-align: center;
`;
