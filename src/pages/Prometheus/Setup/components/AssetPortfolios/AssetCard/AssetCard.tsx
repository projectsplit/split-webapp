import { useState } from 'react';
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
  const [secondary, setSecondary] = useState(
    config.secondarySelect.options[0]
  );

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
        <MoneyInput value={amount} onChange={setAmount} />
        <Grid>
          <SelectField
            value={primary}
            onChange={setPrimary}
            options={config.primarySelect.options}
            icon={config.primarySelect.icon}
          />
          <SelectField
            value={secondary}
            onChange={setSecondary}
            options={config.secondarySelect.options}
            icon={config.secondarySelect.icon}
          />
        </Grid>
      </CardBody>
    </CardWrapper>
  );
};
