import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled.div`
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

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
