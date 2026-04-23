import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import { RiskItem } from '../../hooks/useActiveRisks';
import { readPair, useCorrelations } from '../../hooks/useCorrelations';
import { MatrixCell } from './MatrixCell';
import {
  MatrixShell,
  Glow,
  Canvas,
  Table,
  EmptyState,
  RowLabelCell,
  HeaderCell,
  HeaderMarker,
  HeaderLabel,
  CornerCell,
  DiagonalCell,
} from './Matrix.styled';

interface MatrixProps {
  setup: Signal<FinancialState>;
  items: RiskItem[];
}

const groupMarker = (group: RiskItem['group'], index: number): string => {
  const base = group === 'asset' ? 'Asset' : group === 'liability' ? 'Event' : 'Factor';
  return `${base} ${String(index + 1).padStart(2, '0')}`;
};

export const Matrix = ({ setup, items }: MatrixProps) => {
  const { setCorrelation } = useCorrelations(setup, items);

  if (items.length < 2) {
    return (
      <MatrixShell>
        <Glow />
        <Canvas>
          <EmptyState>
            Enable at least two risks with non-zero values in Setup to build a
            correlation matrix.
          </EmptyState>
        </Canvas>
      </MatrixShell>
    );
  }

  const pairs = setup.value.correlations.pairs;

  return (
    <MatrixShell>
      <Glow />
      <Canvas>
        <Table>
          <thead>
            <tr>
              <CornerCell />
              {items.map((item, idx) => (
                <HeaderCell key={item.id}>
                  <HeaderMarker>{groupMarker(item.group, idx)}</HeaderMarker>
                  <HeaderLabel>{item.label}</HeaderLabel>
                </HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id}>
                <RowLabelCell>{row.label}</RowLabelCell>
                {items.map((col) => {
                  if (row.id === col.id) {
                    return <DiagonalCell key={col.id}>1.00</DiagonalCell>;
                  }
                  const value = readPair(pairs, row.id, col.id) ?? 0;
                  return (
                    <MatrixCell
                      key={col.id}
                      value={value}
                      onCommit={(v) => setCorrelation(row.id, col.id, v)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </Canvas>
    </MatrixShell>
  );
};
