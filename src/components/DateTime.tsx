import { useEffect, useRef, useState } from "react";
import DateTimePicker from "./DateTimePicker/DateTimePicker";
import { styled } from "styled-components";
import { DateTime as LuxonDateTime } from "luxon";
import { toLuxon, toUtcString } from "../utils";
import { DateTimeProps } from "../interfaces";
import { FaCalendar } from "react-icons/fa";

export const DateTime = ({
  selectedDateTime,
  setSelectedDateTime,
  timeZoneId,
  isEdit,
  withLexicalContext,
  category,
  isDateShowing,
  showPicker,
  setShowPicker
}: DateTimeProps) => {

  const [realtimeUpdate, setRealtimeUpdate] = useState<boolean>(!isEdit);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (realtimeUpdate) {
      interval = setInterval(() => {
        setSelectedDateTime((prev) => {
          const now = LuxonDateTime.utc().setZone(timeZoneId);
          const updatedDateTime = toLuxon(prev, timeZoneId).set({
            hour: now.hour,
            minute: now.minute,
            second: now.second,
          });

          return toUtcString(updatedDateTime);
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [realtimeUpdate]);

  useEffect(() => {
    window.addEventListener("mousedown", (e) => closeTimePicker(e));

    return () => {
      window.removeEventListener("mousedown", closeTimePicker);
    };
  }, []);

  const closeTimePicker = (event: any) => {
    if (!ref.current) return;
    if (ref.current.contains(event.target)) return;
    setShowPicker(false);
  };

  return (
    <StyledDateTime ref={ref}>
      <div className="main" onClick={(_) => {setShowPicker(!showPicker), isDateShowing.value=true}}>
        <FaCalendar className="calendarIcon" />
      </div>
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

const StyledDateTime = styled.div`
  .main {
    cursor: pointer;
    .text {
      color: ${({ theme }) => theme.textActiveColor};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
