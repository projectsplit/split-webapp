import { useEffect, useState } from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { DateTime } from "luxon";
import Pill from "../../../Pill/Pill";
import { SearchDateButtonProps } from "../../../../interfaces";

export default function SearchDateButton({
  category,
  type,
  submitButtonIsActive,
  showOptions,
  calendarIsOpen,
  datePeriodClicked,
  filterState,
  cancelled,
  removedFilter,
}: SearchDateButtonProps) {
  const { insertMention } = useBeautifulMentions();
  const [showDate, setShowDate] = useState<string[]>([]);

 const updateShowDate = () => {
    switch (category) {
      case 'before':
        setShowDate(filterState.value.before || []);
        break;
      case 'during':
        setShowDate(filterState.value.during || []);
        break;
      case 'after':
        setShowDate(filterState.value.after || []);
        break;
      default:
        setShowDate([]);
        break;
    }
  };

  useEffect(() => {
    updateShowDate();
     if (cancelled.value === true) {
    cancelled.value = false;
  }
  }, [filterState.value, category, cancelled.value]);



  const removeFilter = (dateToBeRemoved: string) => {
    removedFilter.value = true;
    setShowDate([]);
    switch (category) {
      case "before":
        filterState.value.before = filterState.value.before.filter(
          (date) => date !== dateToBeRemoved
        );

        break;
      case "during":
        filterState.value.during = filterState.value.during.filter(
          (date) => date !== dateToBeRemoved
        );
        break;
      case "after":
        filterState.value.after = filterState.value.after.filter(
          (date) => date !== dateToBeRemoved
        );
        break;
    }
    submitButtonIsActive.value = true;
  };

  return (
    <StyledSearchCategoryButton>
      <div
        className="category"
        onClick={() => {
          insertMention({ trigger: category + ":", value: "" });
          showOptions.value = false;
          calendarIsOpen.value = true;
          datePeriodClicked.value = category;
        }}
      >
        {category}:
      </div>
      &nbsp;
      <div className="pills">
        {showDate.length > 0 ? (
          showDate.map((date, index) => (
            <div key={index}>
              <Pill
                title={showDate[0]}
                color="#ffffff"
                closeButton={true}
                onClose={() => removeFilter(date)}
                $textColor="#000000c8"
                $border={false}
                 fontSize="16px"
              />
            </div>
          ))
        ) : (
          <div className="type">date</div>
        )}
      </div>
    </StyledSearchCategoryButton>
  );
}
