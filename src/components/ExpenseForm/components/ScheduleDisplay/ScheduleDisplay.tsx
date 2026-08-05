import { IoClose } from 'react-icons/io5';
import { FaRepeat } from 'react-icons/fa6';
import { RecurrenceSchedule } from '@/types';
import { firstOccurrenceLabel, scheduleSentence } from '@/helpers/recurrence';
import { StyledScheduleDisplay } from './ScheduleDisplay.styled';

interface ScheduleDisplayProps {
  schedule: RecurrenceSchedule;
  timeZoneId: string;
  onEdit: () => void;
  /** Undefined while editing a template, where clearing would have to mean deleting the series. */
  onClear?: () => void;
  scheduleTimeLabel: string;
}

/**
 * The schedule as it reads back to the user, standing in for the date line a one-off expense shows.
 * Built like <LocationDisplay>, the other thing the form states rather than asks for: icon on the
 * left, the value in a chip you can tap to change and clear.
 */
export const ScheduleDisplay = ({
  schedule,
  timeZoneId,
  onEdit,
  onClear,
  scheduleTimeLabel,
}: ScheduleDisplayProps) => {
  return (
    <StyledScheduleDisplay>
      <FaRepeat className="recurringIcon" />
      <div className="scheduleAndClose" onClick={onEdit}>
        <div className="text">
          <div className="rule">{scheduleSentence(schedule)}</div>
          <div className="first">
            First on {firstOccurrenceLabel(schedule, timeZoneId)} at{' '}
            {scheduleTimeLabel}
          </div>
        </div>
        {onClear && (
          <div className="closeButtonWrapper">
            <IoClose
              className="closeButton"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            />
          </div>
        )}
      </div>
    </StyledScheduleDisplay>
  );
};

export default ScheduleDisplay;
