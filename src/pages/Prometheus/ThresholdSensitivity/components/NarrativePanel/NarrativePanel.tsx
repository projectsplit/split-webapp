import { MdPsychology } from 'react-icons/md';
import { formatFactorName } from '@/pages/Prometheus/Conditional/utils';
import {
  Panel,
  IconWrap,
  TextBlock,
  Title,
  NarrativeText,
  FactorBlock,
  FactorTitle,
  FactorExplanationLine,
} from '@/pages/Prometheus/Conditional/components/NarrativePanel/NarrativePanel.styled';

interface SweepNarrativePanelProps {
  narrative: string[];
  factorExplanations?: Record<string, string[]>;
  bondTenor: number;
}

export const SweepNarrativePanel = ({
  narrative,
  factorExplanations,
  bondTenor,
}: SweepNarrativePanelProps) => {
  const factorEntries = factorExplanations
    ? Object.entries(factorExplanations).filter(([, lines]) => lines.length > 0)
    : [];

  return (
    <Panel>
      <IconWrap>
        <MdPsychology />
      </IconWrap>
      <TextBlock>
        <Title>Narrative Intelligence</Title>
        {narrative.map((line, i) => (
          <NarrativeText key={i}>{line}</NarrativeText>
        ))}

        {factorEntries.map(([factor, lines]) => (
          <FactorBlock key={factor}>
            <FactorTitle>{formatFactorName(factor, bondTenor)}</FactorTitle>
            {lines.map((line, i) => (
              <FactorExplanationLine key={i}>{line}</FactorExplanationLine>
            ))}
          </FactorBlock>
        ))}
      </TextBlock>
    </Panel>
  );
};
