import styled from 'styled-components';

export const Panel = styled.div`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const PanelGlow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8rem;
  height: 8rem;
  background: rgba(221, 183, 255, 0.05);
  filter: blur(48px);
  border-radius: 50%;
  margin: -4rem -4rem 0 0;
  pointer-events: none;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;

  svg {
    color: #ddb7ff;
    font-size: 1.25rem;
  }
`;

export const PanelTitle = styled.h3`
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

export const CompRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  min-width: 0;

  & > * {
    min-width: 0;
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const RowLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5rem;
  letter-spacing: 0.03em;
  color: #968e99;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 0.625rem;
    letter-spacing: 0.05em;
  }
`;

export const BaselineValue = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5rem;
  letter-spacing: 0.03em;
  color: #968e99;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    font-size: 0.625rem;
    letter-spacing: 0.05em;
  }
`;

type PillColor = 'secondary' | 'primary' | 'tertiary';

const pillColors: Record<PillColor, { bg: string; text: string }> = {
  secondary: { bg: 'rgba(74, 225, 118, 0.1)', text: '#4ae176' },
  primary: { bg: 'rgba(221, 183, 255, 0.1)', text: '#ddb7ff' },
  tertiary: { bg: 'rgba(249, 187, 77, 0.1)', text: '#f9bb4d' },
};

export const ScenarioValue = styled.span<{ $color?: PillColor }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5rem;
  letter-spacing: 0.03em;
  text-align: center;
  padding: 0.25rem 0;
  border-radius: 0.25rem;
  background: ${({ $color }) => pillColors[$color ?? 'secondary'].bg};
  color: ${({ $color }) => pillColors[$color ?? 'secondary'].text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 0.625rem;
    letter-spacing: 0.05em;
  }
`;
