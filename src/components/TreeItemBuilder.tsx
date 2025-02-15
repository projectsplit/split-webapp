import IonIcon from "@reacticons/ionicons";
import { Details } from "../types";
import { displayCurrencyAndAmount } from "../helpers/displayCurrencyAndAmount";

export const TreeItemBuilder = (
  details: Details | undefined
): JSX.Element[] => {

  if (!details) return [];

  const allSettled = Object.keys(details).length === 0;

  if (allSettled) {
    return [
      <div className="groupsInfo">
        <div className="settled">
          <strong>You</strong> &nbsp;are settled &nbsp;
          <IonIcon name="checkmark-sharp" className="checkmark" />
        </div>
      </div>
    ];
  }

  return Object.entries(details).map(([currency, amount], index) => {
    if (amount > 0) {
      return (
        <div className="groupsInfo" key={index}>
          <strong>You</strong> owe{" "}
          <span className="owe">
            {displayCurrencyAndAmount(Math.abs(amount).toString(), currency)}
          </span>
        </div>
      );
    } else if (amount < 0) {
      return (
        <div className="groupsInfo" key={index}>
          <strong>You</strong> are owed{" "}
          <span className="owed">
            {displayCurrencyAndAmount(Math.abs(amount).toString(), currency)}
          </span>
        </div>
      );
    } else {
      return <></>;
    }
  });
};
