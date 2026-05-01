import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import { Wrapper, Label, OptionButton } from './EconomySelector.styled';

const ECONOMIES = ['US', 'Europe', 'UK'] as const;

interface EconomySelectorProps {
  setup: Signal<FinancialState>;
}

export const EconomySelector = ({ setup }: EconomySelectorProps) => {
  const current = setup.value.economy;

  const handleSelect = (economy: string) => {
    setup.value = { ...setup.value, economy };
  };

  return (
    <Wrapper>
      <Label>Economy</Label>
      {ECONOMIES.map((eco) => (
        <OptionButton
          key={eco}
          $active={current === eco}
          onClick={() => handleSelect(eco)}
        >
          {eco}
        </OptionButton>
      ))}
    </Wrapper>
  );
};
