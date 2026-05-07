import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Panel = styled.section`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    padding: 1.75rem 2rem;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  svg {
    color: #ddb7ff;
    font-size: 1.125rem;
  }
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e5e2e1;
`;

export const Section = styled.div<{ $tone?: 'header' | 'body' | 'conclusion' }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: ${fadeUp} 0.4s ease;
`;

export const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  svg {
    font-size: 0.875rem;
  }
`;

export const HeaderLabel = styled(SectionLabel)`
  color: rgba(221, 183, 255, 0.85);

  svg {
    color: #ddb7ff;
  }
`;

export const BodyLabel = styled(SectionLabel)`
  color: rgba(74, 225, 118, 0.85);

  svg {
    color: #4ae176;
  }
`;

export const ConclusionLabel = styled(SectionLabel)`
  color: rgba(249, 187, 77, 0.85);

  svg {
    color: #f9bb4d;
  }
`;

export const HeaderText = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: #e5e2e1;
  letter-spacing: -0.005em;

  & + & {
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const ConclusionText = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #cdc3d0;

  & + & {
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
`;

export const BodyList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.625rem 1.25rem;
  }
`;

export const BodyItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.025);
    border-color: rgba(255, 255, 255, 0.05);
  }
`;

export const BodyIcon = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.125rem;
  color: ${({ $color }) => $color ?? '#968e99'};

  svg {
    font-size: 0.9375rem;
  }
`;

export const BodyText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: #cdc3d0;
  word-break: break-word;
  min-width: 0;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const FactorBlock = styled.div`
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem 1.5rem;
  }
`;

export const FactorEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
`;

export const FactorTitle = styled.h4`
  margin: 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(221, 183, 255, 0.7);
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    font-size: 0.75rem;
    color: rgba(221, 183, 255, 0.5);
  }
`;

export const FactorLine = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #b8aebc;
`;
