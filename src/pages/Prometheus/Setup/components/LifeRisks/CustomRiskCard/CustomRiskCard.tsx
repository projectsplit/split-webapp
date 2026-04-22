import { useEffect, useRef, useState } from 'react';
import { MdClose, MdOutlineBolt, MdHomeRepairService } from 'react-icons/md';
import type { CustomRisk } from '@/pages/Prometheus/interfaces';
import { LabeledField } from '../../../shared/LabeledField/LabeledField';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { SelectField } from '../../../shared/SelectField/SelectField';
import { QuantityInput } from '../../../shared/QuantityInput/QuantityInput';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const [optAmount, setOptAmount] = useState(
    risk.opt_loss ? risk.opt_loss.toLocaleString('en-US') : ''
  );
  const [pessAmount, setPessAmount] = useState(
    risk.pess_loss ? risk.pess_loss.toLocaleString('en-US') : ''
  );

  useEffect(() => {
    if (risk.name === 'New Risk') {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const signalOpt = risk.opt_loss;
    const currentLocalOpt = Number(optAmount.replace(/,/g, ''));
    if (signalOpt !== currentLocalOpt) {
      setOptAmount(signalOpt ? signalOpt.toLocaleString('en-US') : '');
    }

    const signalPess = risk.pess_loss;
    const currentLocalPess = Number(pessAmount.replace(/,/g, ''));
    if (signalPess !== currentLocalPess) {
      setPessAmount(signalPess ? signalPess.toLocaleString('en-US') : '');
    }
  }, [risk.opt_loss, risk.pess_loss]);

  const handleOptChange = (next: string) => {
    setOptAmount(next);
    onChange({ opt_loss: parseMoney(next) });
  };

  const handlePessChange = (next: string) => {
    setPessAmount(next);
    onChange({ pess_loss: parseMoney(next) });
  };

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
              ref={inputRef}
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
          <LabeledField label="Occurrence Frequency">
            <QuantityInput
              prefix="1 every"
              suffix="years"
              value={risk.once_every_x_years}
              onChange={(next) =>
                onChange({ once_every_x_years: Number(next) || 0 })
              }
              accent={accent}
            />
          </LabeledField>

          <DurationRow>
            <LabeledField label="Optimistic Loss">
              <MoneyInput
                value={optAmount}
                onChange={handleOptChange}
                inputType="text"
                size="sm"
                currencyLabel=""
                mutedPrefix
                accent={accent}
              />
            </LabeledField>
            <LabeledField label="Pessimistic Loss">
              <MoneyInput
                value={pessAmount}
                onChange={handlePessChange}
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
