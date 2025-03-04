import { StyledBarWithLegends } from "./BarsWithLegends.styled";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { BarsWithLegendsProps } from "../../interfaces";

export default function BarsWithLegends({
  bar1Total,
  bar2Total,
  currency,
  bar1Legend,
  bar2Legend,
}: BarsWithLegendsProps) {
  
  const scalingFactor = 0.05;
  const bar1Width = bar1Total * scalingFactor;
  const bar2Width = bar2Total * scalingFactor;

  const bar1WidthPercentage = bar1Width / (bar1Width + bar2Width);
  const bar2WidthPercentage = bar2Width / (bar1Width + bar2Width);

  return (
    <StyledBarWithLegends>
      {" "}
      <div className="legends">
        <div className="grouping">
          <div className="legendGroup" />
          <div className="descr">{bar1Legend}</div>
        </div>
        <div className="grouping">
          <div className="legendUser" />
          <div className="descr">{bar2Legend}</div>
        </div>
      </div>
      <div className="barsAndAmounts">
        <div className="barAndAmount">
          <div
            className="bar1"
            style={{
              width: `${bar1WidthPercentage * 100}%`,
              transition: "width 0.5s ease",
            }}
          />
          <div className="amount">
            {displayCurrencyAndAmount(bar1Total.toString(), currency)}
          </div>
        </div>
        <div className="barAndAmount">
          <div
            className="bar2"
            style={{
              width: `${bar2WidthPercentage * 100}%`,
              transition: "width 0.5s ease",
            }}
          />
          <div className="amount">
            {displayCurrencyAndAmount(bar2Total.toString(), currency)}
          </div>
        </div>
      </div>
    </StyledBarWithLegends>
  );
}
