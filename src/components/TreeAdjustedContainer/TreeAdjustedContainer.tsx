import { StyledTreeAdjustedContainer } from "./TreeAdjustedContainer.styled";
import Tree from "../Tree/Tree";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import IonIcon from "@reacticons/ionicons";
import { TreeAdjustedContainerProps } from "../../interfaces";
import { useOutletContext } from "react-router-dom";
import { Signal } from "@preact/signals-react";

export default function TreeAdjustedContainer({
  children,
  onClick,
  hasOption,
  optionname,
  items,
  iconfontsize,
  right,
  onIconClick
}: TreeAdjustedContainerProps) {
  const hasTreeComponent = items.length > 1 ? true : false;

  if (!hasTreeComponent) {
    return (
      <OptionsContainer
        onClick={onClick}
        hasOption={hasOption}
        optionname={optionname}
        iconfontsize={iconfontsize}
        right={right}
        onIconClick={onIconClick}
      >
        {children}
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </OptionsContainer>
    );
  }
  return (
    <StyledTreeAdjustedContainer
      onClick={onClick}
      hasOption={hasOption}
      optionname={optionname}
      iconfontsize={iconfontsize}
      right={right}
    >
      {children}
      {hasOption && (
        <IonIcon
          name={optionname}
          className="arrow"
          onClick={onIconClick}
        />
      )}
      <Tree items={items} />
    </StyledTreeAdjustedContainer>
  );
}
//"chevron-forward-outline"
