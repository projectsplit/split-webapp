import IonIcon from '@reacticons/ionicons';
import SegmentedControl from '@/components/SegmentedControl/SegmentedControl';
import { formatDay, PeriodPreset } from '../helpers/period';

interface PeriodSectionProps {
  preset: PeriodPreset;
  startDate: string;
  endDate: string;
  timeZone: string;
  onPreset: (preset: PeriodPreset) => void;
  onPick: (target: 'start' | 'end') => void;
}

const presets: { value: PeriodPreset; label: string }[] = [
  { value: 'thisMonth', label: 'This month' },
  { value: 'lastMonth', label: 'Last month' },
  { value: 'thisYear', label: 'This year' },
  { value: 'custom', label: 'Custom' },
];

export const PeriodSection = ({
  preset,
  startDate,
  endDate,
  timeZone,
  onPreset,
  onPick,
}: PeriodSectionProps) => {
  return (
    <div className="section">
      <div className="sectionHeader">
        <div className="prompt">Period</div>
      </div>

      <SegmentedControl
        className="presets"
        value={preset}
        onChange={(next) => onPreset(next as PeriodPreset)}
        options={presets}
      />

      {/* Always tappable: picking a day from a preset simply makes the period custom. */}
      <div className="dateCard">
        <button type="button" className="dateRow" onClick={() => onPick('start')}>
          <span className="dateLabel">From</span>
          <span className="dateValue">
            {formatDay(startDate)}
            <IonIcon name="chevron-forward-outline" className="dateChevron" />
          </span>
        </button>
        <button type="button" className="dateRow" onClick={() => onPick('end')}>
          <span className="dateLabel">To</span>
          <span className="dateValue">
            {formatDay(endDate)}
            <IonIcon name="chevron-forward-outline" className="dateChevron" />
          </span>
        </button>
      </div>

      <div className="sectionNote">
        Whole days, from 00:00 on the first to 23:59 on the last ({timeZone}).
      </div>
    </div>
  );
};
