import styled from 'styled-components';

export const CardArticle = styled.article`
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 85%;
  max-width: 450px;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  border-radius: 0.5rem;
  background: rgba(53, 53, 53, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(221, 183, 255, 0.1);

  @media (min-width: 768px) {
    width: 450px;
  }
`;

export const BackgroundIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  opacity: 0.1;

  svg {
    font-size: 3.75rem;
  }
`;

export const ModuleLabel = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: #ddb7ff;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 3rem;
`;

export const Question = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.3;
  color: #e2e2e2;
  margin: 0;
  transition: color 0.5s ease;

  ${CardArticle}:hover & {
    color: #ddb7ff;
  }
`;

export const Footer = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FooterDivider = styled.div`
  height: 1px;
  flex-grow: 1;
  background: rgba(77, 67, 84, 0.3);
`;

export const FooterTag = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #4ae176;
`;
