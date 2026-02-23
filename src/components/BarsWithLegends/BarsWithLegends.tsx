import { StyledBarWithLegends } from "./BarsWithLegends.styled";
import { BarsWithLegendsProps } from "../../interfaces";
import { BarsAndAmounts } from "./BarsAndAmounts/BarsAndAmounts";
import { Mode } from "@/types";

export default function BarsWithLegends({
  bar1Total,
  bar2Total,
  currency,
  bar1Legend,
  bar2Legend,
  bar1Color,
  bar2Color,
  onClick,
  mode,
}: BarsWithLegendsProps) {

  return (
    <StyledBarWithLegends>
      {" "}
      {mode !== Mode.Personal && <div className="legends">
        <div className="grouping">
          <div className="legendGroup" style={{ backgroundColor: bar1Color }} />
          <div className="descr">{bar1Legend}</div>
        </div>
        <div className="grouping">
          <div className="legendUser" style={{ backgroundColor: bar2Color }} />
          <div className="descr">{bar2Legend}</div>
        </div>
      </div>}

      <BarsAndAmounts //TODO: create condition to show if personal AND expense filter is present.
        mode={mode}
        onClick={onClick}
        currency={currency}
        bar1Total={bar1Total}
        bar2Total={bar2Total}
        bar1Color={bar1Color}
        bar2Color={bar2Color}
      />
    </StyledBarWithLegends>
  );
}
