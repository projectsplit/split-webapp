import styled from 'styled-components';

export const PageRoot = styled.div`
  position: relative;
  min-height: 100%;
  background-color: #131313;
  color: #e2e2e2;
  font-family: 'Inter', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;

  ::selection {
    background: #ddb7ff;
    color: #490080;
  }
`;

export const Main = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 0rem;
`;

export const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-column: span 7 / span 7;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-column: span 5 / span 5;
  }
`;
