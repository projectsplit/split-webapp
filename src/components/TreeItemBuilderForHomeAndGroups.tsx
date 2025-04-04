import IonIcon from "@reacticons/ionicons";
import { Details } from "../types";
import { joinAmounts } from "../helpers/joinAmounts";

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
