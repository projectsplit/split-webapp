import styled from 'styled-components';

export const Grid = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Panel = styled.div`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: #0e0e0e;
  border: 1px solid rgba(77, 67, 84, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;

  @media (min-width: 768px) {
    grid-column: span 2 / span 2;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  color: #e2e2e2;
  margin: 0 0 0.25rem 0;
`;

export const Subtitle = styled.p`
  font-size: 0.75rem;
  color: #cfc2d6;
  margin: 0;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const Dot = styled.span<{ $tone: 'positive' | 'negative' | 'neutral' }>`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  margin-top: 0.4rem;
  background: ${(p) =>
    p.$tone === 'positive'
      ? '#4ae176'
      : p.$tone === 'negative'
      ? '#ffb4ab'
      : '#988d9f'};
`;

export const Body = styled.p`
  font-size: 0.75rem;
  line-height: 1.6;
  color: #cfc2d6;
  margin: 0;
`;

export const Strong = styled.span`
  font-weight: 700;
  color: #e2e2e2;
`;

export const Empty = styled.p`
  font-size: 0.75rem;
  color: #988d9f;
  margin: 0;
`;
