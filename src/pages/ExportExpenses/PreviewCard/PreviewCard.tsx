import { ReactNode, useMemo } from 'react';
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import { ExpensesExportResponse } from '@/types';
import { money, summarise } from '../export/exportModel';

interface PreviewCardProps {
  data: ExpensesExportResponse | undefined;
  isFetching: boolean;
  isError: boolean;
  hasScope: boolean;
  onRetry: () => void;
}

/**
 * What the file will hold, before it is made. The same answer the export is written from, so
 * what is previewed is exactly what is exported.
 */
export const PreviewCard = ({
  data,
  isFetching,
  isError,
  hasScope,
  onRetry,
}: PreviewCardProps) => {
  const summary = useMemo(() => (data ? summarise(data) : null), [data]);

  let body: ReactNode;

  if (!hasScope) {
    body = (
      <div className="previewEmpty">
        Choose at least one kind of expense to see what the file will hold.
      </div>
    );
  } else if (isError) {
    body = (
      <div className="previewEmpty">
        Could not load your expenses.
        <button type="button" className="retry" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  } else if (!summary) {
    body = (
      <>
        <div className="previewFigure shimmerText" style={{ width: '150px' }}>
          &nbsp;
          <Shimmer height="26px" borderRadius="4px" />
        </div>
        <div className="previewMeta shimmerText" style={{ width: '210px' }}>
          &nbsp;
          <Shimmer height="11px" borderRadius="4px" />
        </div>
      </>
    );
  } else if (summary.count === 0) {
    body = (
      <div className="previewEmpty">
        No expenses in this period.
        <span>Try a wider period, or more kinds of expense.</span>
      </div>
    );
  } else {
    const noun = summary.count === 1 ? 'expense' : 'expenses';
    const meta =
      summary.yourShare === null
        ? `${summary.count} ${noun} in mixed currencies. No exchange rates were available to add them up.`
        : summary.converted
          ? `Your share of ${summary.count} ${noun}, converted to ${summary.totalsCurrency} at each day's rate.`
          : `Your share of ${summary.count} ${noun}.`;

    body = (
      <>
        <div className="previewFigure">
          {summary.yourShare === null
            ? '—'
            : money(summary.yourShare, summary.totalsCurrency)}
        </div>
        <div className="previewMeta">{meta}</div>
        {summary.converted && (
          <div className="previewRows">
            {summary.byCurrency.map((row) => (
              <div className="previewRow" key={row.currency}>
                <span className="rowLabel">
                  {row.currency} · {row.count}
                </span>
                <span className="rowValue">
                  {money(row.yourShare, row.currency)}
                </span>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="section">
      <div className="sectionHeader">
        <div className="prompt">Preview</div>
      </div>
      <div className={`previewCard${isFetching && summary ? ' fetching' : ''}`}>
        {body}
      </div>
    </div>
  );
};
