import type { IconType } from 'react-icons';
import {
  MdStorm,
  MdTrendingDown,
  MdAccountTree,
  MdWarning,
} from 'react-icons/md';

export interface InsightModule {
  id: string;
  moduleNumber: string;
  icon: IconType;
  question: string;
  tag: string;
}

export const INSIGHT_MODULES: InsightModule[] = [
  {
    id: 'storm',
    moduleNumber: 'Insight Module 001',
    icon: MdStorm,
    question: "What does a '1-in-200 year' storm look like for me?",
    tag: 'VALUE AT RISK',
  },
  {
    id: 'correlation',
    moduleNumber: 'Insight Module 002',
    icon: MdTrendingDown,
    question:
      'If the stock market drops 20%, what is the mathematically likely impact on my specific property value?',
    tag: 'CORRELATION MATRIX',
  },
  {
    id: 'tail-risk',
    moduleNumber: 'Insight Module 003',
    icon: MdAccountTree,
    question: 'Which of my assets will fail me at the exact same time?',
    tag: 'TAIL RISK ANALYSIS',
  },
  {
    id: 'monte-carlo',
    moduleNumber: 'Insight Module 004',
    icon: MdWarning,
    question:
      "In my 'Worst 1%' of lives, what was the primary event that caused the collapse?",
    tag: 'MONTE CARLO SIM',
  },
];
