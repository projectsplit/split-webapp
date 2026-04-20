import styled from 'styled-components';

export const CardWrapper = styled.div`
  background: #1b1b1b;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(77, 67, 84, 0.1);
  transition: border-color 0.5s ease;

  &:hover {
    border-color: rgba(221, 183, 255, 0.2);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

export const HeaderLeft = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const IconBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.25rem;
  background: #353535;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddb7ff;
  flex-shrink: 0;

  svg {
    font-size: 1.375rem;
  }
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const CardTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: #e2e2e2;
  margin: 0;
`;

export const CardSubtitle = styled.p`
  font-size: 0.75rem;
  color: #cfc2d6;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
