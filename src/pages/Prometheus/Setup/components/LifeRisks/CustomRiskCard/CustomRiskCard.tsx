import { MdClose, MdOutlineBolt, MdHomeRepairService } from 'react-icons/md';
import type { CustomRisk } from '@/pages/Prometheus/interfaces';
import { LabeledField } from '../../../shared/LabeledField/LabeledField';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { SelectField } from '../../../shared/SelectField/SelectField';
import {
  Outer,
  Glow,
  Card,
  CardHeader,
  HeaderLeft,
  IconDisk,
  PresetTag,
  Body,
  DurationRow,
} from '../RiskCard/RiskCard.styled';
import { TitleInput, RemoveButton } from './CustomRiskCard.styled';

interface CustomRiskCardProps {
  risk: CustomRisk;
  onChange: (patch: Partial<CustomRisk>) => void;
  onRemove: () => void;
}

const FREQUENCY_OPTIONS = [
  '1 every 2 years',
  '1 every 3 years',
  '1 every 5 years',
  '1 every 10 years',
  '1 every 20 years',
];

const frequencyToYears = (option: string): number => {
  const match = option.match(/(\d+)/);
  return match ? Number(match[1]) : 5;
};

const yearsToFrequency = (years: number): string => {
  const match = FREQUENCY_OPTIONS.find(
    (opt) => frequencyToYears(opt) === years
  );
  return match ?? FREQUENCY_OPTIONS[2];
};

const toMoneyString = (n: number): string => (n ? String(n) : '');
const parseMoney = (value: string): number => {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const CustomRiskCard = ({
  risk,
  onChange,
  onRemove,
}: CustomRiskCardProps) => {
  const accent = 'error-soft';

  return (
    <Outer>
      <Glow $variant="secondary" />
      <Card $variant="secondary">
        <CardHeader>
          <HeaderLeft>
            <IconDisk>
              {risk.name.toLowerCase().includes('home') ? (
                <MdHomeRepairService />
              ) : (
                <MdOutlineBolt />
              )}
            </IconDisk>
            <TitleInput
              value={risk.name}
              placeholder="Risk Name"
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </HeaderLeft>
          <PresetTag>
            <RemoveButton
              type="button"
              aria-label="Remove risk"
              onClick={onRemove}
            >
              <MdClose />
            </RemoveButton>
          </PresetTag>
        </CardHeader>

        <Body>
          <LabeledField label="Occurrence Frequency (Binomial)">
            <SelectField
              value={yearsToFrequency(risk.once_every_x_years)}
              onChange={(next) =>
                onChange({ once_every_x_years: frequencyToYears(next) })
              }
              options={FREQUENCY_OPTIONS}
              accent={accent}
            />
          </LabeledField>

          <DurationRow>
            <LabeledField label="Optimistic Loss">
              <MoneyInput
                value={toMoneyString(risk.opt_loss)}
                onChange={(next) => onChange({ opt_loss: parseMoney(next) })}
                inputType="text"
                size="sm"
                currencyLabel=""
                mutedPrefix
                accent={accent}
              />
            </LabeledField>
            <LabeledField label="Pessimistic Loss">
              <MoneyInput
                value={toMoneyString(risk.pess_loss)}
                onChange={(next) => onChange({ pess_loss: parseMoney(next) })}
                inputType="text"
                size="sm"
                currencyLabel=""
                mutedPrefix
                accent={accent}
              />
            </LabeledField>
          </DurationRow>
        </Body>
      </Card>
    </Outer>
  );
};
