import { MdBalance } from 'react-icons/md';
import { WhatIfNarrative } from '../../interfaces';
import {
  SummaryPanel,
  SummaryIcon,
  SummaryContent,
  SummaryLabel,
  SummaryText,
} from './StrategicSummary.styled';

interface StrategicSummaryProps {
  narrative: WhatIfNarrative;
}

export const StrategicSummary = ({ narrative }: StrategicSummaryProps) => {
  return (
    <SummaryPanel>
      <SummaryIcon>
        <MdBalance />
      </SummaryIcon>
      <SummaryContent>
        <SummaryLabel>STRATEGIC SUMMARY</SummaryLabel>
        <SummaryText>{narrative.summary}</SummaryText>
      </SummaryContent>
    </SummaryPanel>
  );
};
