import {
  MdHistoryEdu,
  MdAutoStories,
  MdMedicalServices,
  MdCircle,
  MdLightbulb,
} from 'react-icons/md';
import { NarrativeSections } from '../../interfaces';
import {
  Panel,
  Header,
  Title,
  Section,
  SectionLabel,
  Paragraph,
  BulletList,
  Bullet,
  BulletIcon,
} from './SimulationNarrative.styled';

interface SimulationNarrativeProps {
  narrative: NarrativeSections;
}

const HIGHLIGHT_LAST_DIAGNOSIS = true;

export const SimulationNarrative = ({
  narrative,
}: SimulationNarrativeProps) => {
  const portrait = narrative.portrait?.filter(Boolean) ?? [];
  const diagnosis = narrative.diagnosis?.filter(Boolean) ?? [];

  if (portrait.length === 0 && diagnosis.length === 0) return null;

  return (
    <Panel>


      {portrait.length > 0 && (
        <Section>
          <SectionLabel $tone="portrait">
            <MdAutoStories />
            Portrait of a Ruinous Year
          </SectionLabel>
          {portrait.map((line, i) => (
            <Paragraph key={i}>{line}</Paragraph>
          ))}
        </Section>
      )}

      {diagnosis.length > 0 && (
        <Section>
          <SectionLabel $tone="diagnosis">
            <MdMedicalServices />
            Diagnosis
          </SectionLabel>
          <BulletList>
            {diagnosis.map((line, i) => {
              const isLast = i === diagnosis.length - 1;
              const highlight = HIGHLIGHT_LAST_DIAGNOSIS && isLast && diagnosis.length > 1;
              return (
                <Bullet key={i} $highlight={highlight}>
                  <BulletIcon $highlight={highlight}>
                    {highlight ? <MdLightbulb /> : <MdCircle />}
                  </BulletIcon>
                  <span>{line}</span>
                </Bullet>
              );
            })}
          </BulletList>
        </Section>
      )}
    </Panel>
  );
};
