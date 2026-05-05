import { useState, useEffect, useRef, useCallback } from 'react';
import { MdHealthAndSafety } from 'react-icons/md';
import { WhatIfRequest, FactorsResponse, RiskStats } from '../../interfaces';
import { formatCompact } from '../../utils';
import { useGetFairPremium } from '@/api/auth/CommandHooks/useGetFairPremium';
import useDebounce from '@/hooks/useDebounce';

const r2 = (v: number) => Math.round(v * 100) / 100;
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
  GrossWarning,
  ExpectedLossHint,
  CapOption,
  CapOptionRadio,
  CapOptionLabel,
  CapOptionValue,
  ToggleRow,
  ToggleLabel,
  ToggleSwitch,
  PremiumFieldWrap,
  LoadingDots,
} from './RiskProtection.styled';
import {
  GlassPanel,
  PanelSectionHeader,
  PanelSectionIcon,
  PanelSectionLabel,
} from './DecisionLevers.styled';

type RiskMode =
  | { kind: 'none' }
  | { kind: 'insure'; premium: number }
  | { kind: 'cap'; maxLoss: number; premium: number };

type RisksState = Record<string, RiskMode>;

type PrevValues = Record<
  string,
  { insure?: { premium: number }; cap?: { maxLoss: number; premium: number } }
>;

type DynamicFairPrice = Record<
  string,
  { maxLoss: number; premium: number } | undefined
>;

const buildRisksState = (
  riskNames: string[],
  request: WhatIfRequest,
): RisksState => {
  const state: RisksState = {};
  for (const name of riskNames) {
    if (request.disabled_risks[name] !== undefined) {
      state[name] = {
        kind: 'insure',
        premium: r2(request.disabled_risks[name]),
      };
    } else if (request.risk_caps[name]) {
      const [maxLoss, premium] = request.risk_caps[name];
      state[name] = { kind: 'cap', maxLoss: r2(maxLoss), premium: r2(premium) };
    } else {
      state[name] = { kind: 'none' };
    }
  }
  return state;
};

