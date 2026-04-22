import { useEffect, useMemo, useRef, useState } from 'react';
import type { AssetConfig } from '../assets.data';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { SelectField } from '../../../shared/SelectField/SelectField';
import { ToggleSwitch } from '../../../shared/ToggleSwitch/ToggleSwitch';
import {
  CardWrapper,
  CardHeader,
  HeaderLeft,
  IconBox,
  TitleBlock,
  CardTitle,
  CardSubtitle,
  CardBody,
  Grid,
} from './AssetCard.styled';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';

interface AssetCardProps {
  config: AssetConfig;
  setup: Signal<FinancialState>;
}

export const AssetCard = ({ config, setup }: AssetCardProps) => {
  const Icon = config.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const enabled = config.toggleKey
    ? (setup.value.risk_toggles[config.toggleKey] as boolean)
    : config.defaultEnabled;

  const [amount, setAmount] = useState(
    setup.value.financials[config.amountKey]
      ? setup.value.financials[config.amountKey].toLocaleString('en-US')
      : ''
  );

  // Sync local amount string if the signal is updated from elsewhere
  useEffect(() => {
    const signalValue = setup.value.financials[config.amountKey];
    const currentLocalClean = Number(amount.replace(/,/g, ''));
    if (signalValue !== currentLocalClean) {
      setAmount(signalValue ? signalValue.toLocaleString('en-US') : '');
    }
  }, [setup.value.financials[config.amountKey]]);

  const setEnabled = (next: boolean) => {
    if (!config.toggleKey) return;
    setup.value = {
      ...setup.value,
      risk_toggles: {
        ...setup.value.risk_toggles,
        [config.toggleKey]: next,
      },
    };
  };

  const handleAmountChange = (next: string) => {
    setAmount(next);
    const parsed = Number(next.replace(/,/g, ''));
    const value = Number.isFinite(parsed) ? parsed : 0;
    const shouldEnable = value !== 0 && config.toggleKey && !enabled;

    setup.value = {
      ...setup.value,
      financials: {
        ...setup.value.financials,
        [config.amountKey]: value,
      },
      ...(shouldEnable && config.toggleKey
        ? {
            risk_toggles: {
              ...setup.value.risk_toggles,
              [config.toggleKey]: true,
            },
          }
        : {}),
    };
  };

  const [primary, setPrimary] = useState(config.primarySelect.options[0]);
  const [secondary, setSecondary] = useState(config.secondarySelect.options[0]);

  const primaryOptions = useMemo(
    () =>
      config.primarySelect.optionsFor
        ? config.primarySelect.optionsFor(secondary)
        : config.primarySelect.options,
    [config.primarySelect, secondary]
  );

  useEffect(() => {
    if (!primaryOptions.includes(primary)) {
      setPrimary(primaryOptions[0]);
    }
  }, [primaryOptions, primary]);

  useEffect(() => {
    if (!config.toggleKey) return;
    const handler = (event: MouseEvent) => {
      if (cardRef.current && cardRef.current.contains(event.target as Node)) {
        return;
      }
      const currentAmount = setup.value.financials[config.amountKey];
      const currentlyEnabled = config.toggleKey
        ? (setup.value.risk_toggles[config.toggleKey] as boolean)
        : false;
      if (currentAmount === 0 && currentlyEnabled && config.toggleKey) {
        setup.value = {
          ...setup.value,
          risk_toggles: {
            ...setup.value.risk_toggles,
            [config.toggleKey]: false,
          },
        };
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [config.toggleKey, config.amountKey, setup]);

  const currencyInfo = useMemo(() => {
    const s = secondary.toLowerCase();
    if (config.id === 'property') {
      if (s.includes('north america')) return { symbol: '$', label: 'USD' };
      if (s.includes('europe')) return { symbol: '€', label: 'EUR' };
      if (s.includes('uk')) return { symbol: '£', label: 'GBP' };
    }
    if (config.id === 'yields') {
      if (s.includes('us treasury')) return { symbol: '$', label: 'USD' };
      if (s.includes('uk gilt')) return { symbol: '£', label: 'GBP' };
      if (s.includes('eu')) return { symbol: '€', label: 'EUR' };
    }
    if (config.id === 'savings') {
      if (s.includes('usd')) return { symbol: '$', label: 'USD' };
      if (s.includes('eur')) return { symbol: '€', label: 'EUR' };
      if (s.includes('gbp')) return { symbol: '£', label: 'GBP' };
    }
    return { symbol: '$', label: 'USD' };
  }, [config.id, secondary]);

  return (
    <CardWrapper ref={cardRef}>
      <CardHeader>
        <HeaderLeft>
          <IconBox>
            <Icon />
          </IconBox>
          <TitleBlock>
            <CardTitle>{config.title}</CardTitle>
            <CardSubtitle>{config.subtitle}</CardSubtitle>
          </TitleBlock>
        </HeaderLeft>
        <ToggleSwitch
          checked={enabled}
          onChange={setEnabled}
          ariaLabel={`Enable ${config.title}`}
        />
      </CardHeader>

      <CardBody>
        <MoneyInput
          value={amount}
          onChange={handleAmountChange}
          currencySymbol={currencyInfo.symbol}
          currencyLabel={currencyInfo.label}
        />
        <Grid>
          {(config.id === 'equities' || config.id === 'yields') && (
            <SelectField
              value={primary}
              onChange={setPrimary}
              options={primaryOptions}
              icon={config.primarySelect.icon}
            />
          )}
          {(config.id === 'property' ||
            config.id === 'savings' ||
            config.id === 'yields') && (
            <SelectField
              value={secondary}
              onChange={setSecondary}
              options={config.secondarySelect.options}
              icon={config.secondarySelect.icon}
            />
          )}
        </Grid>
      </CardBody>
    </CardWrapper>
  );
};
