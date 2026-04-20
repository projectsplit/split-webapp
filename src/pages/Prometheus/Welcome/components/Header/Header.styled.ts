import styled from 'styled-components';

export const HeaderSection = styled.section`
  margin-bottom: 3rem;
`;

export const Headline = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 900;
  font-size: 2.25rem;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #e2e2e2;
  margin: 0 0 1.25rem;

  .accent {
    color: #ddb7ff;
    font-style: italic;
  }

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

export const Lead = styled.p`
  font-family: 'Inter', sans-serif;
  color: #cfc2d6;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 36rem;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;
