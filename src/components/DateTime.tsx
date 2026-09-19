import { useEffect, useRef, useState } from 'react';
import DateTimePicker from './DateTimePicker/DateTimePicker';
import { styled } from 'styled-components';
import { DateTimeProps } from '../interfaces';
import { FaCalendar } from 'react-icons/fa';
import { useRealtimeClock } from '../hooks/useRealtimeClock';

export const DateTime = ({
  selectedDateTime,
  setSelectedDateTime,
  timeZoneId,
  isEdit,
  withLexicalContext,
  category,
  isDateShowing,
  showPicker,
  setShowPicker,
  realtimeUpdate: controlledRealtimeUpdate,
  setRealtimeUpdate: controlledSetRealtimeUpdate,
}: DateTimeProps) => {
  const [localRealtimeUpdate, setLocalRealtimeUpdate] = useState<boolean>(
    !isEdit
  );
  const realtimeUpdate = controlledRealtimeUpdate ?? localRealtimeUpdate;
  const setRealtimeUpdate = controlledSetRealtimeUpdate ?? setLocalRealtimeUpdate;
  const ref = useRef<HTMLDivElement>(null);

  useRealtimeClock(
    realtimeUpdate && !showPicker && isDateShowing.value,
    timeZoneId,
    setSelectedDateTime
  );

  useEffect(() => {
    window.addEventListener('mousedown', (e) => closeTimePicker(e));

    return () => {
      window.removeEventListener('mousedown', closeTimePicker);
    };
  }, []);

  const closeTimePicker = (event: any) => {
    if (!ref.current) return;
    if (ref.current.contains(event.target)) return;
    setShowPicker(false);
  };

  return (
    <StyledDateTime ref={ref}>
      <div className="main" onClick={() => setShowPicker(!showPicker)}>
        <FaCalendar className="calendarIcon" />
      </div>
      {showPicker && <PickerBackdrop onClick={() => setShowPicker(false)} />}
      {showPicker && (
        <DateTimePicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          realtimeUpdate={realtimeUpdate}
          setRealtimeUpdate={setRealtimeUpdate}
          timeZoneId={timeZoneId}
          showTimeControls={true}
          withLexicalContext={withLexicalContext}
          category={category}
          isDateShowing={isDateShowing}
        />
      )}
    </StyledDateTime>
  );
};

const PickerBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  background-color: ${({ theme }) => theme.scrim.sheet};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const StyledDateTime = styled.div`
  .main {
    cursor: pointer;
    .text {
      color: ${({ theme }) => theme.ink.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
