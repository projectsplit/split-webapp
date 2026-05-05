import { MdPsychology, MdShield, MdArrowUpward, MdWarning } from 'react-icons/md';
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

const getIcon = (text: string) => {
  const lower = text.toLowerCase();
  if (
    lower.includes('drop') ||
    lower.includes('warning') ||
    lower.includes('worse') ||
    lower.includes('shrink')
  )
    return { icon: <MdWarning />, color: '#ffddaa' };
  if (
    lower.includes('ruin') ||
    lower.includes('probability') ||
    lower.includes('downside') ||
    lower.includes('improves')
  )
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
