import { SectionHeader } from '../SectionHeader/SectionHeader';
import { RISK_CONFIGS } from './risks.data';
import { RiskCard } from './RiskCard/RiskCard';
import { AddRiskButton } from './AddRiskButton/AddRiskButton';
import { Section, Stack } from './LifeRisks.styled';

export const LifeRisks = () => {
  return (
    <Section>
      <SectionHeader
        title="Life Risks"
        marker="Section 02 // Hazards"
        tone="error"
      />
      <Stack>
        {RISK_CONFIGS.map((config) => (
          <RiskCard key={config.id} config={config} />
        ))}
        <AddRiskButton />
      </Stack>
    </Section>
  );
};
