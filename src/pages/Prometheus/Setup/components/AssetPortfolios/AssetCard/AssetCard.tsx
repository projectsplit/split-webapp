import { useEffect, useMemo, useState } from 'react';
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

interface AssetCardProps {
  config: AssetConfig;
}

export const AssetCard = ({ config }: AssetCardProps) => {
  const Icon = config.icon;

  const [enabled, setEnabled] = useState(config.defaultEnabled);
  const [amount, setAmount] = useState(config.defaultAmount);
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

  const currencyInfo = useMemo(() => {
    const s = secondary.toLowerCase();
    if (config.id === 'property') {
      if (s.includes('north america')) return { symbol: '$', label: 'USD' };
      if (s.includes('europe')) return { symbol: '€', label: 'EUR' };
      if (s.includes('uk')) return { symbol: '£', label: 'GBP' };
    }
    if (config.id === 'fixed-income') {
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
    <CardWrapper>
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
          onChange={setAmount}
          currencySymbol={currencyInfo.symbol}
          currencyLabel={currencyInfo.label}
        />
        <Grid>
          {(config.id === 'equities' || config.id === 'fixed-income') && (
            <SelectField
              value={primary}
              onChange={setPrimary}
              options={primaryOptions}
              icon={config.primarySelect.icon}
            />
          )}
          {(config.id === 'property' ||
            config.id === 'savings' ||
            config.id === 'fixed-income') && (
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
