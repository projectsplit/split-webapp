import {
  MdPsychology,
  MdLightbulbOutline,
  MdInsights,
  MdAutoAwesome,
  MdScience,
  MdTrendingUp,
  MdTrendingDown,
  MdWarningAmber,
  MdShield,
  MdBolt,
  MdHorizontalRule,
} from 'react-icons/md';
import { formatFactorName } from '@/pages/Prometheus/Conditional/utils';
import { SweepNarrative } from '../../interfaces';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  Section,
  HeaderLabel,
  BodyLabel,
  ConclusionLabel,
  HeaderText,
  ConclusionText,
  BodyList,
  BodyItem,
  BodyIcon,
  BodyText,
  FactorBlock,
  FactorEntry,
  FactorTitle,
  FactorLine,
} from './NarrativePanel.styled';

interface SweepNarrativePanelProps {
  narrative: SweepNarrative;
  factorExplanations?: Record<string, string[]>;
  bondTenor: number;
}

const RISE = /\b(rises?|increases?|spikes?|jumps?|grows?|climbs?|amplif|magnif|elevate)\b/i;
const FALL = /\b(falls?|drops?|decreases?|declines?|reduces?|shrinks?|diminish)\b/i;
const RUIN = /\b(ruin|bust|bankruptc|insolven|wipe|catastroph)\b/i;
const SAFE = /\b(safe|protect|cushion|resilien|robust|stable|holds?\s+up)\b/i;
const WARN = /\b(caution|warn|risk|danger|wide ci|insufficien|uncertain|wide confidence)\b/i;
const NEUTRAL = /\b(unchanged|baseline|same as|no significant|no material)\b/i;

const getBodyIcon = (text: string) => {
  if (RUIN.test(text) && RISE.test(text))
    return { icon: <MdBolt />, color: '#ef4444' };
  if (RUIN.test(text) && FALL.test(text))
    return { icon: <MdShield />, color: '#4ae176' };
  if (WARN.test(text)) return { icon: <MdWarningAmber />, color: '#f9bb4d' };
  if (RISE.test(text)) return { icon: <MdTrendingUp />, color: '#ef4444' };
  if (FALL.test(text)) return { icon: <MdTrendingDown />, color: '#4ae176' };
  if (SAFE.test(text)) return { icon: <MdShield />, color: '#4ae176' };
  if (NEUTRAL.test(text))
    return { icon: <MdHorizontalRule />, color: '#968e99' };
  return { icon: <MdInsights />, color: '#ddb7ff' };
};

export const SweepNarrativePanel = ({
  narrative,
  factorExplanations,
  bondTenor,
}: SweepNarrativePanelProps) => {
  const factorEntries = factorExplanations
    ? Object.entries(factorExplanations).filter(([, lines]) => lines.length > 0)
    : [];

  const hasHeader = narrative.header && narrative.header.length > 0;
  const hasBody = narrative.body && narrative.body.length > 0;
  const hasConclusion = narrative.conclusion && narrative.conclusion.length > 0;

  return (
    <Panel>
      <PanelHeader>
        <MdPsychology />
        <PanelTitle>Narrative Intelligence</PanelTitle>
      </PanelHeader>

      {hasHeader && (
        <Section $tone="header">
          <HeaderLabel>
            <MdLightbulbOutline />
            Overview
          </HeaderLabel>
          {narrative.header.map((line, i) => (
            <HeaderText key={i}>{line}</HeaderText>
          ))}
        </Section>
      )}

      {hasBody && (
        <Section $tone="body">
          <BodyLabel>
            <MdInsights />
            Findings
          </BodyLabel>
          <BodyList>
            {narrative.body.map((line, i) => {
              const { icon, color } = getBodyIcon(line);
              return (
                <BodyItem key={i}>
                  <BodyIcon $color={color}>{icon}</BodyIcon>
                  <BodyText>{line}</BodyText>
                </BodyItem>
              );
            })}
          </BodyList>
        </Section>
      )}

      {hasConclusion && (
        <Section $tone="conclusion">
          <ConclusionLabel>
            <MdAutoAwesome />
            Takeaway
          </ConclusionLabel>
          {narrative.conclusion.map((line, i) => (
            <ConclusionText key={i}>{line}</ConclusionText>
          ))}
        </Section>
      )}

      {factorEntries.length > 0 && (
        <FactorBlock>
          {factorEntries.map(([factor, lines]) => (
            <FactorEntry key={factor}>
              <FactorTitle>
                <MdScience />
                {formatFactorName(factor, bondTenor)}
              </FactorTitle>
              {lines.map((line, i) => (
                <FactorLine key={i}>{line}</FactorLine>
              ))}
            </FactorEntry>
          ))}
        </FactorBlock>
      )}
    </Panel>
  );
};
