import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { RISK_CONFIGS } from './risks.data';
import { RiskCard } from './RiskCard/RiskCard';
import { CustomRiskCard } from './CustomRiskCard/CustomRiskCard';
import { AddRiskButton } from './AddRiskButton/AddRiskButton';
import { Section, Stack } from './LifeRisks.styled';
import { ExpenseRisk } from './ExpenseRisk/ExpenseRisk';

interface LifeRisksProps {
  setup: Signal<FinancialState>;
}

export const LifeRisks = ({ setup }: LifeRisksProps) => {
  const hasSalary = setup.value.financials.net_salary > 0;

  const handleAddRisk = () => {
    setup.value = {
      ...setup.value,
      custom_risks: [
        ...setup.value.custom_risks,
        {
          name: 'New Risk',
          once_every_x_years: 5,
          opt_loss: 0,
          pess_loss: 0,
          recoverable: 0,
          attributable: 0,
        },
      ],
    };
  };

  const updateCustomRisk = (
    index: number,
    patch: Partial<FinancialState['custom_risks'][number]>
  ) => {
    setup.value = {
      ...setup.value,
      custom_risks: setup.value.custom_risks.map((risk, i) =>
        i === index ? { ...risk, ...patch } : risk
      ),
    };
  };

  const removeCustomRisk = (index: number) => {
    setup.value = {
      ...setup.value,
      custom_risks: setup.value.custom_risks.filter((_, i) => i !== index),
    };
  };

  return (
    <Section>
      <SectionHeader
        title="Life Liabilities"
        marker="Section 02 // Hazards"
        tone="error"
      />
      <Stack>
        {RISK_CONFIGS.filter(
          (config) => config.id !== 'job-loss' || hasSalary
        ).map((config) => (
          <RiskCard key={config.id} config={config} setup={setup} />
        ))}
        <ExpenseRisk />
        {setup.value.custom_risks.map((risk, index) => (
          <CustomRiskCard
            key={index}
            risk={risk}
            onChange={(patch) => updateCustomRisk(index, patch)}
            onRemove={() => removeCustomRisk(index)}
          />
        ))}
        <AddRiskButton onClick={handleAddRisk} />
      </Stack>
    </Section>
  );
};
