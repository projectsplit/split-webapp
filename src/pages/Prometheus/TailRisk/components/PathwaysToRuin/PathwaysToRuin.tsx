import {
  MdAccountTree,
  MdTrendingDown,
  MdTrendingUp,
  MdBolt,
} from 'react-icons/md';
import { PathwaysResult, PathwayLeaf, PathwayRule } from '../../interfaces';
import { formatTailValue, formatPct } from '../../utils';
import { formatFactorName } from '@/pages/Prometheus/Conditional/utils';
import {
  Panel,
  Header,
  Title,
  Meta,
  List,
  LeafRow,
  Rules,
  RuleChip,
  RuleConnector,
  BarTrack,
  BarFill,
  BaselineLine,
  BarLabel,
  Annotation,
  LiftTag,
  Volume,
  Capture,
  BaselineLegend,
  EmptyState,
} from './PathwaysToRuin.styled';

interface PathwaysToRuinProps {
  pathways: PathwaysResult;
  bondTenor: number;
  currency: string;
}

const liftColor = (lift: number): string => {
  if (lift >= 30) return '#dc2626';
  if (lift >= 15) return '#ef4444';
  if (lift >= 8) return '#f97316';
  if (lift >= 4) return '#fbbf24';
  return '#fde68a';
};

const formatLift = (lift: number): string => `${lift.toFixed(1)}× baseline`;

const renderRule = (
  rule: PathwayRule,
  bondTenor: number,
  currency: string,
  key: number,
) => {
  const [factor, op, threshold] = rule;
  const isDown = op === '<=';
  return (
    <RuleChip key={key} $tone={isDown ? 'down' : 'up'}>
      {isDown ? <MdTrendingDown /> : <MdTrendingUp />}
      {formatFactorName(factor, bondTenor)} {op}{' '}
      {formatTailValue(threshold, factor, currency)}
    </RuleChip>
  );
};

export const PathwaysToRuin = ({
  pathways,
  bondTenor,
  currency,
}: PathwaysToRuinProps) => {
  if (!pathways) return null;

  if (!pathways.available) {
    return (
      <Panel>
        <Header>
          <Title>
            <MdAccountTree />
            Pathways to Ruin
          </Title>
        </Header>
        <EmptyState>{pathways.reason ?? 'Pathways analysis unavailable.'}</EmptyState>
      </Panel>
    );
  }

  const leaves: PathwayLeaf[] = pathways.leaves ?? [];

  if (!leaves.length) {
    return (
      <Panel>
        <Header>
          <Title>
            <MdAccountTree />
            Pathways to Ruin
          </Title>
        </Header>
        <EmptyState>
          No concentrated ruin pathways found — bust risk is spread diffusely
          across scenarios.
        </EmptyState>
      </Panel>
    );
  }

  const baseline = pathways.p_baseline ?? 0;
  const totalNBusts = pathways.n_busts ?? 0;
  const maxRate = Math.max(
    baseline,
    ...leaves.map((l) => l.bust_rate),
    0.01,
  );
  const baselineOffset = (baseline / maxRate) * 100;

  return (
    <Panel>
      <Header>
        <Title>
          <MdAccountTree />
          Pathways to Ruin
        </Title>
        <Meta>
          {leaves.length} leaves · depth {pathways.depth} · baseline P(bust){' '}
          {formatPct(baseline * 100)}
        </Meta>
      </Header>

      <List>
        {leaves.map((leaf, i) => {
          const widthPct = (leaf.bust_rate / maxRate) * 100;
          const color = liftColor(leaf.lift_vs_baseline);
          const captureFraction =
            totalNBusts > 0 ? (leaf.n_busts / totalNBusts) * 100 : null;

          return (
            <LeafRow key={i}>
              <Rules>
                {leaf.rules.map((rule, idx) => (
                  <span
                    key={idx}
                    style={{ display: 'inline-flex', gap: '0.375rem', alignItems: 'center' }}
                  >
                    {renderRule(rule, bondTenor, currency, idx)}
                    {idx < leaf.rules.length - 1 && <RuleConnector>·</RuleConnector>}
                  </span>
                ))}
              </Rules>

              <BarTrack>
                <BarFill $widthPct={widthPct} $color={color} />
                {baseline > 0 && baseline < maxRate && (
                  <BaselineLine $offsetPct={baselineOffset} />
                )}
                <BarLabel>{formatPct(leaf.bust_rate * 100, 2)}</BarLabel>
              </BarTrack>

              <Annotation>
                <LiftTag $color={color}>
                  <MdBolt />
                  {formatLift(leaf.lift_vs_baseline)}
                </LiftTag>
                <Volume>
                  {leaf.n_busts.toLocaleString()} /{' '}
                  {leaf.n_paths.toLocaleString()} paths
                </Volume>
                {captureFraction !== null && (
                  <Capture>
                    {captureFraction.toFixed(1)}% of all busts
                  </Capture>
                )}
              </Annotation>
            </LeafRow>
          );
        })}
      </List>

      {baseline > 0 && (
        <BaselineLegend>
          dashed line = baseline P(bust) {formatPct(baseline * 100)}
        </BaselineLegend>
      )}
    </Panel>
  );
};
