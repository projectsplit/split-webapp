import { useState, useEffect } from 'react';
import { MdHealthAndSafety } from 'react-icons/md';
import { WhatIfRequest, FactorsResponse, RiskStats } from '../../interfaces';
import { formatCompact } from '../../utils';
import {
  RiskCard,
  RiskName,
  ModeRow,
  ModeOption,
  ModeRadio,
  ModeLabel,
  FieldRow,
  FieldGroup,
  RiskInputLabel,
  RiskInputField,
  FairPremiumHint,
  CapOption,
  CapOptionRadio,
  CapOptionLabel,
  CapOptionValue,
  ToggleRow,
  ToggleLabel,
  ToggleSwitch,
} from './RiskProtection.styled';
import {
  GlassPanel,
  PanelSectionHeader,
  PanelSectionIcon,
  PanelSectionLabel,
} from './DecisionLevers.styled';

type RiskMode =
  | { kind: 'off' }
  | { kind: 'insure'; premium: number }
  | { kind: 'cap'; maxLoss: number; premium: number };

type RisksState = Record<string, RiskMode>;

const buildRisksState = (
  riskNames: string[],
  request: WhatIfRequest,
): RisksState => {
  const state: RisksState = {};
  for (const name of riskNames) {
    if (request.disabled_risks[name] !== undefined) {
      state[name] = {
        kind: 'insure',
        premium: request.disabled_risks[name],
      };
    } else if (request.risk_caps[name]) {
      const [premium, maxLoss] = request.risk_caps[name];
      state[name] = { kind: 'cap', maxLoss, premium };
    } else {
      state[name] = { kind: 'off' };
    }
  }
  return state;
};

const flattenToRequest = (
  risksState: RisksState,
  request: WhatIfRequest,
): WhatIfRequest => {
  const disabled_risks: Record<string, number> = {};
  const risk_caps: Record<string, number[]> = {};

  for (const [name, mode] of Object.entries(risksState)) {
    if (mode.kind === 'insure') {
      disabled_risks[name] = mode.premium;
    } else if (mode.kind === 'cap') {
      risk_caps[name] = [mode.premium, mode.maxLoss];
    }
  }

  return { ...request, disabled_risks, risk_caps };
};

interface RiskProtectionProps {
  factors: FactorsResponse | undefined;
  currency: string;
  request: WhatIfRequest;
  onChange: (req: WhatIfRequest) => void;
}

