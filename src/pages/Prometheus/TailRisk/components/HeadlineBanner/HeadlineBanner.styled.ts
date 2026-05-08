import styled from 'styled-components';

export const Banner = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const HeadRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-wrap: wrap;
`;

export const ArchetypeChip = styled.span<{ $tone: 'critical' | 'warning' | 'safe' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  ${({ $tone }) => {
    switch ($tone) {
      case 'critical':
        return `
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ffb4ab;
        `;
      case 'warning':
        return `
          background: rgba(249, 187, 77, 0.1);
          border: 1px solid rgba(249, 187, 77, 0.3);
          color: #f9bb4d;
        `;
      case 'safe':
        return `
          background: rgba(74, 225, 118, 0.08);
          border: 1px solid rgba(74, 225, 118, 0.25);
          color: #4ae176;
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cdc3d0;
        `;
    }
  }}

  svg {
    font-size: 0.875rem;
  }
`;

export const HeadlineText = styled.h1`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: #ddb7ff;
  letter-spacing: -0.005em;
`;

export const Accent = styled.div`
  height: 0.25rem;
  width: 6rem;
  background: rgba(221, 183, 255, 0.2);
  border-radius: 9999px;
`;

export const SubMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  flex-wrap: wrap;
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  strong {
    font-weight: 600;
    color: #e5e2e1;
  }
`;
