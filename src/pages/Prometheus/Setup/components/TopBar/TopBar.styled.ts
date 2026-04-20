import styled from 'styled-components';

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: rgba(19, 19, 19, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(53, 53, 53, 0.3);
`;

export const LeftCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #ddb7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(53, 53, 53, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 1.375rem;
  }
`;

export const Title = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #ddb7ff;
  margin: 0;
`;

export const RightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const Version = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  color: #ddb7ff;
  letter-spacing: 0.2em;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const SaveButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.375rem 1rem;
  border-radius: 0.25rem;
  color: #ddb7ff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(53, 53, 53, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
`;
