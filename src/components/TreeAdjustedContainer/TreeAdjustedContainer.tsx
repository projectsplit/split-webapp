import { StyledTreeAdjustedContainer } from "./TreeAdjustedContainer.styled";
import Tree from "../Tree/Tree";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import IonIcon from "@reacticons/ionicons";
import { TreeAdjustedContainerProps } from "../../interfaces";

export default function TreeAdjustedContainer({
  children,
  onClick,
  hasOption,
  optionname,
  items,
  iconfontsize,
  right,
  onIconClick,
  optionColor
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
        optionColor={optionColor}
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
      optionColor={optionColor}
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

