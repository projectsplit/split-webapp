import React from "react";
import { StyledLabelsDisplay } from "./LabelsDisplay.styled";
import { IoClose } from "react-icons/io5";
import labelColors from "../../../../labelColors";
import { LabelsDisplayProps } from "../../../../interfaces";
import { FaTags } from "react-icons/fa";

export default function LabelsDisplay({
  labels,
  setLabels,
}: LabelsDisplayProps) {
  const handleSelectedLabelClick = (labelText: string) => {
    setLabels(labels.filter((x) => x.text !== labelText));
  };

  return (
    <StyledLabelsDisplay>
      {" "}
      <FaTags className="tagIcon" />
      <div className="labels">
        {" "}
        {labels.map((x) => {
          return (
            <span
              key={x.text}
              style={{
                backgroundColor: labelColors[x.color],
                color: "#000000c8",
              }}
              onClick={() => handleSelectedLabelClick(x.text)}
              className="selected-label"
            >
              {x.text}
              <IoClose />
            </span>
          );
        })}
      </div>
    </StyledLabelsDisplay>
  );
}
