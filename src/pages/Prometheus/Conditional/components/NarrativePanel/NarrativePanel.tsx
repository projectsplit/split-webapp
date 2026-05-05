import { MdPsychology } from 'react-icons/md';
import {
  Panel,
  IconWrap,
  TextBlock,
  Title,
  NarrativeText,
} from './NarrativePanel.styled';

interface NarrativePanelProps {
  narrative: string[];
}

export const NarrativePanel = ({ narrative }: NarrativePanelProps) => {
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
      </TextBlock>
    </Panel>
  );
};
