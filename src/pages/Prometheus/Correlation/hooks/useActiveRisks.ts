import { useMemo } from 'react';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';

export type RiskGroup = 'asset' | 'liability' | 'inflation';

export interface RiskItem {
  id: string;
  label: string;
  group: RiskGroup;
}

export const useActiveRisks = (
  setup: Signal<FinancialState>
): RiskItem[] => {
  const { financials, risk_toggles, custom_risks } = setup.value;

  return useMemo(() => {
    const items: RiskItem[] = [];

    if (risk_toggles.equities && financials.equity_value > 0) {
      items.push({ id: 'Equity', label: 'Equities', group: 'asset' });
    }
    if (risk_toggles.property && financials.property_value > 0) {
      items.push({ id: 'Property', label: 'Property', group: 'asset' });
    }
    if (risk_toggles.yields && financials.bond_value > 0) {
      items.push(
        { id: 'FI Level', label: 'FI Level', group: 'asset' },
        { id: 'FI Slope', label: 'FI Slope', group: 'asset' },
        { id: 'FI Curvature', label: 'FI Curvature', group: 'asset' }
      );
    }

    if (risk_toggles.inflation) {
      items.push(
        { id: 'Inflation Level', label: 'Inflation Level', group: 'inflation' },
        { id: 'Inflation Slope', label: 'Inflation Slope', group: 'inflation' }
      );
    }

    if (risk_toggles.career_loss && risk_toggles.career_pess_loss > 0) {
      items.push({ id: 'Career Loss', label: 'Job Loss', group: 'liability' });
    }

    custom_risks.forEach((risk) => {
      if (risk.pess_loss > 0 && risk.name.trim().length > 0) {
        items.push({ id: risk.name, label: risk.name, group: 'liability' });
      }
    });

    return items;
  }, [financials, risk_toggles, custom_risks]);
};
