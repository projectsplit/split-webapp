import styled from 'styled-components';

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
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
  border-radius: 9999px;
  cursor: pointer;
  color: #ddb7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: #353535;
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
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #ddb7ff;
  margin: 0;
`;

export const FinalizeButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: #ddb7ff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: #353535;
  }

  &:active {
    transform: scale(0.95);
  }
`;
