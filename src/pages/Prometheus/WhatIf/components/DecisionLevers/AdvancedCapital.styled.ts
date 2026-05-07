import styled, { keyframes } from 'styled-components';

const SPRING = 'cubic-bezier(0.32, 0.72, 0, 1)';

export const Wrapper = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const Toggle = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.2s ease;
  border-radius: 0.5rem;

  &:hover {
    color: #e5e2e1;
  }
`;

export const ToggleLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

export const ChevronWrap = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ${SPRING};
  transform: rotate(${({ $open }) => ($open ? '90deg' : '0deg')});

  svg {
    font-size: 1rem;
  }
`;

export const ActiveDot = styled.span<{ $color?: string }>`
  display: inline-block;
  width: 0.4375rem;
  height: 0.4375rem;
  border-radius: 50%;
  background: ${({ $color }) => $color ?? '#ddb7ff'};
  box-shadow: 0 0 8px ${({ $color }) => $color ?? 'rgba(221, 183, 255, 0.6)'};
`;

export const ToggleHint = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.3);
`;

export const Collapse = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.4s ${SPRING}, opacity 0.3s ease;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  overflow: hidden;
`;

export const CollapseInner = styled.div`
  min-height: 0;
  padding-top: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SegmentedControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.125rem;
  padding: 0.25rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.5rem;
  position: relative;
`;

export const Segment = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.07)' : 'transparent'};
  color: ${({ $active }) => ($active ? '#ddb7ff' : 'rgba(255, 255, 255, 0.45)')};
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.25s ${SPRING};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  box-shadow: ${({ $active }) =>
    $active
      ? 'inset 0 0 0 1px rgba(221, 183, 255, 0.18), 0 1px 2px rgba(0, 0, 0, 0.4)'
      : 'none'};

  svg {
    font-size: 0.875rem;
  }

  &:hover {
    color: ${({ $active }) => ($active ? '#ddb7ff' : '#e5e2e1')};
  }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ModeContent = styled.div`
  animation: ${fadeUp} 0.35s ${SPRING};
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const Caption = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.45);

  em {
    font-style: normal;
    color: #ddb7ff;
  }
`;

export const InputRow = styled.div<{ $tone?: 'normal' | 'warning' }>`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid
    ${({ $tone }) =>
      $tone === 'warning'
        ? 'rgba(229, 87, 79, 0.35)'
        : 'rgba(255, 255, 255, 0.06)'};
  border-radius: 0.625rem;
  padding: 0.75rem 1rem;
  transition: border-color 0.25s ${SPRING}, box-shadow 0.25s ease;

  &:focus-within {
    border-color: ${({ $tone }) =>
      $tone === 'warning'
        ? 'rgba(229, 87, 79, 0.6)'
        : 'rgba(221, 183, 255, 0.45)'};
    box-shadow: 0 0 0 4px
      ${({ $tone }) =>
        $tone === 'warning'
          ? 'rgba(229, 87, 79, 0.06)'
          : 'rgba(221, 183, 255, 0.06)'};
  }
`;

export const CurrencyPrefix = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: rgba(221, 183, 255, 0.4);
  margin-right: 0.5rem;
`;

export const NumberInput = styled.input<{ $tone?: 'normal' | 'warning' }>`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ $tone }) => ($tone === 'warning' ? '#ffb4ab' : '#e5e2e1')};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
  appearance: textfield;

  &::placeholder {
    color: rgba(255, 255, 255, 0.18);
  }
`;

export const SliderField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.625rem;
  padding: 1rem 1.125rem;
`;

export const SliderHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const SliderAmount = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #ddb7ff;
`;

export const SliderTotal = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.4);
`;

const trackHeight = '0.25rem';

export const Slider = styled.input.attrs({ type: 'range' })<{ $disabled?: boolean }>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${trackHeight};
  background: linear-gradient(
    to right,
    rgba(221, 183, 255, 0.5) 0%,
    rgba(221, 183, 255, 0.5) var(--progress, 0%),
    rgba(255, 255, 255, 0.08) var(--progress, 0%),
    rgba(255, 255, 255, 0.08) 100%
  );
  border-radius: 9999px;
  outline: none;
  margin: 0.25rem 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  transition: opacity 0.2s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    background: #f0daff;
    border: 2px solid #ddb7ff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5),
      0 0 0 0 rgba(221, 183, 255, 0.3);
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  &:hover::-webkit-slider-thumb {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5),
      0 0 0 6px rgba(221, 183, 255, 0.12);
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.05);
  }

  &::-moz-range-thumb {
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    background: #f0daff;
    border: 2px solid #ddb7ff;
    cursor: pointer;
  }
`;

export const SliderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
`;

export const FlowRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.625rem;
  padding: 0.875rem 1rem;
`;

export const FlowLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.6875rem;
`;

export const FlowLabel = styled.span`
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const FlowValues = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #e5e2e1;
`;

export const FlowOld = styled.span`
  color: rgba(255, 255, 255, 0.4);
  text-decoration: line-through;
  text-decoration-color: rgba(255, 255, 255, 0.2);
`;

export const FlowArrow = styled.span<{ $tone: 'gain' | 'loss' }>`
  color: ${({ $tone }) => ($tone === 'gain' ? '#4ae176' : '#ffb4ab')};
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
`;

export const FlowNew = styled.span<{ $tone: 'gain' | 'loss' | 'neutral' }>`
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'gain'
      ? '#4ae176'
      : $tone === 'loss'
        ? '#ffb4ab'
        : '#ddb7ff'};
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const Chip = styled.button<{ $variant?: 'destructive' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'destructive'
        ? 'rgba(229, 87, 79, 0.25)'
        : 'rgba(255, 255, 255, 0.08)'};
  background: ${({ $variant }) =>
    $variant === 'destructive'
      ? 'rgba(229, 87, 79, 0.06)'
      : 'rgba(255, 255, 255, 0.025)'};
  color: ${({ $variant }) =>
    $variant === 'destructive' ? '#ffb4ab' : 'rgba(255, 255, 255, 0.6)'};
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.2s ${SPRING};

  svg {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${({ $variant }) => ($variant === 'destructive' ? '#ffd4cf' : '#e5e2e1')};
    border-color: ${({ $variant }) =>
      $variant === 'destructive'
        ? 'rgba(229, 87, 79, 0.5)'
        : 'rgba(221, 183, 255, 0.3)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyHint = styled.p`
  margin: 0;
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.3);
  padding: 0.75rem 0;
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(229, 87, 79, 0.0); }
  50% { box-shadow: 0 0 0 4px rgba(229, 87, 79, 0.08); }
`;

export const LiquidatedBanner = styled.div`
  padding: 0.75rem 0.875rem;
  background: rgba(229, 87, 79, 0.06);
  border: 1px solid rgba(229, 87, 79, 0.25);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${pulseGlow} 2.5s ease-in-out infinite;

  svg {
    color: #ffb4ab;
    font-size: 0.875rem;
    flex-shrink: 0;
  }
`;

export const LiquidatedText = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #ffb4ab;
  line-height: 1.5;

  strong {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-right: 0.5rem;
  }
`;
