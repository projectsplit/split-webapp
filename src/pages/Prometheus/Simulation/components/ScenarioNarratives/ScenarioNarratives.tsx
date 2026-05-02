import {
  MdTrendingUp,
  MdTrendingDown,
  MdWarning,
  MdNorthEast,
  MdSouthEast,
  MdError,
  MdReport,
} from 'react-icons/md';
import { GiSkullCrossedBones } from 'react-icons/gi';
import { SimulationScenario } from '../../interfaces';
import { findScenario } from '../../utils/findScenario';
import {
  buildBestEstimate,
  buildDifficultYear,
  buildRoughYear,
  buildNightmare,
} from '../../utils/buildNarrative';
import {
  NarrativesGrid,
  ScenarioCard,
  CardTop,
  CardTitleBlock,
  IconBox,
  PercentileLabel,
  CardTitle,
  NarrativeText,
  CornerIcon,
} from './ScenarioNarratives.styled';

interface ScenarioNarrativesProps {
  scenarios: SimulationScenario[];
  startingWealth: number;
}

interface CardConfig {
  variant: 'best' | 'difficult' | 'rough' | 'nightmare';
  percentile: number;
  label: string;
  title: string;
  icon: React.ReactNode;
  cornerIcon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  labelColor: string;
  hoverTitleColor: string;
  builder: (s: SimulationScenario, startingWealth: number) => string;
}

const CARDS: CardConfig[] = [
  {
    variant: 'best',
    percentile: 50,
    label: '50th Percentile',
    title: 'Best Estimate for year ahead',
    icon: <MdTrendingUp />,
    cornerIcon: <MdNorthEast />,
    iconBg: 'rgba(221, 183, 255, 0.1)',
    iconColor: '#ddb7ff',
    labelColor: '#968e99',
    hoverTitleColor: '#ddb7ff',
    builder: buildBestEstimate,
  },
  {
    variant: 'difficult',
    percentile: 10,
    label: '10th Percentile',
    title: 'Difficult Year',
    icon: <MdTrendingDown />,
    cornerIcon: <MdSouthEast />,
    iconBg: 'rgba(249, 187, 77, 0.1)',
    iconColor: '#f9bb4d',
    labelColor: '#968e99',
    hoverTitleColor: '#f9bb4d',
    builder: buildDifficultYear,
  },
  {
    variant: 'rough',
    percentile: 5,
    label: '5th Percentile',
    title: 'Rough Year',
    icon: <MdWarning />,
    cornerIcon: <MdError />,
    iconBg: 'rgba(255, 180, 171, 0.1)',
    iconColor: '#ffb4ab',
    labelColor: '#968e99',
    hoverTitleColor: '#ffb4ab',
    builder: buildRoughYear,
  },
  {
    variant: 'nightmare',
    percentile: 0.5,
    label: '0.5th Percentile',
    title: 'Nightmare Scenario',
    icon: <GiSkullCrossedBones />,
    cornerIcon: <MdReport />,
    iconBg: 'rgba(239, 68, 68, 0.2)',
    iconColor: '#ef4444',
    labelColor: 'rgba(239, 68, 68, 0.7)',
    hoverTitleColor: '#ef4444',
    builder: buildNightmare,
  },
];

export const ScenarioNarratives = ({ scenarios, startingWealth }: ScenarioNarrativesProps) => (
  <NarrativesGrid>
    {CARDS.map((card) => {
      const scenario = findScenario(scenarios, card.percentile);
      const narrative = scenario
        ? card.builder(scenario, startingWealth)
        : 'No scenario data available for this percentile.';

      return (
        <ScenarioCard key={card.variant} $variant={card.variant}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <CardTop>
              <CardTitleBlock>
                <IconBox $bg={card.iconBg} $color={card.iconColor}>
                  {card.icon}
                </IconBox>
                <div>
                  <PercentileLabel style={{ color: card.labelColor }}>
                    {card.label}
                  </PercentileLabel>
                  <CardTitle>{card.title}</CardTitle>
                </div>
              </CardTitleBlock>
              <CornerIcon $color={card.variant === 'nightmare' ? '#ef4444' : undefined}>
                {card.cornerIcon}
              </CornerIcon>
            </CardTop>
            <NarrativeText>"{narrative}"</NarrativeText>
          </div>
        </ScenarioCard>
      );
    })}
  </NarrativesGrid>
);
