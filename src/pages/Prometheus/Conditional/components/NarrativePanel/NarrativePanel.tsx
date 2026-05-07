import { MdPsychology } from 'react-icons/md';
import { formatFactorName } from '../../utils';
import {
  Panel,
  IconWrap,
  TextBlock,
  Title,
  NarrativeText,
  FactorBlock,
  FactorTitle,
  FactorExplanationLine,
} from './NarrativePanel.styled';

interface NarrativePanelProps {
  narrative: string[];
  factorExplanations?: Record<string, string[]>;
  bondTenor: number;
}

export const NarrativePanel = ({
  narrative,
  factorExplanations,
  bondTenor,
}: NarrativePanelProps) => {
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