const flatten = (
  risksState: RisksState,
  request: WhatIfRequest,
): WhatIfRequest => {
  const disabled_risks: Record<string, number> = {};
  const risk_caps: Record<string, number[]> = {};

  for (const [name, mode] of Object.entries(risksState)) {
    if (mode.kind === 'insure') {
      disabled_risks[name] = mode.premium;
    } else if (mode.kind === 'cap') {
      risk_caps[name] = [mode.maxLoss, mode.premium];
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

  const prevValues = useRef<PrevValues>({});

  useEffect(() => {
    if (riskNames.length === 0) return;
    setRisks((prev) => {
      const next = { ...prev };
      for (const name of riskNames) {
        if (!(name in next)) next[name] = { kind: 'none' };
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskNames.join(',')]);

  useEffect(() => {
    onChange(flatten(risks, request));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [risks]);

  const fairPremiumMutation = useGetFairPremium();
  const lastFetchedRef = useRef<Record<string, number>>({});
  const presetAppliedRef = useRef<Set<string>>(new Set());
  const [loadingRisks, setLoadingRisks] = useState<Set<string>>(new Set());
  const [dynamicFairPrices, setDynamicFairPrices] = useState<DynamicFairPrice>(
    {},
  );

  const capInputKey = Object.entries(risks)
    .filter(([, m]) => m.kind === 'cap')
    .map(([n, m]) => `${n}:${(m as { maxLoss: number }).maxLoss}`)
    .join('|');

  const [debouncedCapKey] = useDebounce(capInputKey, 400);

  useEffect(() => {
    if (!debouncedCapKey) return;
    const entries = debouncedCapKey.split('|').filter(Boolean);
    for (const entry of entries) {
      const [riskName, maxLossStr] = entry.split(':');
      const maxLoss = Number(maxLossStr);
      if (!riskName || !maxLoss || maxLoss <= 0) continue;

      if (presetAppliedRef.current.has(riskName)) {
        presetAppliedRef.current.delete(riskName);
        lastFetchedRef.current[riskName] = maxLoss;
        continue;
      }

      if (lastFetchedRef.current[riskName] === maxLoss) continue;
      lastFetchedRef.current[riskName] = maxLoss;

      setLoadingRisks((prev) => new Set(prev).add(riskName));
      fairPremiumMutation.mutate(
        { risk_name: riskName, max_loss: maxLoss },
        {
          onSuccess: (data) => {
            setLoadingRisks((prev) => {
              const next = new Set(prev);
              next.delete(data.risk_name);
              return next;
            });
            setDynamicFairPrices((prev) => ({
              ...prev,
              [data.risk_name]: {
                maxLoss: data.max_loss ?? maxLoss,
                premium: r2(data.premium),
              },
            }));
            setRisks((prev) => {
              const current = prev[data.risk_name];
              if (!current || current.kind !== 'cap') return prev;
              if ((current as { maxLoss: number }).maxLoss !== data.max_loss)
                return prev;
              return {
                ...prev,
                [data.risk_name]: {
                  ...current,
                  premium: r2(data.premium),
                },
              };
            });
          },
          onError: () => {
            setLoadingRisks((prev) => {
              const next = new Set(prev);
              next.delete(riskName);
              return next;
            });
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCapKey]);

  const getStats = (name: string): RiskStats | undefined =>
    factors?.risks[name];

  const setMode = (name: string, kind: 'none' | 'insure' | 'cap') => {
    setRisks((prev) => {
      const current = prev[name];
      const stats = getStats(name);

      if (current?.kind === 'insure') {
        prevValues.current[name] = {
          ...prevValues.current[name],
          insure: { premium: current.premium },
        };
      } else if (current?.kind === 'cap') {
        prevValues.current[name] = {
          ...prevValues.current[name],
          cap: { maxLoss: current.maxLoss, premium: current.premium },
        };
      }

      if (kind === 'none') {
        delete lastFetchedRef.current[name];
        presetAppliedRef.current.delete(name);
        setDynamicFairPrices((prev) => ({ ...prev, [name]: undefined }));
        return { ...prev, [name]: { kind: 'none' } };
      }

      if (kind === 'insure') {
        delete lastFetchedRef.current[name];
        presetAppliedRef.current.delete(name);
        setDynamicFairPrices((prev) => ({ ...prev, [name]: undefined }));
        const saved = prevValues.current[name]?.insure;
        const premium = saved
          ? saved.premium
          : r2(stats?.fair_premium.full ?? 0);
        return { ...prev, [name]: { kind: 'insure', premium } };
      }

      const saved = prevValues.current[name]?.cap;
      if (saved) {
        return {
          ...prev,
          [name]: { kind: 'cap', maxLoss: saved.maxLoss, premium: saved.premium },
        };
      }
      const caps = stats?.fair_premium.caps ?? [];
      const medianCap = caps.length > 0
        ? caps[Math.floor(caps.length / 2)]
        : undefined;
      if (medianCap) presetAppliedRef.current.add(name);
      return {
        ...prev,
        [name]: {
          kind: 'cap',
          maxLoss: r2(medianCap?.max_loss ?? 0),
          premium: r2(medianCap?.premium ?? 0),
        },
      };
    });
  };

  const updateField = (
    name: string,
    field: 'premium' | 'maxLoss',
    val: number,
  ) => {
    setRisks((prev) => {
      const current = prev[name];
      if (!current || current.kind === 'none') return prev;
      if (current.kind === 'insure' && field === 'premium') {
        return { ...prev, [name]: { ...current, premium: val } };
      }
      if (current.kind === 'cap') {
        return { ...prev, [name]: { ...current, [field]: val } };
      }
      return prev;
    });
  };

  const applyCapPreset = useCallback(
    (name: string, cap: { max_loss: number; premium: number }) => {
      presetAppliedRef.current.add(name);
      setDynamicFairPrices((prev) => ({ ...prev, [name]: undefined }));
      setRisks((prev) => ({
        ...prev,
        [name]: {
          kind: 'cap',
          maxLoss: r2(cap.max_loss),
          premium: r2(cap.premium),
        },
      }));
    },
    [],
  );

  const isCapPresetActive = (
    mode: RiskMode & { kind: 'cap' },
    cap: { max_loss: number; premium: number },
  ) => r2(mode.maxLoss) === r2(cap.max_loss) && r2(mode.premium) === r2(cap.premium);

  const nearestCap = (stats: RiskStats, maxLoss: number) => {
    const caps = stats.fair_premium.caps;
    if (caps.length === 0) return undefined;
    return caps.reduce((best, c) =>
      Math.abs(c.max_loss - maxLoss) < Math.abs(best.max_loss - maxLoss)
        ? c
        : best,
    );
  };

  return (
    <GlassPanel $accent="tertiary">
      <PanelSectionHeader>
        <PanelSectionIcon $color="#f9bb4d">
          <MdHealthAndSafety />
        </PanelSectionIcon>
        <PanelSectionLabel>Risk Protection</PanelSectionLabel>
      </PanelSectionHeader>

      {riskEntries.map(([name, stats]) => {
        const mode = risks[name] ?? { kind: 'none' };
        const isGross = stats.fair_premium.basis === 'gross';
        const isLoading = loadingRisks.has(name);
        const dynamicPrice = dynamicFairPrices[name];

        return (
          <RiskCard key={name}>
            <RiskName>{name.replace(/_/g, ' ')}</RiskName>
            <ModeRow>
              {(['none', 'insure', 'cap'] as const).map((k) => (
                <ModeOption
                  key={k}
                  $active={mode.kind === k}
                  onClick={() => setMode(name, k)}
                >
                  <ModeRadio $active={mode.kind === k} />
                  <ModeLabel>
                    {k === 'none'
                      ? 'None'
                      : k === 'insure'
                        ? 'Full cover'
                        : 'Cap'}
                  </ModeLabel>
                </ModeOption>
              ))}
            </ModeRow>

            {mode.kind === 'none' && (
              <ExpectedLossHint>
                Expected annual loss: {formatCompact(stats.mean)} {currency}
              </ExpectedLossHint>
            )}

            {mode.kind === 'insure' && (
              <>
                <FieldRow>
                  <FieldGroup>
                    <RiskInputLabel>ANNUAL PREMIUM ({currency})</RiskInputLabel>
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
                  Fair price: {formatCompact(stats.fair_premium.full)} {currency}
                  {' '}(insurer break-even). Real quotes typically 1.5–2× this.
                </FairPremiumHint>
                {isGross && (
                  <GrossWarning>
                    Career Loss insurance covers gross income loss; severance is
                    kept on top. This is why the fair price is higher than the
                    displayed expected loss.
                  </GrossWarning>
                )}
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
                    <RiskInputLabel>
                      ANNUAL PREMIUM ({currency})
                      {isLoading && (
                        <LoadingDots>
                          <span />
                          <span />
                          <span />
                        </LoadingDots>
                      )}
                    </RiskInputLabel>
                    <PremiumFieldWrap $loading={isLoading}>
                      <RiskInputField
                        type="number"
                        value={mode.premium || ''}
                        placeholder="0"
                        onChange={(e) =>
                          updateField(name, 'premium', Number(e.target.value))
                        }
                      />
                    </PremiumFieldWrap>
                  </FieldGroup>
                </FieldRow>
                {(() => {
                  if (
                    dynamicPrice &&
                    r2(dynamicPrice.maxLoss) === r2(mode.maxLoss)
                  ) {
                    return (
                      <FairPremiumHint>
                        Fair price for this cap:{' '}
                        {formatCompact(dynamicPrice.premium)} {currency}
                      </FairPremiumHint>
                    );
                  }
                  const nearest = nearestCap(stats, mode.maxLoss);
                  return nearest ? (
                    <FairPremiumHint>
                      Fair price for this cap: {formatCompact(nearest.premium)}{' '}
                      {currency}
                    </FairPremiumHint>
                  ) : null;
                })()}
                {stats.fair_premium.caps.length > 0 && (
                  <>
                    {stats.fair_premium.caps.map((cap) => {
                      const active = isCapPresetActive(mode, cap);
                      return (
                        <CapOption
                          key={cap.max_loss}
                          onClick={() => applyCapPreset(name, cap)}
                          $active={active}
                        >
                          <CapOptionRadio $active={active} />
                          <CapOptionLabel>
                            Cap at {formatCompact(cap.max_loss)} {currency}
                          </CapOptionLabel>
                          <CapOptionValue>
                            {formatCompact(cap.premium)} {currency}/yr
                          </CapOptionValue>
                        </CapOption>
                      );
                    })}
                  </>
                )}
                {isGross && (
                  <GrossWarning>
                    Career Loss insurance covers gross income loss; severance is
                    kept on top. This is why the fair price is higher than the
                    displayed expected loss.
                  </GrossWarning>
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
