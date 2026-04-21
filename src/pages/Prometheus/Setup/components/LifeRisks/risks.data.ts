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
  frequencyOptions: string[];
  defaultOptimisticDuration: string;
  defaultPessimisticDuration: string;
  filledIcon?: boolean;
}

export const RISK_CONFIGS: RiskConfig[] = [
  {
    id: 'job-loss',
    title: 'Job Loss / Redundancy',
    icon: MdWorkOff,
    variant: 'primary',
    amountLabel: 'Redundancy Package (Amount)',
    defaultAmount: '25,000',
    frequencyOptions: [
      '1 every 2 years ',
      '1 every 3 years ',
      '1 every 4 years',
      '1 every 5 years',
      '1 every 6 years',
      '1 every 7 years',
      '1 every 8 years',
      '1 every 9 years',
      '1 every 10 years',
    ],
    defaultOptimisticDuration: '2 months',
    defaultPessimisticDuration: '12 months',
    filledIcon: true,
  },
];
