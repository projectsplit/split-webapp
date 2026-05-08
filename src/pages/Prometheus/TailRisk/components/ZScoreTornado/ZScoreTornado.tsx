import { MdInsights } from 'react-icons/md';
import { ZScoreRow } from '../../interfaces';
import { formatTailValue, concentrationTier } from '../../utils';
import { formatFactorName } from '@/pages/Prometheus/Conditional/utils';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  Legend,
  LegendDot,
  ChartArea,
  ThresholdLine,
  ThresholdLabel,
  Centerline,
  Row,
  RowHeader,
  FactorName,
  ZValue,
  Track,
  Bar,
  ValueLabels,
  ValueChip,
  AxisRow,
  EmptyState,
} from './ZScoreTornado.styled';

interface ZScoreTornadoProps {
  rows: ZScoreRow[];
  bondTenor: number;
  currency: string;
}

const NOTABLE_THRESHOLD = 2.0;
const MIN_AXIS = 3.5;

export const ZScoreTornado = ({
  rows,
  bondTenor,
  currency,
}: ZScoreTornadoProps) => {
  if (!rows || rows.length === 0) {
    return (
      <Panel>
        <PanelHeader>
          <PanelTitle>
            <MdInsights />
            Risk Factor Z-Scores · Tail Concentration
          </PanelTitle>
        </PanelHeader>
        <EmptyState>No factors crossed the tail threshold.</EmptyState>
      </Panel>
    );
  }

  const sorted = [...rows].sort((a, b) => b.abs_z - a.abs_z);
  const maxAbsZ = Math.max(MIN_AXIS, ...sorted.map((r) => r.abs_z));
  const notableOffsetRight = 50 + (NOTABLE_THRESHOLD / maxAbsZ) * 50;

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          <MdInsights />
          Risk Factor Z-Scores · Tail Concentration
        </PanelTitle>
        <Legend>
          <LegendDot $color="#968e99">none</LegendDot>
          <LegendDot $color="#4ae176">mild</LegendDot>
          <LegendDot $color="#fbbf24">strong</LegendDot>
          <LegendDot $color="#ef4444">severe</LegendDot>
        </Legend>
      </PanelHeader>

      <ChartArea>
        <Centerline />
        <ThresholdLine $offsetPct={notableOffsetRight} />
        <ThresholdLabel $offsetPct={notableOffsetRight}>
          NOTABLE |z| = {NOTABLE_THRESHOLD}
        </ThresholdLabel>

        {sorted.map((row) => {
          const tier = concentrationTier(row.abs_z);
          const direction = row.direction === 'high' ? 'right' : 'left';
          const widthPct = Math.min(50, (row.abs_z / maxAbsZ) * 50);
          const factorLabel = formatFactorName(row.factor, bondTenor);

          return (
            <Row key={row.factor}>
              <RowHeader>
                <FactorName>{factorLabel}</FactorName>
                <ZValue $color={tier.color}>
                  z = {row.z >= 0 ? '+' : ''}
                  {row.z.toFixed(2)}
                </ZValue>
              </RowHeader>
              <Track>
                <Bar
                  $widthPct={widthPct}
                  $direction={direction}
                  $color={tier.color}
                />
                <ValueLabels $direction={direction}>
                  <ValueChip $tone="pop">
                    <small>POP</small>
                    <strong>
                      {formatTailValue(row.mean_full, row.factor, currency)}
                    </strong>
                  </ValueChip>
                  <ValueChip $tone="tail">
                    <small>TAIL</small>
                    <strong>
                      {formatTailValue(row.mean_tail, row.factor, currency)}
                    </strong>
                  </ValueChip>
                </ValueLabels>
              </Track>
            </Row>
          );
        })}

        <AxisRow>
          <span>← LOW ({(-maxAbsZ).toFixed(1)})</span>
          <span>0</span>
          <span>HIGH ({maxAbsZ.toFixed(1)}) →</span>
        </AxisRow>
      </ChartArea>
    </Panel>
  );
};
