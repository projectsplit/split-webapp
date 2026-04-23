import styled from 'styled-components';
import { CellTone } from '../../utils/colors';

export const Cell = styled.td<{ $tone: CellTone }>`
  padding: 0;
  text-align: center;
  border-radius: 0.5rem;
  background: ${(p) => p.$tone.background};
  border: 1px solid ${(p) => p.$tone.border};
  transition: box-shadow 0.2s ease, transform 0.15s ease;
  cursor: text;

  &:hover {
    box-shadow: 0 0 15px rgba(221, 183, 255, 0.3);
    z-index: 10;
  }

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(221, 183, 255, 0.6);
  }
`;

export const Display = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-variant-numeric: tabular-nums;
  font-size: 0.875rem;
  font-weight: 500;
  box-sizing: border-box;
  cursor: text;
`;

export const SignedGroup = styled.span<{ $color: string }>`
  position: relative;
  display: inline-block;
  padding-left: 1.1ch;
  padding-right: 0.5ch;
  color: ${(p) => p.$color};
`;

export const Sign = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 0.8ch;
  text-align: left;
`;

export const Digits = styled.span`
  display: inline-block;
`;

export const Input = styled.input<{ $color: string }>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 0;
  margin: 0;
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-variant-numeric: tabular-nums;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(p) => p.$color};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
  appearance: textfield;
`;
