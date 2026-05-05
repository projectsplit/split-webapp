import styled from 'styled-components';

export const SelectorPanel = styled.div`
  background: rgba(28, 27, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SelectorHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: #0e0e0e;
  border-radius: 0.75rem 0.75rem 0 0;
`;

export const SelectorTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e5e2e1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;

  svg {
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const SelectorContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #968e99;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.15s ease;

  &:hover {
    color: #e5e2e1;
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1rem;
  }
`;

export const RunQueryButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #ddb7ff;
  color: #40215e;
  border: none;
  border-radius: 0.25rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 0 15px rgba(221, 183, 255, 0.2);
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #f0daff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.125rem;
  }
`;

export const EmptyConditions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  color: #968e99;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  line-height: 1.8;
`;
