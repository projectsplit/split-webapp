import styled from 'styled-components';

export const CardWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
  border: 1px solid rgba(221, 183, 255, 0.2);
  background-color: #1b1b1b;
  padding: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;
  box-shadow: 0 0 25px -5px rgba(221, 183, 255, 0.15);

  &:hover {
    border-color: rgba(221, 183, 255, 0.4);
  }
`;

export const SparkleIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: rgba(221, 183, 255, 0.3);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${CardWrapper}:hover & {
    color: #ddb7ff;
  }

  svg {
    font-size: 1rem;
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconCircle = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ddb7ff 0%, #b76dff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(183, 109, 255, 0.3);
  flex-shrink: 0;

  svg {
    font-size: 1rem;
    color: #490080;
  }
`;

export const TextBlock = styled.div`
  h5 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #e2e2e2;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0;
  }

  p {
    font-size: 0.625rem;
    color: rgba(207, 194, 214, 0.6);
    font-weight: 500;
    line-height: 1.4;
    margin: 0.125rem 0 0;
  }
`;
