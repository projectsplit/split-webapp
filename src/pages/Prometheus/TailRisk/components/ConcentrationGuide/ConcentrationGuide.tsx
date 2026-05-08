import {
  MdPsychology,
  MdFilterListOff,
  MdFilterList,
  MdPriorityHigh,
  MdEmergency,
} from 'react-icons/md';
import {
  Panel,
  Header,
  Title,
  TierGrid,
  TierCard,
  TierHead,
  TierLabel,
  TierText,
} from './ConcentrationGuide.styled';

interface Tier {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  text: string;
}

const TIERS: Tier[] = [
  {
    label: '|z| < 0.5 — No concentration',
    color: 'rgba(150, 142, 153, 0.85)',
    bg: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(255, 255, 255, 0.06)',
    icon: <MdFilterListOff />,
    text: 'This factor behaves similarly in the tail as it does overall. Not a meaningful driver of bad outcomes.',
  },
  {
    label: '0.5 ≤ |z| < 1.5 — Mild concentration',
    color: 'rgba(74, 225, 118, 0.85)',
    bg: 'rgba(74, 225, 118, 0.06)',
    border: 'rgba(74, 225, 118, 0.18)',
    icon: <MdFilterList />,
    text: 'Tilts toward worse values in the tail. Contributes to poor outcomes but is not dominant on its own.',
  },
  {
    label: '1.5 ≤ |z| < 3 — Strong concentration',
    color: 'rgba(251, 191, 36, 0.9)',
    bg: 'rgba(251, 191, 36, 0.06)',
    border: 'rgba(251, 191, 36, 0.25)',
    icon: <MdPriorityHigh />,
    text: 'Significantly more extreme in the worst paths than across the population. A major driver of ruin.',
  },
  {
    label: '|z| ≥ 3 — Severe concentration',
    color: 'rgba(239, 68, 68, 0.95)',
    bg: 'rgba(239, 68, 68, 0.08)',
    border: 'rgba(239, 68, 68, 0.35)',
    icon: <MdEmergency />,
    text: 'Overwhelmingly concentrated in the tail. The worst paths are almost defined by extreme realisations of this risk — a dominant, structural driver.',
  },
];

export const ConcentrationGuide = () => (
  <Panel>
    <Header>
      <MdPsychology />
      <Title>Concentration Guide</Title>
    </Header>
    <TierGrid>
      {TIERS.map((tier) => (
        <TierCard
          key={tier.label}
          $color={tier.color}
          $bg={tier.bg}
          $border={tier.border}
        >
          <TierHead $color={tier.color}>
            {tier.icon}
            <TierLabel>{tier.label}</TierLabel>
          </TierHead>
          <TierText>{tier.text}</TierText>
        </TierCard>
      ))}
    </TierGrid>
  </Panel>
);
