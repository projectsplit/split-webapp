import React from "react";
import { StyledSelection } from "./Selection.styled";
import { CycleSelectionProps } from "../../../../../interfaces";


export default function Selection({
  children,
  header
}: CycleSelectionProps) {
  return (
    <StyledSelection>
      <div className="header">
        <strong>{header}</strong>
      </div>
      {children}
    </StyledSelection>
  );
}
