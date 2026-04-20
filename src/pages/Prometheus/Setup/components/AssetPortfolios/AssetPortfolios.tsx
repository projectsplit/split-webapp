import { SectionHeader } from '../SectionHeader/SectionHeader';
import { ASSET_CONFIGS } from './assets.data';
import { AssetCard } from './AssetCard/AssetCard';
import { NetSalaryCard } from './NetSalaryCard/NetSalaryCard';
import { Section, CardStack } from './AssetPortfolios.styled';

export const AssetPortfolios = () => {
  return (
    <Section>
      <SectionHeader
        title="Asset Portfolios"
        marker="Section 01 // Assets"
        tone="primary"
      />
      <CardStack>
        {ASSET_CONFIGS.map((config) => (
          <AssetCard key={config.id} config={config} />
        ))}
        <NetSalaryCard />
      </CardStack>
    </Section>
  );
};
