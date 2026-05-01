import { SectionHeader } from '../SectionHeader/SectionHeader';
import { ASSET_CONFIGS } from './assets.data';
import { AssetCard } from './AssetCard/AssetCard';
import { NetSalaryCard } from './NetSalaryCard/NetSalaryCard';
import { Section, CardStack } from './AssetPortfolios.styled';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';

interface AssetPortfloliosProps {
  setup: Signal<FinancialState>;
}

export const AssetPortfolios = ({ setup }: AssetPortfloliosProps) => {
  return (
    <Section>
      <SectionHeader
        title="Asset Portfolios"
        marker="Section 01 // Assets"
        tone="primary"
      />
      <CardStack>
        {ASSET_CONFIGS.map((config) => (
          <AssetCard key={config.id} config={config} setup={setup} />
        ))}
        <NetSalaryCard setup={setup} />
      </CardStack>
    </Section>
  );
};
