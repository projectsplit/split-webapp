import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { BarsAndAmountsProps } from "../../../interfaces";
import { StyledBarsAndAmounts } from "./BarsAndAmounts.styled";

export const BarsAndAmounts = ({
  onClick,
  currency,
  bar1Total,
  bar2Total,
  bar1Color,
  bar2Color,
}: BarsAndAmountsProps) => {

  const scalingFactor =0.05;
  const bar1Width = bar1Total * scalingFactor;
  const bar2Width = bar2Total * scalingFactor;

  const bar1WidthPercentage = bar1Width / (bar1Width + bar2Width);
  const bar2WidthPercentage = bar2Width / (bar1Width + bar2Width);

  return (
    <StyledBarsAndAmounts onClick={onClick}>
      <div className="barAndAmount">
        <div
          className="bar1"
          style={{
            width: `${bar1WidthPercentage * 100}%`,
            transition: "width 0.5s ease",
            backgroundColor: bar1Color,
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
            backgroundColor: bar2Color,
          }}
        />
        <div className="amount">
          {displayCurrencyAndAmount(bar2Total.toString(), currency)}
        </div>
      </div>
    </StyledBarsAndAmounts>
  );
};
