import { MdLock } from 'react-icons/md';
import { formatCompact } from '../../utils';
import {
  SliderWrapper,
  SliderHeader,
  SliderLabel,
  SliderValue,
  StyledRange,
  SliderFooter,
  MinMaxLabel,
  MaxInputField,
  LockNote,
} from './LeverSlider.styled';

interface LeverSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue: (val: number) => string;
  formatBound?: (val: number) => string;
  maxEditable?: boolean;
  onMaxChange?: (val: number) => void;
  locked?: boolean;
  lockNote?: string;
}

export const LeverSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 100,
  formatValue,
  formatBound,
  maxEditable,
  onMaxChange,
  locked,
  lockNote,
}: LeverSliderProps) => {
  const display = formatBound ?? formatCompact;
  const isPositive = value > 0;

  return (
    <SliderWrapper $locked={locked}>
      <SliderHeader>
        <SliderLabel>{label}</SliderLabel>
        <SliderValue $positive={value === 0 ? undefined : isPositive}>
          {formatValue(value)}
        </SliderValue>
      </SliderHeader>
      <StyledRange
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={locked}
        readOnly={locked}
        onChange={(e) => {
          if (locked) return;
          onChange(Number(e.target.value));
        }}
      />
      <SliderFooter>
        <MinMaxLabel>{display(min)}</MinMaxLabel>
        {maxEditable && onMaxChange && !locked ? (
          <MaxInputField
            type="number"
            value={max}
            onChange={(e) => onMaxChange(Number(e.target.value))}
          />
        ) : (
          <MinMaxLabel>{display(max)}</MinMaxLabel>
        )}
      </SliderFooter>
      {locked && lockNote && (
        <LockNote>
          <MdLock />
          {lockNote}
        </LockNote>
      )}
    </SliderWrapper>
  );
};