export const RiskProtection = ({
  factors,
  currency,
  request,
  onChange,
}: RiskProtectionProps) => {
  const riskEntries: [string, RiskStats][] = factors
    ? Object.entries(factors.risks)
    : [];
  const riskNames = riskEntries.map(([name]) => name);

  const [risks, setRisks] = useState<RisksState>(() =>
    buildRisksState(riskNames, request),
  );

  useEffect(() => {
    if (riskNames.length === 0) return;
    setRisks((prev) => {
      const next = { ...prev };
      for (const name of riskNames) {
        if (!(name in next)) next[name] = { kind: 'off' };
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskNames.join(',')]);

  useEffect(() => {
    onChange(flattenToRequest(risks, request));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [risks]);

  const setMode = (name: string, kind: 'off' | 'insure' | 'cap') => {
    setRisks((prev) => {
      const current = prev[name];
      if (kind === 'off') return { ...prev, [name]: { kind: 'off' } };
      if (kind === 'insure') {
        const premium =
          current?.kind === 'insure'
            ? current.premium
            : current?.kind === 'cap'
              ? current.premium
              : 0;
        return { ...prev, [name]: { kind: 'insure', premium } };
      }
      const premium =
        current?.kind === 'cap'
          ? current.premium
          : current?.kind === 'insure'
            ? current.premium
            : 0;
      const maxLoss = current?.kind === 'cap' ? current.maxLoss : 0;
      return { ...prev, [name]: { kind: 'cap', maxLoss, premium } };
    });
  };

  const updateField = (
    name: string,
    field: 'premium' | 'maxLoss',
    val: number,
  ) => {
    setRisks((prev) => {
      const current = prev[name];
      if (!current || current.kind === 'off') return prev;
      if (current.kind === 'insure' && field === 'premium') {
        return { ...prev, [name]: { ...current, premium: val } };
      }
      if (current.kind === 'cap') {
        return { ...prev, [name]: { ...current, [field]: val } };
      }
      return prev;
    });
  };

  const applyCapPreset = (
    name: string,
    cap: { max_loss: number; premium: number },
  ) => {
    setRisks((prev) => ({
      ...prev,
      [name]: { kind: 'cap', maxLoss: cap.max_loss, premium: cap.premium },
    }));
  };

  return (
    <GlassPanel $accent="tertiary">
      <PanelSectionHeader>
        <PanelSectionIcon $color="#f9bb4d">
          <MdHealthAndSafety />
        </PanelSectionIcon>
        <PanelSectionLabel>Risk Protection</PanelSectionLabel>
      </PanelSectionHeader>

      {riskEntries.length === 0 && (
        <FairPremiumHint>
          Run a simulation first to see available risks.
        </FairPremiumHint>
      )}

      {riskEntries.map(([name, stats]) => {
        const mode = risks[name] ?? { kind: 'off' };
        return (
          <RiskCard key={name}>
            <RiskName>{name.replace(/_/g, ' ')}</RiskName>
            <ModeRow>
              {(['off', 'insure', 'cap'] as const).map((k) => (
                <ModeOption
                  key={k}
                  $active={mode.kind === k}
                  onClick={() => setMode(name, k)}
                >
                  <ModeRadio $active={mode.kind === k} />
                  <ModeLabel>
                    {k === 'off' ? 'Off' : k === 'insure' ? 'Insure' : 'Cap'}
                  </ModeLabel>
                </ModeOption>
              ))}
            </ModeRow>

            {mode.kind === 'insure' && (
              <>
                <FieldRow>
                  <FieldGroup>
                    <RiskInputLabel>PREMIUM /YR ({currency})</RiskInputLabel>
                    <RiskInputField
                      type="number"
                      value={mode.premium || ''}
                      placeholder="0"
                      onChange={(e) =>
                        updateField(name, 'premium', Number(e.target.value))
                      }
                    />
                  </FieldGroup>
                </FieldRow>
                <FairPremiumHint>
                  Fair premium: {formatCompact(stats.fair_premium.full)}{' '}
                  {currency}/yr
                </FairPremiumHint>
              </>
            )}

            {mode.kind === 'cap' && (
              <>
                <FieldRow>
                  <FieldGroup>
                    <RiskInputLabel>CAP LOSSES AT ({currency})</RiskInputLabel>
                    <RiskInputField
                      type="number"
                      value={mode.maxLoss || ''}
                      placeholder="0"
                      onChange={(e) =>
                        updateField(name, 'maxLoss', Number(e.target.value))
                      }
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <RiskInputLabel>PREMIUM /YR ({currency})</RiskInputLabel>
                    <RiskInputField
                      type="number"
                      value={mode.premium || ''}
                      placeholder="0"
                      onChange={(e) =>
                        updateField(name, 'premium', Number(e.target.value))
                      }
                    />
                  </FieldGroup>
                </FieldRow>
                {stats.fair_premium.caps.length > 0 && (
                  <>
                    <FairPremiumHint>Suggested cap levels:</FairPremiumHint>
                    {stats.fair_premium.caps.map((cap) => (
                      <CapOption
                        key={cap.max_loss}
                        onClick={() => applyCapPreset(name, cap)}
                        $active={
                          mode.maxLoss === cap.max_loss &&
                          mode.premium === cap.premium
                        }
                      >
                        <CapOptionRadio
                          $active={
                            mode.maxLoss === cap.max_loss &&
                            mode.premium === cap.premium
                          }
                        />
                        <CapOptionLabel>
                          Cap at {formatCompact(cap.max_loss)} {currency}
                        </CapOptionLabel>
                        <CapOptionValue>
                          {formatCompact(cap.premium)} {currency}/yr
                        </CapOptionValue>
                      </CapOption>
                    ))}
                  </>
                )}
              </>
            )}
          </RiskCard>
        );
      })}

      <ToggleRow>
        <ToggleLabel>EXCLUDE PROPERTY</ToggleLabel>
        <ToggleSwitch
          $checked={request.exclude_property}
          onClick={() =>
            onChange({ ...request, exclude_property: !request.exclude_property })
          }
        />
      </ToggleRow>
    </GlassPanel>
  );
};
