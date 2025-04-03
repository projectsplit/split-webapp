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
import currency from "currency.js";
import LocationPicker from "../LocationPicker/LocationPicker";
import LabelPicker from "../LabelPicker/LabelPicker";
import { ExpenseFormProps } from "../../interfaces";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import { useSignal } from "@preact/signals-react";
import InputMonetary from "../InputMonetary/InputMonetary";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
import { useOutletContext } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import MyButton from "../MyButton/MyButton";
import { handleInputChange } from "../../helpers/handleInputChange";
import { amountIsValid } from "../../helpers/amountIsValid";
import { useExpense } from "../../api/services/useExpense";

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

  const [currencySymbol, setCurrencySymbol] = useState<string>(group.currency);
  const [amount, setAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [showAmountError, setShowAmountError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [expenseTime, setExpenseTime] = useState<string>(
    new Date().toISOString()
  );
  const location = useSignal<GeoLocation | undefined>(expense?.location);

  const displayedAmount = useSignal<string>("");
  const currencyMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const userCurrency = userInfo?.currency;
  const { mutate: createExpenseMutation, isPending } = useExpense(menu);

  const submitExpense = () => {
    setShowAmountError(true);
    if (
      participants.length ===
      participants.filter((p) => p.selected === false).length
    ) {
      setParticipantsError("Select at least one participant");
    }
    if (payers.length === payers.filter((p) => p.selected === false).length) {
      setPayersError("Select at least one payer");
    }

    if (!amountIsValid(amount, setAmountError)) return;

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
      location: location.value ?? null,
      occurred: expenseTime,
      labels: labels,
    };

    createExpenseMutation(createExpenseRequest);
  };

  useEffect(() => {
    amountIsValid(amount, setAmountError);
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
  
  useEffect(() => {
    setAmount("");
    displayedAmount.value = "";
  }, [currencySymbol]);

  const amountNumber = !amountError ? Number(amount) : Number.NaN;

  const handleInputBlur = () => {
    if (
      participants.some((p) => p.selected) ||
      payers.some((p) => p.selected)
    ) {
      setShowAmountError(true);
      amountIsValid(amount, setAmountError);
    }
  };

  const handldeCurrencyOptionsClick = (curr: string) => {
    setCurrencySymbol(curr);
    currencyMenu.value = null;
  };

  return (
    <StyledExpenseForm>
      <div className="header">
        <div className="gap"></div>
        <div className="title">New Expense</div>

        <div
          className="closeButtonContainer"
          onClick={() => (menu.value = null)}
        >
          <IoClose className="closeButton" />
        </div>
      </div>
      <div className="inputAndErrorsWrapper">
        <InputMonetary
          currencyMenu={currencyMenu}
          value={displayedAmount.value}
          onChange={(e) => {
            handleInputChange(e, currencySymbol, displayedAmount, setAmount);
            setShowAmountError(false);
          }}
          onBlur={handleInputBlur}
          currency={currencySymbol}
          autoFocus={true}
          $inputError={showAmountError && !!amountError}
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
        selectedCurrency={currencySymbol}
      />
      <MemberPicker
        description={"Payers"}
        totalAmount={amountNumber}
        memberAmounts={payers}
        error={payersError}
        setMemberAmounts={setPayers}
        group={group}
        userCurrency={userCurrency}
        selectedCurrency={currencySymbol}
      />
      <Input_old
        description="Description"
        placeholder="e.g. Air tickets"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <LabelPicker labels={labels} setLabels={setLabels} groupId={group.id} />
      <LocationPicker location={location} isMapOpen={isMapOpen} />
      <DateTime
        selectedDateTime={expenseTime}
        setSelectedDateTime={setExpenseTime}
        timeZoneId={timeZoneId}
      />
      <div className="spacer"></div>
      <MyButton fontSize="16" onClick={submitExpense} isLoading={isPending}>
        Submit
      </MyButton>

      <MenuAnimationBackground menu={currencyMenu} />

      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
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
