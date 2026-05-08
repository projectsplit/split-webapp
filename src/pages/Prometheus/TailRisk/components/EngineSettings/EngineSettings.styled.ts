import styled from 'styled-components';

const SPRING = 'cubic-bezier(0.32, 0.72, 0, 1)';

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 60;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

export const Sheet = styled.aside<{ $open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 70;
  background: rgba(28, 27, 27, 0.96);
  backdrop-filter: blur(60px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem 1.25rem 0 0;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.45s ${SPRING};
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.5);

  @media (min-width: 1024px) {
    left: 50%;
    bottom: auto;
    top: 50%;
    right: auto;
    transform: ${({ $open }) =>
      $open
        ? 'translate(-50%, -50%) scale(1)'
        : 'translate(-50%, -40%) scale(0.95)'};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition:
      transform 0.4s ${SPRING},
      opacity 0.3s ease;
    width: min(90vw, 36rem);
    max-height: 85vh;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #0e0e0e;
  border-radius: 1.25rem 1.25rem 0 0;

  @media (min-width: 1024px) {
    border-radius: 1rem 1rem 0 0;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #ddb7ff;
    font-size: 1.125rem;
  }
`;

export const HeaderTitle = styled.h2`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ddb7ff;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    font-size: 1.125rem;
  }

  &:hover {
    color: #ddb7ff;
    border-color: rgba(221, 183, 255, 0.4);
  }
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const Field = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

export const FieldText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

export const FieldLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #e5e2e1;
`;

export const FieldHint = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.4);
`;

export const SliderField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const SliderValue = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.1875rem 0.5rem;
  border-radius: 0.25rem;
  background: rgba(221, 183, 255, 0.1);
  color: #ddb7ff;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 500;
`;

export const Range = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 0.25rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    background: #ddb7ff;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(221, 183, 255, 0.4);
  }

  &::-moz-range-thumb {
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    background: #ddb7ff;
    border: none;
    cursor: pointer;
  }
`;

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0.5rem;
  padding: 0.1875rem;
  flex-shrink: 0;
`;

export const StepBtn = styled.button`
  width: 1.875rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    color: #e5e2e1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const StepValue = styled.input`
  width: 2.5rem;
  text-align: center;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8125rem;
  color: #ddb7ff;
  font-weight: 500;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

export const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: rgba(221, 183, 255, 0.25);
    border-color: rgba(221, 183, 255, 0.4);
  }

  &:checked + span::after {
    transform: translateX(1rem);
    background: #ddb7ff;
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  transition: all 0.2s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 0.125rem;
    left: 0.1875rem;
    width: 1rem;
    height: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: all 0.2s ease;
  }
`;

export const Footer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: #0e0e0e;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

export const RunButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ddb7ff;
  color: #40215e;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f0daff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }
`;

export const FAB = styled.button`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 50;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: #ddb7ff;
  color: #40215e;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(221, 183, 255, 0.35);
  transition: all 0.25s ease;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background: #f0daff;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(221, 183, 255, 0.45);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 1024px) {
    bottom: 2rem;
    right: 2rem;
  }
`;
