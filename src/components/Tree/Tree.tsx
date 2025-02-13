import { TreeProps } from "../../interfaces";
import { StyledTree } from "./Tree.styled";


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
