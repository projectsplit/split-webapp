import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { useSignal } from "@preact/signals-react";
import { useParams } from "react-router-dom";
import { SettleUpOptionsProps } from "../../../interfaces";
import { StyledSettleUpOptions } from "./SettleUpOptions.Styled";
import { CreateTransfersRequest, Transfer } from "../../../types";
import { DateTime } from "luxon";
import { useMultipleTransfers } from "../../../api/auth/CommandHooks/useMultipleTransfers";
import MyButton from "../../../components/MyButton/MyButton";

export default function SettleUpOptions({
  pendingTransactions,
  idSelectedToSettleUp,
  menu,
  members,
}: SettleUpOptionsProps) {
  const selectedItem = useSignal<number[]>([0]);
  const params = useParams();
  const groupId = params?.groupid;
  const { mutate: submitMultipleTransfers, isPending } = useMultipleTransfers(menu);
  const enabled = selectedItem.value.length > 0;

  const memberPendingTransactions = pendingTransactions.filter(
    (p) => p.debtor === idSelectedToSettleUp.value
  );

  const submitButtonHandler = () => {
    const selectedTransactions = selectedItem.value.map(
      (index) => memberPendingTransactions[index]
    );

    const transfers: Transfer[] = selectedTransactions.map((transaction) => ({
      description: "Settled Debt",
      amount: transaction.amount,
      currency: transaction.currency,
      receiverId: transaction.creditor,
      senderId: transaction.debtor,
      occurred: DateTime.now().toUTC().toISO(),
    }));

    const createTransfersRequest: CreateTransfersRequest = {
      groupId: groupId as string,
      transfers,
    };

    submitMultipleTransfers(createTransfersRequest);

  };

  return (
    <StyledSettleUpOptions>
      <strong className="header">Settle Up</strong>

      {memberPendingTransactions.map((p, index) => (
        <div
          className={`settleUpOption ${selectedItem.value.includes(index) ? "clicked" : ""
            }`}
          key={index}
          onClick={() => {
            if (selectedItem.value.includes(index)) {
              selectedItem.value = selectedItem.value.filter(
                (i) => i !== index
              );
            } else {
              selectedItem.value = [...selectedItem.value, index];
            }
          }}
        >
          <span className="currencyOwes">
            {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
          </span>{" "}
          &nbsp;
          <span className="preposition">to</span> &nbsp;
          <span>
            {members.find((member) => member.id === p.creditor)?.name}
          </span>
        </div>
      ))}

      <div className="settleUpButton">
        {" "}
        <MyButton onClick={() => submitButtonHandler()} disabled={!enabled} isLoading={isPending}>
          Settle Up
        </MyButton>
      </div>
    </StyledSettleUpOptions>
  );
}
