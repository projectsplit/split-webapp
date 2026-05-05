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

export const PanelGlow = styled.div<{ $color?: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 8rem;
  height: 8rem;
  background: ${({ $color }) => $color ?? 'rgba(74, 225, 118, 0.1)'};
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
`;

export const PanelIcon = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color ?? '#4ae176'};
  display: flex;
  align-items: center;

  svg {
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

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  min-width: 0;

  & > * {
    min-width: 0;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatItemLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #968e99;
  margin-bottom: 0.25rem;
`;

export const StatItemValue = styled.span<{ $color?: string }>`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ $color }) => $color ?? '#e5e2e1'};
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const StatItemUnit = styled.span`
  font-size: 1.25rem;
  opacity: 0.6;
`;

export const NetChangeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: rgba(28, 27, 27, 0.8);
  border-radius: 0.5rem;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

export const NetChangeLabel = styled.span`
  color: #968e99;
  font-size: 0.75rem;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const NetChangeBadge = styled.div<{ $improved: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: ${({ $improved }) =>
    $improved ? 'rgba(74, 225, 118, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${({ $improved }) => ($improved ? '#4ae176' : '#ef4444')};
  border: 1px solid
    ${({ $improved }) =>
      $improved ? 'rgba(74, 225, 118, 0.3)' : 'rgba(239, 68, 68, 0.3)'};

  svg {
    font-size: 0.875rem;
  }
`;

export const NetChangeDelta = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.05em;
`;
