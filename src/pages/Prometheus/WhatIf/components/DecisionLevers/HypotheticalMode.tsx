import { useEffect, useState } from 'react';
import { MdWarning } from 'react-icons/md';
import { formatCompact } from '../../utils';
import {
  ModeContent,
  Caption,
  InputRow,
  CurrencyPrefix,
  NumberInput,
  ChipRow,
  Chip,
  LiquidatedBanner,
  LiquidatedText,
} from './AdvancedCapital.styled';

interface HypotheticalModeProps {
  amount: number;
  onChange: (val: number) => void;
  defaultTotal: number;
}

export const HypotheticalMode = ({
  amount,
  onChange,
  defaultTotal,
}: HypotheticalModeProps) => {
  const [draft, setDraft] = useState<string>(String(amount));
  const liquidated = amount === 0;
  const isOverride = amount !== defaultTotal;
  const delta = amount - defaultTotal;
  const deltaPct =
    defaultTotal > 0 ? Math.round((delta / defaultTotal) * 100) : 0;

  useEffect(() => {
    setDraft(String(amount));
  }, [amount]);

  const commit = (raw: string) => {
    const parsed = Math.max(0, Math.round(Number(raw)));
    if (Number.isFinite(parsed)) onChange(parsed);
    else setDraft(String(amount));
  };

  return (
    <ModeContent>
      <Caption>
        Model what happens with a different total to allocate, regardless of
        your <em>current setup</em>.
      </Caption>

      <InputRow $tone={liquidated ? 'warning' : 'normal'}>
        <CurrencyPrefix>$</CurrencyPrefix>
        <NumberInput
          $tone={liquidated ? 'warning' : 'normal'}
          type="number"
          min={0}
          step={1000}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
          }}
        />
      </InputRow>

      <Caption>
        Current Setup: <em>{formatCompact(defaultTotal)}</em>
        {isOverride && !liquidated && defaultTotal > 0 && (
          <>
            {'  ·  '}
            <em>
              {delta > 0 ? '+' : ''}
              {deltaPct}% vs current setup
            </em>
          </>
        )}
      </Caption>

      <ChipRow>
        <Chip type="button" onClick={() => onChange(Math.round(defaultTotal * 0.5))}>
          ½×
        </Chip>
        <Chip type="button" onClick={() => onChange(defaultTotal)}>
          Current Setup
        </Chip>
        <Chip type="button" onClick={() => onChange(Math.round(defaultTotal * 2))}>
          2×
        </Chip>
        <Chip type="button" $variant="destructive" onClick={() => onChange(0)}>
          <MdWarning /> Liquidate
        </Chip>
      </ChipRow>

      {liquidated && (
        <LiquidatedBanner>
          <MdWarning />
          <LiquidatedText>
            <strong>Liquidated</strong>
            Modelling no equity returns and no bond P&amp;L.
          </LiquidatedText>
        </LiquidatedBanner>
      )}
    </ModeContent>
  );
};
