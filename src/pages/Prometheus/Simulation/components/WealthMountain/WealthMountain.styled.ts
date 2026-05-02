import styled from 'styled-components';

export const ChartCard = styled.div`
  background: rgba(42, 42, 42, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 3rem;
`;

export const ChartHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const HeaderInfo = styled.div``;

export const ChartTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #ddb7ff;
  margin: 0;
`;

export const ChartSubtitle = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #968e99;
  margin: 0.25rem 0 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const OutlineButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(221, 183, 255, 0.2);
  border-radius: 0.125rem;
  background: transparent;
  color: #ddb7ff;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(221, 183, 255, 0.1);
  }
`;

export const SolidButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.125rem;
  background: #ddb7ff;
  color: #490080;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #e8ccff;
  }
`;

export const ChartContainer = styled.div`
  position: relative;
  height: 400px;
  padding: 1rem 1rem 1rem 0.5rem;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(221, 183, 255, 0.08) 0%,
    rgba(19, 19, 19, 0) 70%
  );
`;
