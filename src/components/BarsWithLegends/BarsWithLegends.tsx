import { StyledBarWithLegends } from "./BarsWithLegends.styled";
import { BarsWithLegendsProps } from "../../interfaces";
import { BarsAndAmounts } from "./BarsAndAmounts/BarsAndAmounts";

export default function BarsWithLegends({
  bar1Total,
  bar2Total,
  currency,
  bar1Legend,
  bar2Legend,
  bar1Color,
  bar2Color,
  onClick
}: BarsWithLegendsProps) {
  


  return (
    <StyledBarWithLegends>
      {" "}
      <div className="legends">
        <div className="grouping">
          <div className="legendGroup" style={{backgroundColor:bar1Color}}/>
          <div className="descr">{bar1Legend}</div>
        </div>
        <div className="grouping">
          <div className="legendUser" style={{backgroundColor:bar2Color}}/>
          <div className="descr">{bar2Legend}</div>
        </div>
      </div>
      <BarsAndAmounts onClick={onClick} currency={currency} bar1Total={bar1Total} bar2Total={bar2Total} bar1Color={bar1Color} bar2Color={bar2Color}/>

    </StyledBarWithLegends>
  );
}
