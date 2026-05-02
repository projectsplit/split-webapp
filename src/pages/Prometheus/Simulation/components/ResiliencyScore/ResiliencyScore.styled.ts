import styled from 'styled-components';

export const ScoreWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ScoreCard = styled.div`
  background: rgba(42, 42, 42, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #353535;
  border-radius: 0.75rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (min-width: 1024px) {
    max-width: calc(50% - 0.75rem);
  }
`;

export const ScoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

export const ScoreHeaderLeft = styled.div``;

export const ScoreSubLabel = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: #968e99;
  margin-bottom: 0.25rem;
`;

export const ScoreTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e2e2;
  margin: 0;
`;

export const ScoreVerified = styled.span`
  color: #4ae176;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

export const ScoreCenter = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  gap: 0.75rem;
`;

export const ScoreNumber = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.75rem;
  font-weight: 700;
  color: #4ae176;
  line-height: 1;
`;

export const ScoreLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #4ae176;
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
`;

export const MetricBox = styled.div`
  background: rgba(10, 10, 10, 0.4);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
`;

export const MetricLabel = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #968e99;
  margin-bottom: 0.25rem;
`;

export const MetricValue = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e2e2;
`;
