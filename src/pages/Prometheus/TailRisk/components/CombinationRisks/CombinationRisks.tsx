import { useState, useMemo } from 'react';
import { MdHub, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { PairRow, FactorDirection } from '../../interfaces';
import { formatPct, formatPpDelta, directionLabel } from '../../utils';
import { formatFactorName } from '@/pages/Prometheus/Conditional/utils';
import {
  Panel,
  Header,
  Title,
  Tabs,
  TabChip,
  PairLabel,
  Explanation,
  Grid,
  Cell,
  CriticalBadge,
  CellLabels,
  CellLabel,
  CellValue,
  StatsBlock,
  StatLine,
  EmptyState,
} from './CombinationRisks.styled';

interface CombinationRisksProps {
  pairs: PairRow[];
  bondTenor: number;
  maxPairs?: number;
}

const MAX_DEFAULT = 5;

const shortFactorName = (raw: string, bondTenor: number): string => {
  const full = formatFactorName(raw, bondTenor);
  return full.length > 18 ? `${full.slice(0, 16)}…` : full;
};

const arrowFor = (direction: FactorDirection, isBad: boolean) => {
  const showUp = isBad ? direction === 'high' : direction === 'low';
  return showUp ? <MdTrendingUp /> : <MdTrendingDown />;
};

const buildExplanation = (pair: PairRow, bondTenor: number): string => {
  const a = formatFactorName(pair.factor_a, bondTenor);
  const b = formatFactorName(pair.factor_b, bondTenor);
  const aPct = formatPct(pair.p_a_alone * 100);
  const bPct = formatPct(pair.p_b_alone * 100);
  const jointPct = formatPct(pair.p_joint * 100);
  const expectedPct = formatPct(pair.expected_indep * 100);
  const excessPp = formatPpDelta(pair.interaction_excess * 100);
  return `When only ${a} is bad, bust rate is ${aPct}. When only ${b} is bad, bust rate is ${bPct}. When both are bad together, bust rate is ${jointPct}. If they were independent, you would expect ${expectedPct} — the extra ${excessPp} is the compounding effect.`;
};

export const CombinationRisks = ({
  pairs,
  bondTenor,
  maxPairs = MAX_DEFAULT,
}: CombinationRisksProps) => {
  const visiblePairs = useMemo(
    () => (pairs ?? []).slice(0, maxPairs),
    [pairs, maxPairs],
  );
  const [activeIdx, setActiveIdx] = useState(0);

  if (!visiblePairs.length) {
    return (
      <Panel>
        <Header>
          <MdHub />
          <Title>Top Combination Risks</Title>
        </Header>
        <EmptyState>
          No two-factor interactions surfaced for this tail.
        </EmptyState>
      </Panel>
    );
  }

  const safeIdx = Math.min(activeIdx, visiblePairs.length - 1);
  const pair = visiblePairs[safeIdx];
  const aShort = shortFactorName(pair.factor_a, bondTenor);
  const bShort = shortFactorName(pair.factor_b, bondTenor);
  const aDir = directionLabel(pair.factor_a, pair.direction_a);
  const bDir = directionLabel(pair.factor_b, pair.direction_b);
  const oppA = pair.direction_a === 'high' ? 'low' : 'high';
  const oppB = pair.direction_b === 'high' ? 'low' : 'high';
  const aDirOpp = directionLabel(pair.factor_a, oppA);
  const bDirOpp = directionLabel(pair.factor_b, oppB);

  const fmtP = (v: number) => formatPct(v * 100);
  const fmtCount = (n: number) => n.toLocaleString();

  return (
    <Panel>
      <Header>
        <MdHub />
        <Title>Top Combination Risks</Title>
      </Header>

      <Tabs>
        {visiblePairs.map((p, i) => (
          <TabChip
            key={`${p.factor_a}-${p.factor_b}-${i}`}
            $active={i === safeIdx}
            onClick={() => setActiveIdx(i)}
          >
            <span className="idx">{i + 1}.</span>
            {shortFactorName(p.factor_a, bondTenor)} +{' '}
            {shortFactorName(p.factor_b, bondTenor)}
          </TabChip>
        ))}
      </Tabs>

      <PairLabel>
        Pair: {formatFactorName(pair.factor_a, bondTenor)} ·{' '}
        {formatFactorName(pair.factor_b, bondTenor)}
      </PairLabel>

      <Explanation>{buildExplanation(pair, bondTenor)}</Explanation>

      <Grid>
        <Cell $tone="safe">
          <CellLabels>
            <CellLabel $color="#4ae176">
              {arrowFor(pair.direction_a, false)}
              {aShort} {aDirOpp}
            </CellLabel>
            <CellLabel $color="#4ae176">
              {arrowFor(pair.direction_b, false)}
              {bShort} {bDirOpp}
            </CellLabel>
          </CellLabels>
          <CellValue>
            <small>P(BUST) · n {fmtCount(pair.cells.neither.n)}</small>
            <strong>{fmtP(pair.cells.neither.p_bust)}</strong>
          </CellValue>
        </Cell>

        <Cell $tone="neutral">
          <CellLabels>
            <CellLabel $color="rgba(239, 68, 68, 0.6)">
              {arrowFor(pair.direction_a, true)}
              {aShort} {aDir}
            </CellLabel>
            <CellLabel $color="rgba(74, 225, 118, 0.55)">
              {arrowFor(pair.direction_b, false)}
              {bShort} {bDirOpp}
            </CellLabel>
          </CellLabels>
          <CellValue>
            <small>P(BUST) · n {fmtCount(pair.cells.a_only.n)}</small>
            <strong>{fmtP(pair.cells.a_only.p_bust)}</strong>
          </CellValue>
        </Cell>

        <Cell $tone="neutral">
          <CellLabels>
            <CellLabel $color="rgba(74, 225, 118, 0.55)">
              {arrowFor(pair.direction_a, false)}
              {aShort} {aDirOpp}
            </CellLabel>
            <CellLabel $color="rgba(239, 68, 68, 0.6)">
              {arrowFor(pair.direction_b, true)}
              {bShort} {bDir}
            </CellLabel>
          </CellLabels>
          <CellValue>
            <small>P(BUST) · n {fmtCount(pair.cells.b_only.n)}</small>
            <strong>{fmtP(pair.cells.b_only.p_bust)}</strong>
          </CellValue>
        </Cell>

        <Cell $tone="critical">
          <CriticalBadge>CRITICAL</CriticalBadge>
          <CellLabels>
            <CellLabel $color="#ef4444">
              {arrowFor(pair.direction_a, true)}
              {aShort} {aDir}
            </CellLabel>
            <CellLabel $color="#ef4444">
              {arrowFor(pair.direction_b, true)}
              {bShort} {bDir}
            </CellLabel>
          </CellLabels>
          <CellValue>
            <small>P(BUST) · n {fmtCount(pair.cells.both.n)}</small>
            <strong style={{ color: '#ef4444' }}>
              {fmtP(pair.cells.both.p_bust)}
            </strong>
          </CellValue>
        </Cell>
      </Grid>

      <StatsBlock>
        <StatLine>
          <span>EXPECTED INDEP</span>
          <span>{fmtP(pair.expected_indep)}</span>
        </StatLine>
        <StatLine $tone="error">
          <span>INTERACTION EXCESS</span>
          <span>{formatPpDelta(pair.interaction_excess * 100)}</span>
        </StatLine>
        <StatLine $tone="primary">
          <span>JOINT EXCESS</span>
          <span>{formatPpDelta(pair.joint_excess * 100)}</span>
        </StatLine>
      </StatsBlock>
    </Panel>
  );
};
