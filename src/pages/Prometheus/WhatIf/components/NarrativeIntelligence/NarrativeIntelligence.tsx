import {
  MdPsychology,
  MdArrowUpward,
  MdArrowDownward,
  MdShield,
  MdCancel,
  MdWarning,
} from 'react-icons/md';
import { WhatIfNarrative } from '../../interfaces';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  Headline,
  ImpactList,
  ImpactItem,
  ImpactIcon,
  ImpactText,
} from './NarrativeIntelligence.styled';

interface NarrativeIntelligenceProps {
  narrative: WhatIfNarrative;
}

const FALL_PATTERNS = /\b(falls by|decreases? by|declines? by|drops? by|loses?|lower)\b/i;
const RISE_PATTERNS = /\b(rises? by|increases? by|grows? by|gains?|higher)\b/i;
const RUIN_PATTERN = /\b(ruin|bust|bankruptcy)\b/i;

const getIcon = (text: string) => {
  const lower = text.toLowerCase();
  const isFalling = FALL_PATTERNS.test(text);
  const isRising = RISE_PATTERNS.test(text);
  const isRuin = RUIN_PATTERN.test(text);

  if (isRuin) {
    if (isFalling) return { icon: <MdShield />, color: '#4ae176' };
    if (isRising) return { icon: <MdCancel />, color: '#e5574f' };
    return { icon: <MdShield />, color: '#4ae176' };
  }

  if (isFalling)
    return { icon: <MdArrowDownward />, color: '#e5574f' };

  if (
    lower.includes('drop') ||
    lower.includes('warning') ||
    lower.includes('worse') ||
    lower.includes('shrink')
  )
    return { icon: <MdWarning />, color: '#ffddaa' };

  if (lower.includes('improves') || lower.includes('downside'))
    return { icon: <MdShield />, color: '#4ae176' };

  return { icon: <MdArrowUpward />, color: '#4ae176' };
};

export const NarrativeIntelligence = ({
  narrative,
}: NarrativeIntelligenceProps) => {
  return (
    <Panel>
      <PanelHeader>
        <MdPsychology />
        <PanelTitle>Narrative Intelligence</PanelTitle>
      </PanelHeader>

      <Headline>{narrative.headline}</Headline>

      <ImpactList>
        {narrative.impact.map((item, i) => {
          const { icon, color } = getIcon(item);
          return (
            <ImpactItem key={i}>
              <ImpactIcon $color={color}>{icon}</ImpactIcon>
              <ImpactText>{item}</ImpactText>
            </ImpactItem>
          );
        })}
      </ImpactList>
    </Panel>
  );
};
