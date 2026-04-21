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
  align-items: center;
  justify-content: space-between;
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
  background: rgba(221, 183, 255, 0.1);
  color: #ddb7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.375rem;
  }
`;

export const Title = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  color: #e2e2e2;
`;

export const Subtitle = styled.p`
  font-size: 0.625rem;
  color: #cfc2d6;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0;
`;


