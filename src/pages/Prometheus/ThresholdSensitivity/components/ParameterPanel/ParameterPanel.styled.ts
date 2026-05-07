import styled from 'styled-components';

export const Panel = styled.div`
  background-color: #1c1b1b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const PanelHeader = styled.div`
  background: #0e0e0e;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #ddb7ff;
    font-size: 0.875rem;
  }
`;

export const PanelTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e5e2e1;
  margin: 0;
`;

export const PanelBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FieldLabel = styled.label`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

export const FactorButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.75rem;
  background: #0e0e0e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  color: #e5e2e1;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    color: rgba(255, 255, 255, 0.3);
    font-size: 1rem;
  }

  &:hover {
    border-color: rgba(221, 183, 255, 0.3);
    background: rgba(221, 183, 255, 0.05);
  }
`;

export const FactorPlaceholder = styled.span`
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
`;

export const OpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.125rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.125rem;
  padding: 0.125rem;
  background: #0e0e0e;
`;

export const OpButton = styled.button<{ $active: boolean }>`
  padding: 0.375rem 0;
  text-align: center;
  border-radius: 0.125rem;
  border: none;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;

  ${({ $active }) =>
    $active
      ? `
    color: #ddb7ff;
    background: rgba(221, 183, 255, 0.1);
    border: 1px solid rgba(221, 183, 255, 0.3);
  `
      : `
    color: rgba(255, 255, 255, 0.4);
    background: transparent;
    border: 1px solid transparent;

    &:hover {
      color: #e5e2e1;
      background: rgba(255, 255, 255, 0.05);
    }
  `}
`;

export const ThresholdList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const ThresholdChip = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 0.125rem;
  background: #353534;
  border: 1px solid rgba(255, 255, 255, 0.05);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  color: #e5e2e1;
`;

export const ChipRemove = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 0;
  transition: color 0.15s ease;

  svg {
    font-size: 0.625rem;
  }

  &:hover {
    color: #ffb4ab;
  }
`;

export const AddRow = styled.div`
  display: flex;
  gap: 0.375rem;
`;

export const ThresholdInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.375rem 0.5rem;
  background: #0e0e0e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.125rem;
  color: #e5e2e1;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  outline: none;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    border-color: rgba(221, 183, 255, 0.4);
  }
`;

export const UnitHint = styled.span`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.25);
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 0.125rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    font-size: 0.75rem;
  }

  &:hover {
    color: #e5e2e1;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export const ExecuteButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: auto;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.125rem;
  color: #ddb7ff;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
