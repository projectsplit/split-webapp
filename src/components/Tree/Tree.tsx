import React from "react";
import { StyledTree } from "./Tree.styled";
import { TreeProps } from "../../interfaces";

export default function Tree({ items }: TreeProps) {
  return (
    <StyledTree>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </StyledTree>
  );
}
