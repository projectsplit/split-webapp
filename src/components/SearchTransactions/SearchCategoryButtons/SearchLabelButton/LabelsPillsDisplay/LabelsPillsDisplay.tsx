import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { LabelsPillsDisplayProps } from "../../../../../interfaces";
import { StyledLabelsPillsDisplay } from "./LabelsPillsDisplay.styled";
import Pill from "../../../../Pill/Pill";
import { useEffect, useState } from "react";
import { FetchedLabel } from "../../../../../types";
import labelColors from "../../../../../labelColors";

export default function LabelsPillsDisplay({
  category,
  filteredLabels,
  showOptions,
  submitButtonIsActive,
  filterState,
  cancelled,
  removedFilter,
}: LabelsPillsDisplayProps) {
  const { insertMention } = useBeautifulMentions();

  const [showFilteredLabels, setShowFilteredLabels] = useState<FetchedLabel[]>(
    []
  );

useEffect(() => {
    setShowFilteredLabels(filteredLabels.value);
    if (cancelled.value) {
      cancelled.value = false;
    }
  }, [filteredLabels.value, cancelled.value]);

  const removeFilter = (filterId: string) => {
    removedFilter.value = true;
    setShowFilteredLabels((prev) => prev.filter((filter) => filter.id !== filterId));
    filterState.value.labels = filterState.value.labels.filter((id) => id !== filterId);
    filteredLabels.value = filteredLabels.value.filter((label) => label.id !== filterId);
    submitButtonIsActive.value = true;
  };

  return (
    <StyledLabelsPillsDisplay>
      <div
        className="category"
        onClick={() => {
          insertMention({ trigger: category + ":", value: "" });
          showOptions.value = false;
          submitButtonIsActive.value = true;
          console.log("Here1");
        }}
      >
        {category}:
      </div>
      &nbsp;
      <div className="pills">
        {showFilteredLabels.length > 0 ? (
          showFilteredLabels.map((label) => (
            <div key={label.value}>
              <Pill
                key={label?.id}
                title={label?.value}
                color={labelColors[label?.color]}
                closeButton={true}
                onClose={() => removeFilter(label?.id)}
                $textColor="#000000c8"
                $border={false}
                 fontSize="16px"
              />
            </div>
          ))
        ) : (
          <div className="type">label</div>
        )}
      </div>
    </StyledLabelsPillsDisplay>
  );
}
