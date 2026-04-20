import type { IconType } from 'react-icons';
import { MdWorkOff, MdHomeRepairService } from 'react-icons/md';

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
      '1 every 5 years (p=0.2)',
      '1 every 10 years (p=0.1)',
      '1 every 2 years (p=0.5)',
    ],
    defaultOptimisticDuration: '2 months',
    defaultPessimisticDuration: '12 months',
    filledIcon: true,
  },
  {
    id: 'home-damage',
    title: 'Critical Home Damage',
    icon: MdHomeRepairService,
    variant: 'secondary',
    preset: 'PRE-SET_04',
    amountLabel: 'Repair Deductible / Out-of-pocket',
    defaultAmount: '15,000',
    frequencyOptions: [
      '1 every 20 years (p=0.05)',
      '1 every 15 years (p=0.06)',
      '1 every 50 years (p=0.02)',
    ],
    defaultOptimisticDuration: '1 month',
    defaultPessimisticDuration: '4 months',
  },
];
