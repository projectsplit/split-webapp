import {
  CreateExpenseRequest,
  FormExpense,
  GeoLocation,
  Group,
  PickerMember,
  UserInfo,
} from "../../types";
import { useEffect, useState } from "react";
import MemberPicker from "../MemberPicker/MemberPicker";
import Input_old from "../Input_old";
import { DateTime } from "../DateTime";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import currency from "currency.js";
import LocationPicker from "../LocationPicker";
import LabelPicker from "../LabelPicker";
import { createExpense } from "../../api/services/api";
import { ExpenseFormProps } from "../../interfaces";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import { removeCommas } from "../../helpers/removeCommas";
import { useSignal } from "@preact/signals-react";
import { currencyMask } from "../../helpers/currencyMask";
import InputMonetary from "../InputMonetary/InputMonetary";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
import { useOutletContext } from "react-router-dom";
import { useSelectedCurrency } from "../../api/services/useSelectedCurrency";

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  group,
  expense,
  timeZoneId,
  menu,
}) => {
  const [participants, setParticipants] = useState<PickerMember[]>(
    createParticipantPickerArray(group, expense)
  );
  const [participantsError, setParticipantsError] = useState<string>("");

  const [payers, setPayers] = useState<PickerMember[]>(
    createPayerPickerArray(group, expense)
  );
  const [payersError, setPayersError] = useState<string>("");

  const [currencySymbol] = useState<string>(group.currency);
  const [amount, setAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [showAmountError, setShowAmountError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [expenseTime, setExpenseTime] = useState<string>(
    new Date().toISOString()
  );
  const [location, setLocation] = useState<GeoLocation | undefined>(
    expense?.location
  );

  const displayedAmount = useSignal<string>("");
  const currencyMenu = useSignal<string | null>(null);
  const queryClient = useQueryClient();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const updatedUserCurrency = useSelectedCurrency();
  const userCurrency = userInfo?.currency;

  const createExpenseMutation = useMutation<any, Error, CreateExpenseRequest>({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupExpenses"] });
      menu.value = null;
    },
    onError: (error) => {
      console.error("Log out failed:", error.message);
    },
  });

  const amountIsValid = () => {
    const numAmount = Number(amount);

    const isInvalid = !amount || numAmount <= 0;
    setAmountError(isInvalid ? "Enter a valid amount greater than zero" : "");
    return !isInvalid;
  };

  const submitExpense = () => {
    setShowAmountError(true);
    if (
      participants.length ===
      participants.filter((p) => p.selected === false).length
    ){
      setParticipantsError("Select at least one participant")
    }
    if(payers.length ===
      payers.filter((p) => p.selected === false).length)
      {
        setPayersError("Select at least one payer")
      }
      
    if (!amountIsValid()) return;

    const createExpenseRequest: CreateExpenseRequest = {
      amount: Number(amount),
      groupId: group.id,
      currency: currencySymbol,
      payments: payers
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      shares: participants
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      description: description,
      labelIds: [],
      location: location ?? null,
      occurred: expenseTime,
      labels: labels,
    };

    createExpenseMutation.mutate(createExpenseRequest);
  };

  useEffect(() => {
    amountIsValid();
    const selectedParticipants = participants.filter((x) => x.selected);
    const areParticipantsNumbersValid = selectedParticipants.every(
      (x) => x.amount !== "NaN" && Number(x.amount) > 0
    );
    const isParticipantsSumInvalid =
      selectedParticipants.length > 0 &&
      selectedParticipants.reduce(
        (acc, payer) => currency(acc).add(payer.amount).value,
        0
      ) !== currency(amount).value;

    const selectedPayers = payers.filter((x) => x.selected);
    const arePayersNumbersValid = selectedPayers.every(
      (x) => x.amount !== "NaN" && Number(x.amount) > 0
    );
    const isPayersSumInvalid =
      selectedPayers.length > 0 &&
      selectedPayers.reduce(
        (acc, payer) => currency(acc).add(payer.amount).value,
        0
      ) !== currency(amount).value;

    // Validate amount when participants or payers are selected
    if (selectedParticipants.length > 0 || selectedPayers.length > 0) {
      setShowAmountError(true);
    }

    const errorsWithTimeOut = setTimeout(() => {
      setParticipantsError(
        !areParticipantsNumbersValid
          ? "Amounts must be positive"
          : isParticipantsSumInvalid
          ? "Amounts must add up to total"
          : ""
      );
      setPayersError(
        !arePayersNumbersValid
          ? "Amounts must be positive"
          : isPayersSumInvalid
          ? "Amounts must add up to total"
          : ""
      );
    }, 200);

    return () => clearTimeout(errorsWithTimeOut);
  }, [amount, participants, payers]);

  const amountNumber = !amountError ? Number(amount) : Number.NaN;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = currencyMask(e).target.value;
    const numericValue = Number(removeCommas(newValue));
    if (numericValue <= 999999999999.99) {
      displayedAmount.value = newValue;
      setAmount(removeCommas(newValue));
    }
  };

  const handleInputBlur = () => {
    if (
      participants.some((p) => p.selected) ||
      payers.some((p) => p.selected)
    ) {
      setShowAmountError(true);
      amountIsValid();
    }
  };

  const handldeCurrencyOptionsClick = (curr: string) => {
    updatedUserCurrency.mutate(curr);
    currencyMenu.value = null;
  };

  return (
    <StyledExpenseForm>
      <div className="inputAndErrorsWrapper">
        <InputMonetary
          currencyMenu={currencyMenu}
          value={displayedAmount.value}
          onChange={(e) => handleInputChange(e)}
          onBlur={handleInputBlur}
          userCurrency={userCurrency}
          autoFocus={true}
          inputError={showAmountError && !!amountError}
        />
        <span className="errorMsg">
          {showAmountError && amountError ? amountError : ""}
        </span>
      </div>
      <MemberPicker
        description={"Participants"}
        totalAmount={amountNumber}
        memberAmounts={participants}
        error={participantsError}
        setMemberAmounts={setParticipants}
        group={group}
        userCurrency={userCurrency}
      />
      <MemberPicker
        description={"Payers"}
        totalAmount={amountNumber}
        memberAmounts={payers}
        error={payersError}
        setMemberAmounts={setPayers}
        group={group}
        userCurrency={userCurrency}
      />
      <Input_old
        description="Description"
        placeholder="e.g. Air tickets"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
 
      <LabelPicker labels={labels} setLabels={setLabels} groupId={group.id} />
      <LocationPicker location={location} setLocation={setLocation} />
      {/* <DateTime
        selectedDateTime={expenseTime}
        setSelectedDateTime={setExpenseTime}
        timeZoneId={timeZoneId}
      /> */}
      <Button className="submit-button" onClick={() => (menu.value = null)}>
        Close
      </Button>
      <Button className="submit-button" onClick={submitExpense}>
        Submit
      </Button>

      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        userInfo={userInfo}
      />
    </StyledExpenseForm>
  );
};

export default ExpenseForm;

const createParticipantPickerArray = (
  group: Group,
  expense: FormExpense | null
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => ({
    id: member.id,
    amount:
      expense?.participants.find((p) => p.memberId === member.id)
        ?.participationAmount ?? "",
    locked: false,
    name: member.name,
    order: 0,
    selected:
      expense?.participants.some((p) => p.memberId === member.id) ?? false,
  }));
};

const createPayerPickerArray = (
  group: Group,
  expense: FormExpense | null
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => ({
    id: member.id,
    amount:
      expense?.payers.find((p) => p.memberId === member.id)?.paymentAmount ??
      "",
    locked: false,
    name: member.name,
    order: 0,
    selected: expense?.payers.some((p) => p.memberId === member.id) ?? false,
  }));
};
