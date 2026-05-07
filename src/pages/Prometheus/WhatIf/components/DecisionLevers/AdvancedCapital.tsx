import { MdChevronRight, MdSwapHoriz, MdAutoAwesome } from 'react-icons/md';
import { MoveCashMode } from './MoveCashMode';
import { HypotheticalMode } from './HypotheticalMode';
import {
  Wrapper,
  Toggle,
  ToggleLeft,
  ChevronWrap,
  ActiveDot,
  ToggleHint,
  Collapse,
  CollapseInner,
  SegmentedControl,
  Segment,
} from './AdvancedCapital.styled';

export type CapitalMode = 'none' | 'move-cash' | 'hypothetical';

export interface AdvancedCapitalState {
  mode: CapitalMode;
  moveAmount: number;
  hypotheticalTotal: number;
}

interface AdvancedCapitalProps {
  state: AdvancedCapitalState;
  onChange: (next: AdvancedCapitalState) => void;
  savings: number;
  defaultTotal: number;
}

const MODE_LABELS: Record<Exclude<CapitalMode, 'none'>, string> = {
  'move-cash': 'Move cash',
  hypothetical: 'Hypothetical',
};

export const AdvancedCapital = ({
  state,
  onChange,
  savings,
  defaultTotal,
}: AdvancedCapitalProps) => {
  const open = state.mode !== 'none';

  const setMode = (mode: CapitalMode) => {
    if (mode === 'hypothetical' && state.mode !== 'hypothetical') {
      const seed = state.hypotheticalTotal || defaultTotal;
      onChange({ ...state, mode, hypotheticalTotal: seed });
      return;
    }
    onChange({ ...state, mode });
  };

  const handleToggle = () => {
    if (open) setMode('none');
    else setMode(savings > 0 ? 'move-cash' : 'hypothetical');
  };

  return (
    <Wrapper>
      <Toggle $open={open} onClick={handleToggle} type="button">
        <ToggleLeft>
          <ChevronWrap $open={open}>
            <MdChevronRight />
          </ChevronWrap>
          Advanced Capital
          {open && state.mode !== 'none' && <ActiveDot />}
        </ToggleLeft>
        <ToggleHint>
          {open ? MODE_LABELS[state.mode as Exclude<CapitalMode, 'none'>] : 'Hypothetical'}
        </ToggleHint>
      </Toggle>

      <Collapse $open={open}>
        <CollapseInner>
          <SegmentedControl>
            <Segment
              $active={state.mode === 'move-cash'}
              onClick={() => setMode('move-cash')}
              type="button"
            >
              <MdSwapHoriz />
              Move Cash
            </Segment>
            <Segment
              $active={state.mode === 'hypothetical'}
              onClick={() => setMode('hypothetical')}
              type="button"
            >
              <MdAutoAwesome />
              Hypothetical
            </Segment>
          </SegmentedControl>

          {state.mode === 'move-cash' && (
            <MoveCashMode
              amount={state.moveAmount}
              onChange={(v) => onChange({ ...state, moveAmount: v })}
              savings={savings}
              defaultTotal={defaultTotal}
            />
          )}

          {state.mode === 'hypothetical' && (
            <HypotheticalMode
              amount={state.hypotheticalTotal}
              onChange={(v) => onChange({ ...state, hypotheticalTotal: v })}
              defaultTotal={defaultTotal}
            />
          )}
        </CollapseInner>
      </Collapse>
    </Wrapper>
  );
};
