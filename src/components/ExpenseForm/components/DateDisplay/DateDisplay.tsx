import { StyledDateDisplay } from "./DateDisplay.styled";
import { DateDisplayProps } from "../../../../interfaces";
import { toLuxon } from "../../../../utils";
import { FaCalendar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function DateDisplay({
  selectedDateTime,
  timeZoneId,
  setTime,
  isDateShowing,
  setShowPicker
}: DateDisplayProps) {
  return (
    <StyledDateDisplay >
      {" "}
      <FaCalendar className="calendarIcon" />
      <div className="dateAndClose" onClick={()=>setShowPicker(true)}>
        {toLuxon(selectedDateTime, timeZoneId).toFormat(
          "ccc, dd MMM yyyy HH:mm"
        )}
        <div className="closeButtonWrapper">
          <IoClose
            className="closeButton"
            onClick={(e) => {
              e.stopPropagation();
              setTime(new Date().toISOString());
              isDateShowing.value = false
            }}
          />
        </div>
      </div>
    </StyledDateDisplay>
  );
}
