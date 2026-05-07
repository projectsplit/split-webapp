import { useEffect, useRef } from 'react';
import { MdEast } from 'react-icons/md';
import { formatCompact } from '../../utils';
import {
  ModeContent,
  Caption,
  SliderField,
  SliderHeader,
  SliderAmount,
  SliderTotal,
  Slider,
  SliderFooter,
  FlowRow,
  FlowLine,
  FlowLabel,
  FlowValues,
  FlowOld,
  FlowArrow,
  FlowNew,
  EmptyHint,
} from './AdvancedCapital.styled';

interface MoveCashModeProps {
  amount: number;
  onChange: (val: number) => void;
  savings: number;
  defaultTotal: number;
}

const STEP = 1000;

export const MoveCashMode = ({
  amount,
  onChange,
  savings,
  defaultTotal,
}: MoveCashModeProps) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const max = Math.max(0, Math.floor(savings));
  const clamped = Math.min(amount, max);
  const progress = max > 0 ? (clamped / max) * 100 : 0;

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty('--progress', `${progress}%`);
    }
  }, [progress]);

  if (max <= 0) {
    return (
      <ModeContent>
        <Caption>
          You don't have any cash savings to move into the portfolio.
        </Caption>
        <EmptyHint>Available savings: $0</EmptyHint>
      </ModeContent>
    );
  }

  const newPortfolio = defaultTotal + clamped;
  const newSavings = savings - clamped;

  return (
    <ModeContent>
      <Caption>
        Reallocate cash from your savings buffer into the portfolio.
      </Caption>

      <SliderField>
        <SliderHeader>
          <SliderAmount>{formatCompact(clamped)}</SliderAmount>
          <SliderTotal>of {formatCompact(max)}</SliderTotal>
        </SliderHeader>
        <Slider
          ref={sliderRef}
          min={0}
          max={max}
          step={STEP}
          value={clamped}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <SliderFooter>
          <span>$0</span>
          <span>{formatCompact(max)}</span>
        </SliderFooter>
      </SliderField>

      <FlowRow>
        <FlowLine>
          <FlowLabel>Portfolio</FlowLabel>
          <FlowValues>
            <FlowOld>{formatCompact(defaultTotal)}</FlowOld>
            <FlowArrow $tone="gain">
              <MdEast />
            </FlowArrow>
            <FlowNew $tone={clamped > 0 ? 'gain' : 'neutral'}>
              {formatCompact(newPortfolio)}
            </FlowNew>
          </FlowValues>
        </FlowLine>
        <FlowLine>
          <FlowLabel>Savings</FlowLabel>
          <FlowValues>
            <FlowOld>{formatCompact(savings)}</FlowOld>
            <FlowArrow $tone="loss">
              <MdEast />
            </FlowArrow>
            <FlowNew $tone={clamped > 0 ? 'loss' : 'neutral'}>
              {formatCompact(newSavings)}
            </FlowNew>
          </FlowValues>
        </FlowLine>
      </FlowRow>
    </ModeContent>
  );
};
