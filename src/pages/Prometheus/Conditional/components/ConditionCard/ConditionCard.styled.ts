import styled from 'styled-components';

export const Card = styled.div`
  background: #131313;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const FactorLabel = styled.label`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #e5e2e1;
`;

export const CurrentValue = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #ddb7ff;
`;

export const OperatorRow = styled.div`
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.125rem;
  margin-bottom: 1rem;
  overflow: hidden;
`;

export const OpButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.375rem 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  background: ${({ $active }) =>
    $active ? 'rgba(221, 183, 255, 0.1)' : 'transparent'};
  color: ${({ $active }) => ($active ? '#ddb7ff' : '#968e99')};
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: center;

  &:first-child {
    border-left: none;
  }

  &:hover:not([disabled]) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const SliderTrack = styled.div`
  position: relative;
  height: 1.5rem;
  display: flex;
  align-items: center;
`;

export const StyledRange = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  position: relative;
  z-index: 2;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ddb7ff;
    cursor: pointer;
    margin-top: -6px;
    box-shadow: 0 0 10px rgba(221, 183, 255, 0.5);
    border: 2px solid #131313;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: rgba(53, 53, 52, 1);
    border-radius: 9999px;
  }

  &::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ddb7ff;
    cursor: pointer;
    border: 2px solid #131313;
    box-shadow: 0 0 10px rgba(221, 183, 255, 0.5);
  }

  &::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: rgba(53, 53, 52, 1);
    border-radius: 9999px;
  }

  &:focus {
    outline: none;
  }
`;

export const BoundsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const BoundLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.2);
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #968e99;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.15s ease;

  &:hover {
    color: #ef4444;
  }

  svg {
    font-size: 0.875rem;
  }
`;
