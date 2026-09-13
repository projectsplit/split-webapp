import { IoClose } from 'react-icons/io5';
import { FaRepeat } from 'react-icons/fa6';
import { RecurrenceSchedule } from '@/types';
import { scheduleSentence } from '@/helpers/recurrence';
import { StyledScheduleDisplay } from './ScheduleDisplay.styled';

interface ScheduleDisplayProps {
  schedule: RecurrenceSchedule;
  onEdit: () => void;
  onClear?: () => void;
}

export const ScheduleDisplay = ({
  schedule,
  onEdit,
  onClear,
}: ScheduleDisplayProps) => {
  return (
    <StyledScheduleDisplay>
      <div className="chip" onClick={onEdit}>
        <FaRepeat className="chipIcon" />
        <div className="rule">{scheduleSentence(schedule)}</div>
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
