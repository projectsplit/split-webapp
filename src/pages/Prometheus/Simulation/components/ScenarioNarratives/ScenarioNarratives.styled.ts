import styled, { css } from 'styled-components';

export const NarrativesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const cardBase = css`
  padding: 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
`;

export const ScenarioCard = styled.div<{ $variant: 'best' | 'difficult' | 'rough' | 'nightmare' }>`
  ${cardBase}

  background: rgba(42, 42, 42, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);

  ${({ $variant }) =>
    $variant === 'nightmare' &&
    css`
      background: #0a0a0a;
      border-color: rgba(239, 68, 68, 0.2);
      box-shadow: 0 0 30px -10px rgba(255, 0, 0, 0.15);
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 60%);
        pointer-events: none;
      }
    `}

  &:hover {
    ${({ $variant }) => {
      switch ($variant) {
        case 'best':
          return css`
            border-color: rgba(221, 183, 255, 0.5);
            box-shadow: 0 0 20px -5px rgba(221, 183, 255, 0.2);
          `;
        case 'difficult':
          return css`
            border-color: rgba(249, 187, 77, 0.5);
            box-shadow: 0 0 20px -5px rgba(249, 187, 77, 0.2);
          `;
        case 'rough':
          return css`
            border-color: rgba(255, 180, 171, 0.5);
            box-shadow: 0 0 20px -5px rgba(255, 180, 171, 0.2);
          `;
        case 'nightmare':
          return css`
            border-color: rgba(239, 68, 68, 1);
            box-shadow: 0 0 40px -5px rgba(255, 0, 0, 0.3);
          `;
      }
    }}

    transform: translateY(-2px);
  }
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const CardTitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconBox = styled.div<{ $bg: string; $color: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  svg {
    color: ${({ $color }) => $color};
    font-size: 1.25rem;
  }

  ${ScenarioCard}:hover & {
    transform: scale(1.1);
  }
`;

export const PercentileLabel = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin-bottom: 0.125rem;
`;

export const CardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e2e2;
  margin: 0;
  transition: color 0.2s ease;
`;

export const NarrativeText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #cdc3d0;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-style: italic;
`;

export const CornerIcon = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color ?? 'rgba(150, 142, 153, 0.3)'};
  transition: color 0.2s ease;
  display: flex;

  svg {
    font-size: 1.25rem;
  }
`;
