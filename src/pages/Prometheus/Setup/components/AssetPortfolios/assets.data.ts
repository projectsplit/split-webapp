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
  optionsFor?: (dependentValue: string) => string[];
}

const buildDurations = (maxYears: number): string[] =>
  Array.from({ length: maxYears }, (_, i) => `Duration: ${i + 1}Y`);

const YIELD_US_TREASURY = 'Yield: US Treasury';
const YIELD_UK_GILT = 'Yield: UK Gilt';
const YIELD_EU_SOVEREIGN = 'Yield: EU (GER) sovereign';

const durationOptionsForYield = (yieldValue: string): string[] => {
  if (yieldValue === YIELD_UK_GILT) return buildDurations(25);
  if (yieldValue === YIELD_EU_SOVEREIGN) return buildDurations(20);
  
  return buildDurations(30);
};

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
    defaultEnabled: false,
    defaultAmount: '',
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
      options: buildDurations(20),
      optionsFor: durationOptionsForYield,
    },
    secondarySelect: {
      icon: MdTrendingUp,
      options: [YIELD_US_TREASURY, YIELD_UK_GILT, YIELD_EU_SOVEREIGN],
    },
  },
  {
    id: 'savings',
    title: 'Savings & Cash',
    subtitle: 'Liquid Capital Reserves',
    icon: MdAccountBalance,
    defaultEnabled: true,
    defaultAmount: '',
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
