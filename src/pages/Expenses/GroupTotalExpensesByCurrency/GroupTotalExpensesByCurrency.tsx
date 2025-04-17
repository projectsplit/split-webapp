import IonIcon from "@reacticons/ionicons";
import { BarsAndAmounts } from "../../../components/BarsWithLegends/BarsAndAmounts/BarsAndAmounts";
import { GroupTotalExpensesByCurrencyProps } from "../../../interfaces";
import { StyledGroupTotalExpensesByCurrency } from "./GroupTotalExpensesByCurrency.styled";

export const GroupTotalExpensesByCurrency = ({
  menu,
  bar1Color,
  bar2Color,
  bar1Legend,
  bar2Legend,
  groupTotalsByCurrency,
  userTotalsByCurrency,
}: GroupTotalExpensesByCurrencyProps) => {
  const allCurrencies = Array.from(
    new Set([
      ...Object.keys(groupTotalsByCurrency),
      ...Object.keys(userTotalsByCurrency),
    ])
  );

  return (
    <StyledGroupTotalExpensesByCurrency>
       <div className="header">
          <span>By Currency</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>

      <div className="legends">
        <div className="grouping">
          <div className="legendGroup" style={{ backgroundColor: bar1Color }} />
          <div className="descr">{bar1Legend}</div>
        </div>
        <div className="grouping">
          <div className="legendUser" style={{ backgroundColor: bar2Color }} />
          <div className="descr">{bar2Legend}</div>
        </div>
      </div>
      {allCurrencies.map((currency) => (
        <BarsAndAmounts
          key={currency}
          currency={currency}
          bar1Total={groupTotalsByCurrency[currency] || 0}
          bar2Total={userTotalsByCurrency[currency] || 0}
          bar1Color={bar1Color}
          bar2Color={bar2Color}
        />
      ))}
    </StyledGroupTotalExpensesByCurrency>
  );
};
