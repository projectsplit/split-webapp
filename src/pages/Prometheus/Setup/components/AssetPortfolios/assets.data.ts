import type { IconType } from 'react-icons';
import {
  MdShowChart,
  MdDomain,
  MdPayments,
  MdAccountBalance,
  MdExpandMore,
  MdPublic,
  MdTrendingUp,
} from 'react-icons/md';

export interface AssetSelectConfig {
  options: string[];
  icon: IconType;
}

export interface AssetConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: IconType;
  defaultEnabled: boolean;
  defaultAmount: string;
  primarySelect: AssetSelectConfig;
  secondarySelect: AssetSelectConfig;
}

export const ASSET_CONFIGS: AssetConfig[] = [
  {
    id: 'equities',
    title: 'Equities Portfolio',
    subtitle: 'Publicly Traded Securities',
    icon: MdShowChart,
    defaultEnabled: true,
    defaultAmount: '452000',
    primarySelect: {
      icon: MdExpandMore,
      options: [
        'Benchmark: S&P 500',
        'Benchmark: FTSE 100',
        'Benchmark: NASDAQ 100',
        'Benchmark: MSCI World',
      ],
    },
    secondarySelect: {
      icon: MdPublic,
      options: [
        'Geography: US',
        'Geography: EU',
        'Geography: UK',
        'Geography: APAC',
        'Geography: Global',
      ],
    },
  },
  {
    id: 'property',
    title: 'Property Portfolio',
    subtitle: 'Real Estate Assets',
    icon: MdDomain,
    defaultEnabled: false,
    defaultAmount: '',
    primarySelect: {
      icon: MdExpandMore,
      options: ['Type: Residential', 'Type: Commercial', 'Type: Land'],
    },
    secondarySelect: {
      icon: MdPublic,
      options: ['Region: North America', 'Region: Europe', 'Region: UK'],
    },
  },
  {
    id: 'fixed-income',
    title: 'Fixed Income',
    subtitle: 'Bonds & Fixed Assets',
    icon: MdPayments,
    defaultEnabled: false,
    defaultAmount: '',
    primarySelect: {
      icon: MdExpandMore,
      options: ['Duration: 1-3Y', 'Duration: 5-10Y', 'Duration: 10Y+'],
    },
    secondarySelect: {
      icon: MdTrendingUp,
      options: ['Yield: US Treasury', 'Yield: Corporate', 'Yield: High Yield'],
    },
  },
  {
    id: 'savings',
    title: 'Savings & Cash',
    subtitle: 'Liquid Capital Reserves',
    icon: MdAccountBalance,
    defaultEnabled: true,
    defaultAmount: '84000',
    primarySelect: {
      icon: MdExpandMore,
      options: [
        'Account: High Yield',
        'Account: Checking',
        'Account: Money Market',
      ],
    },
    secondarySelect: {
      icon: MdPayments,
      options: ['Currency: USD', 'Currency: EUR', 'Currency: GBP'],
    },
  },
];
