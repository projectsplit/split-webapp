import IonIcon from "@reacticons/ionicons";
import { Details } from "../types";
import { displayCurrencyAndAmount } from "../helpers/displayCurrencyAndAmount";

export const TreeItemBuilderForHomeAndGroups = (
  details: Details | undefined
): JSX.Element[] => {
  if (!details) return [];

  const filteredDetails = Object.fromEntries(
    Object.entries(details).filter(([_, amount]) => amount !== 0)
  );

  if (Object.keys(filteredDetails).length === 0) {
    return [
      <div className="groupsInfo" key="settled">
        <div className="settled">
          <div>You are settled </div>
          <IonIcon name="checkmark-sharp" className="checkmark" />
        </div>
      </div>,
    ];
  }

  const positiveEntries = Object.entries(filteredDetails).filter(
    ([, amount]) => amount > 0
  );
  const negativeEntries = Object.entries(filteredDetails).filter(
    ([, amount]) => amount < 0
  );

  const joinAmounts = (entries: [string, number][]): JSX.Element => {
    const amounts = entries.map(([currency, amount]) =>
      displayCurrencyAndAmount(Math.abs(amount).toString(), currency)
    );
    if (amounts.length === 1) {
      return <>{amounts[0]}</>;
    } else if (amounts.length === 2) {
      return (
        <>
          {amounts[0]}
          <span style={{ color: '#a3a3a3' }}> and </span>
          {amounts[1]}
        </>
      );
    } else {
      const result: React.ReactNode[] = [];
      for (let i = 0; i < amounts.length; i++) {
        if (i > 0 && i < amounts.length - 1) {
          result.push(
          <span style={{ color: '#a3a3a3' }} key={`comma-${i}`}>
          {', '}
        </span>)
        }
        if (i === amounts.length - 1) {
          result.push(
            <span style={{ color: '#a3a3a3' }} key={`and-${i}`}>
              {' and '}
            </span>
          );
        }
        result.push(amounts[i]);
      }
      return <>{result}</>;
    }
  };

  const components: JSX.Element[] = [];

  if (positiveEntries.length > 0) {
    components.push(
      <div className="groupsInfo" key="positive">
        <span>You owe </span>
        <span className="owe">{joinAmounts(positiveEntries)}</span>
      </div>
    );
  }

  if (negativeEntries.length > 0) {
    components.push(
      <div className="groupsInfo" key="negative">
        <span>You are owed </span>
        <span className="owed">{joinAmounts(negativeEntries)}</span>
      </div>
    );
  }

  return components;
};
