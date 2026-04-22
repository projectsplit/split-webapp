import type { IconType } from 'react-icons';
import { MdWorkOff } from 'react-icons/md';

export type RiskVariant = 'primary' | 'secondary';

export interface RiskConfig {
  id: string;
  title: string;
  icon: IconType;
  variant: RiskVariant;
  preset?: string;
  amountLabel: string;
  defaultAmount: string;
  defaultFrequencyYears: number;
  defaultOptimisticMonths: number;
  defaultPessimisticMonths: number;
  filledIcon?: boolean;
}

export const RISK_CONFIGS: RiskConfig[] = [
  {
    id: 'job-loss',
    title: 'Job Loss / Redundancy',
    icon: MdWorkOff,
    variant: 'primary',
    amountLabel: 'Redundancy Package (Amount)',
    defaultAmount: '0',
    defaultFrequencyYears: 5,
    defaultOptimisticMonths: 2,
    defaultPessimisticMonths: 12,
    filledIcon: true,
  },
];
