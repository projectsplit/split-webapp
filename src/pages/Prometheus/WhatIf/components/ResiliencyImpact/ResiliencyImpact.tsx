import { MdSecurity, MdTrendingDown, MdTrendingUp } from 'react-icons/md';
import { WhatIfSummary, WhatIfDelta } from '../../interfaces';
import { formatPp } from '../../utils';
import {
  Panel,
  PanelGlow,
  PanelHeader,
  PanelIcon,
  PanelTitle,
  StatsRow,
  StatItem,
  StatItemLabel,
  StatItemValue,
  StatItemUnit,
  NetChangeBar,
  NetChangeLabel,
  NetChangeBadge,
  NetChangeDelta,
} from './ResiliencyImpact.styled';

interface ResiliencyImpactProps {
  baseline: WhatIfSummary;
  scenario: WhatIfSummary;
  delta: WhatIfDelta;
}

export const ResiliencyImpact = ({
  baseline,
  scenario,
  delta,
}: ResiliencyImpactProps) => {
  const improved = delta.delta_p_bust <= 0;

  return (
    <Panel>
      <PanelGlow
        $color={
          improved
            ? 'rgba(74, 225, 118, 0.1)'
            : 'rgba(239, 68, 68, 0.1)'
        }
      />
      <PanelHeader>
        <PanelIcon $color={improved ? '#4ae176' : '#ef4444'}>
          <MdSecurity />
        </PanelIcon>
        <PanelTitle>Resiliency Impact</PanelTitle>
      </PanelHeader>

      <StatsRow>
        <StatItem>
          <StatItemLabel>BASELINE P(RUIN)</StatItemLabel>
          <StatItemValue>
            {baseline.p_bust.toFixed(4)}
            <StatItemUnit>%</StatItemUnit>
          </StatItemValue>
        </StatItem>
        <StatItem>
          <StatItemLabel>SCENARIO P(RUIN)</StatItemLabel>
          <StatItemValue $color="#ddb7ff">
            {scenario.p_bust.toFixed(4)}
            <StatItemUnit>%</StatItemUnit>
          </StatItemValue>
        </StatItem>
      </StatsRow>

      <NetChangeBar>
        <NetChangeLabel>
          {improved ? 'Net Improvement' : 'Net Worsening'}
        </NetChangeLabel>
        <NetChangeBadge $improved={improved}>
          {improved ? <MdTrendingUp /> : <MdTrendingDown />}
          <NetChangeDelta>{formatPp(delta.delta_p_bust)}</NetChangeDelta>
        </NetChangeBadge>
      </NetChangeBar>
    </Panel>
  );
};
