import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Title = styled.h3<{ $tone: 'primary' | 'error' }>`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: ${({ $tone }) => ($tone === 'primary' ? '#ddb7ff' : '#ffb4ab')};
`;

export const Marker = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.4;
`;
