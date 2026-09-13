import { memo } from 'react';
import { SegmentedControlProps } from '../../interfaces';
import { StyledSegmentedControl } from './SegmentedControl.styled';

function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <StyledSegmentedControl className={className}>
      {options.map((option) => (
        <div
          key={option.value}
          className={`segment ${option.value === value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </StyledSegmentedControl>
  );
}

export default memo(SegmentedControl);
