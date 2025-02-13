import IonIcon from "@reacticons/ionicons";
import { UserPendingTransaction } from "../types";
import { displayCurrencyAndAmount } from "../helpers/displayCurrencyAndAmount";


export const TreeItemBuilder = (
  pendingTransactions: UserPendingTransaction[]
): JSX.Element[] => {

  const filteredTransactions = pendingTransactions.filter(
    (p) => p.userIsReceiver || p.userIsSender
  );

  const allSettled = pendingTransactions.every(
    ({ userIsSender, userIsReceiver }) => !userIsSender && !userIsReceiver
  );

  if (allSettled) {
    return [
      <div className="groupsInfo" key='settled'>
        <div className="settled">
          <strong>You</strong> &nbsp;are settled &nbsp;
          <IonIcon
            name="checkmark-sharp"
            className="checkmark"
           
          />
        </div>
      </div>
    ];
  }

  return filteredTransactions.map(
    (transaction: UserPendingTransaction, index: number) => {
      const { userIsSender, userIsReceiver, amount, currency } = transaction;

      if (userIsSender && !userIsReceiver) {
        return (
          <div className="groupsInfo" key={index}>
            <strong>You</strong> owe{" "}
            <span className="owe">
              {displayCurrencyAndAmount(amount.toString(), currency)}
            </span>
          </div>
        );
      } else if (!userIsSender && userIsReceiver) {
        return (
          <div className="groupsInfo" key={index}>
            <strong>You</strong> are owed{" "}
            <span className="owed">
              {displayCurrencyAndAmount(amount.toString(), currency)}
            </span>
          </div>
        );
      } else {
        return <></>;
      }
    }
  );
};
