import IonIcon from "@reacticons/ionicons";
import { Details } from "../types";
import { displayCurrencyAndAmount } from "../helpers/displayCurrencyAndAmount";

export const TreeItemBuilder = (
  details: Details | undefined
): JSX.Element[] => {

  if (!details) return [];

  const filteredDetails = Object.fromEntries(
    Object.entries(details).filter(([_, amount]) => amount !== 0)
  );

  const allSettled = Object.keys(filteredDetails).length === 0;

  if (allSettled) {
    return [
      <div className="groupsInfo">
        <div className="settled">
          <div><strong>You</strong>&nbsp;are settled&nbsp;</div>
          <IonIcon name="checkmark-sharp" className="checkmark" />
        </div>
      </div>
    ];
  }

  return Object.entries(filteredDetails).map(([currency, amount], index) => {
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
