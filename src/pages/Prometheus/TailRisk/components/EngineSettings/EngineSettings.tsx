import { MdTune, MdClose, MdAdd, MdRemove, MdPlayArrow } from 'react-icons/md';
import { TailDriversRequest } from '../../interfaces';
import {
  Overlay,
  Sheet,
  Header,
  HeaderLeft,
  HeaderTitle,
  CloseButton,
  Body,
  Field,
  FieldText,
  FieldLabel,
  FieldHint,
  SliderField,
  SliderHeader,
  SliderValue,
  Range,
  Stepper,
  StepBtn,
  StepValue,
  Toggle,
  ToggleInput,
  ToggleSlider,
  Footer,
  RunButton,
} from './EngineSettings.styled';

interface EngineSettingsProps {
  open: boolean;
  onClose: () => void;
  request: Required<TailDriversRequest>;
  onChange: (next: Required<TailDriversRequest>) => void;
  onRun: () => void;
  isPending: boolean;
}

interface StepperFieldProps {
  label: string;
  hint: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
}

const StepperField = ({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
}: StepperFieldProps) => {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  return (
    <Field>
      <FieldText>
        <FieldLabel>{label}</FieldLabel>
        <FieldHint>{hint}</FieldHint>
      </FieldText>
      <Stepper>
        <StepBtn onClick={dec} disabled={value <= min} type="button">
          <MdRemove />
        </StepBtn>
        <StepValue
          type="number"
          value={value}
          readOnly
          onChange={() => {}}
        />
        <StepBtn onClick={inc} disabled={value >= max} type="button">
          <MdAdd />
        </StepBtn>
      </Stepper>
    </Field>
  );
};

export const EngineSettings = ({
  open,
  onClose,
  request,
  onChange,
  onRun,
  isPending,
}: EngineSettingsProps) => {
  const set = (patch: Partial<Required<TailDriversRequest>>) =>
    onChange({ ...request, ...patch });

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Sheet $open={open}>
        <Header>
          <HeaderLeft>
            <MdTune />
            <HeaderTitle>Engine Settings</HeaderTitle>
          </HeaderLeft>
          <CloseButton onClick={onClose} type="button">
            <MdClose />
          </CloseButton>
        </Header>

        <Body>
          <Field>
            <FieldText>
              <FieldLabel>Exclude Property</FieldLabel>
              <FieldHint>
                Exclude property-related assets from the analysis.
              </FieldHint>
            </FieldText>
            <Toggle>
              <ToggleInput
                checked={request.exclude_property}
                onChange={(e) => set({ exclude_property: e.target.checked })}
              />
              <ToggleSlider />
            </Toggle>
          </Field>

          <StepperField
            label="Tail Threshold (Busts)"
            hint="Minimum ruin paths needed for analysis. Widens to fallback % if not met."
            value={request.tail_threshold_busts}
            onChange={(v) => set({ tail_threshold_busts: v })}
            min={10}
            max={500}
            step={10}
          />

          <SliderField>
            <SliderHeader>
              <FieldText>
                <FieldLabel>Tail Fallback %</FieldLabel>
                <FieldHint>
                  Worst-case quantile used if ruin threshold isn't met.
                </FieldHint>
              </FieldText>
              <SliderValue>{request.tail_fallback_pct.toFixed(1)}%</SliderValue>
            </SliderHeader>
            <Range
              min={0.1}
              max={5}
              step={0.1}
              value={request.tail_fallback_pct}
              onChange={(e) =>
                set({ tail_fallback_pct: Number(e.target.value) })
              }
            />
          </SliderField>

          <SliderField>
            <SliderHeader>
              <FieldText>
                <FieldLabel>Pair Quantile</FieldLabel>
                <FieldHint>
                  Defines the "bad" threshold for factor analysis (e.g., worst
                  25%).
                </FieldHint>
              </FieldText>
              <SliderValue>
                {Math.round(request.pair_quantile * 100)}%
              </SliderValue>
            </SliderHeader>
            <Range
              min={0.05}
              max={0.5}
              step={0.05}
              value={request.pair_quantile}
              onChange={(e) =>
                set({ pair_quantile: Number(e.target.value) })
              }
            />
          </SliderField>

          <StepperField
            label="Top Pairs (N)"
            hint="Number of ranked factor interactions to return."
            value={request.pair_top_n}
            onChange={(v) => set({ pair_top_n: v })}
            min={1}
            max={50}
          />

          <StepperField
            label="Path Depth"
            hint="Complexity of the decision tree (number of sequential logic splits)."
            value={request.path_depth}
            onChange={(v) => set({ path_depth: v })}
            min={1}
            max={6}
          />

          <StepperField
            label="Top Paths (N)"
            hint="Number of most dangerous specific scenarios to return."
            value={request.path_top_n}
            onChange={(v) => set({ path_top_n: v })}
            min={1}
            max={20}
          />
        </Body>

        <Footer>
          <RunButton onClick={onRun} disabled={isPending} type="button">
            <MdPlayArrow />
            {isPending ? 'Running...' : 'Apply & Re-run'}
          </RunButton>
        </Footer>
      </Sheet>
    </>
  );
};
