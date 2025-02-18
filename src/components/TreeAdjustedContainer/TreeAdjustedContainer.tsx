import { StyledTreeAdjustedContainer } from "./TreeAdjustedContainer.styled";
import Tree from "../Tree/Tree";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import IonIcon from "@reacticons/ionicons";
import { TreeAdjustedContainerProps } from "../../interfaces";

export default function TreeAdjustedContainer({
  children,
  onClick,
  hasarrow,
  items,

}: TreeAdjustedContainerProps) {
  const hasTreeComponent = items.length > 1 ? true : false;

  if (!hasTreeComponent) {
    return (
      <OptionsContainer onClick={onClick} hasarrow={hasarrow} >
        {children}
        {hasarrow && (
          <IonIcon name="chevron-forward-outline" className="arrow" />
        )}
         {items.map((item, index) => (
        <div key={index}>{item}</div>  
      ))}
      </OptionsContainer>
    );
  }
  return (
    <StyledTreeAdjustedContainer onClick={onClick} hasarrow={hasarrow} >
      {children}
      {hasarrow && <IonIcon name="chevron-forward-outline" className="arrow" />}
      <Tree items={items} />
    </StyledTreeAdjustedContainer>
  );
}
