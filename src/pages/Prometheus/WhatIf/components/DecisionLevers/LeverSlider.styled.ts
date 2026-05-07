import styled from 'styled-components';

export const SliderWrapper = styled.div<{ $locked?: boolean }>`
  margin-bottom: 1.5rem;
  opacity: ${({ $locked }) => ($locked ? 0.55 : 1)};
  transition: opacity 0.25s ease;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LockNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.5rem;
  padding: 0.4375rem 0.625rem;
  background: rgba(221, 183, 255, 0.06);
  border: 1px solid rgba(221, 183, 255, 0.15);
  border-radius: 0.375rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  letter-spacing: 0.05em;
  color: rgba(221, 183, 255, 0.75);

  svg {
    font-size: 0.75rem;
    color: rgba(221, 183, 255, 0.6);
  }
`;

export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
`;

export const SliderLabel = styled.label`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #cdc3d0;
`;

export const SliderValue = styled.span<{ $positive?: boolean }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: ${({ $positive }) =>
    $positive === undefined
      ? '#e5e2e1'
      : $positive
        ? '#4ae176'
        : '#ef4444'};
`;

export const StyledRange = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ddb7ff;
    cursor: pointer;
    margin-top: -6px;
    box-shadow: 0 0 10px rgba(221, 183, 255, 0.5);
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ddb7ff;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 10px rgba(221, 183, 255, 0.5);
  }

  &::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &:focus {
    outline: none;
  }
`;

export const SliderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
`;

export const MinMaxLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.3);
`;

export const MaxInputField = styled.input`
  width: 80px;
  height: 24px;
  background: #131313;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #e5e2e1;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  text-align: center;
  padding: 0 4px;

  &:focus {
    outline: none;
    border-color: rgba(221, 183, 255, 0.5);
  }
`;
