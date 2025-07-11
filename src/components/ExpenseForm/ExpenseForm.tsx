import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import {
  GeoLocation,
  Label,
  PickerMember,
  UserInfo,
} from "../../types";
import MyButton from "../MyButton/MyButton";
import { DateTime } from "../DateTime";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
import LocationPicker from "../LocationPicker/LocationPicker";
import LabelPicker from "../LabelPicker/LabelPicker";
import MemberPicker from "../MemberPicker/MemberPicker";
import { handleInputChange } from "../../helpers/handleInputChange";
import InputMonetary from "../InputMonetary/InputMonetary";
import { IoClose } from "react-icons/io5";
import { amountIsValid } from "../../helpers/amountIsValid";
import { useSignal } from "@preact/signals-react";
import FormInput from "../FormInput/FormInput";
import { ExpenseFormProps } from "../../interfaces";
import { useExpense } from "../../api/services/useExpense";
import { useEditExpense } from "../../api/services/useEditExpense";
import {
  createParticipantPickerArray,
  createPayerPickerArray,
  submitExpense,
} from "./expenseFormUtils";

import { useSetBySharesAmountsToZero } from "./hooks/useSetBySharesAmountsToZero";
import { useExpenseValidation } from "./hooks/useExpenseValidation";
import { useOutletContext } from "react-router-dom";

export default function ExpenseForm({
  group,
  expense,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  header,
  selectedExpense,
  isCreateExpense,
}: ExpenseFormProps) {
  const isInitialRender = useRef<boolean>(true);

  const { mutate: createExpenseMutation, isPending: isPendingCreateExpense } =
    useExpense(menu, group.id);

  const { mutate: editExpenseMutation, isPending: isPendingEditExpense } =
    useEditExpense(menu, selectedExpense, group.id);

  const [participantsByCategory, setParticipantsByCategory] = useState<{
    Amounts: PickerMember[];
    Shares: PickerMember[];
    Percentages: PickerMember[];
  }>({
    Amounts: createParticipantPickerArray(
      group,
      expense,
      "Amounts",
      isCreateExpense
    ),
    Shares: createParticipantPickerArray(
      group,
      expense,
      "Shares",
      isCreateExpense
    ),
    Percentages: createParticipantPickerArray(
      group,
      expense,
      "Percentages",
      isCreateExpense
    ),
  });

  const [participantsError, setParticipantsError] = useState<string>("");

  const [payersByCategory, setPayersByCategory] = useState<{
    Amounts: PickerMember[];
    Shares: PickerMember[];
    Percentages: PickerMember[];
  }>({
    Amounts: createPayerPickerArray(group, expense, "Amounts", isCreateExpense),
    Shares: createPayerPickerArray(group, expense, "Shares", isCreateExpense),
    Percentages: createPayerPickerArray(
      group,
      expense,
      "Percentages",
      isCreateExpense
    ),
  });

  const [payersError, setPayersError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const [currencySymbol, setCurrencySymbol] = useState<string>(
    isCreateExpense || !expense ? group.currency : expense.currency
  );
  const [amount, setAmount] = useState<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );
  const [amountError, setAmountError] = useState<string>("");

  const [showAmountError, setShowAmountError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>(
    isCreateExpense || !expense ? "" : expense.description
  );
  const [labels, setLabels] = useState<Label[]>(
    isCreateExpense || !expense ? [] : expense.labels
  );
  const [expenseTime, setExpenseTime] = useState<string>(
    isCreateExpense || !expense
      ? new Date().toISOString()
      : expense.expenseTime.toISOString()
  );

  const location = useSignal<GeoLocation | undefined>(
    expense?.location ?? undefined
  );

  const displayedAmount = useSignal<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );
  const currencyMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);
  const participantsCategory = useSignal<string>("Amounts");
  const payersCategory = useSignal<string>("Amounts");

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const members = group?.members;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;

  const participants =
    participantsByCategory[
      participantsCategory.value as keyof typeof participantsByCategory
    ];
  const payers =
    payersByCategory[payersCategory.value as keyof typeof payersByCategory];

  const adjustParticipants = useMemo(() => {
    return participants.map((m) =>
      m.id === userMemberId ? { ...m, name: "you" } : m
    );
  }, [participants, userMemberId]);

  const adjustPayers = useMemo(() => {
    return payers.map((m) =>
      m.id === userMemberId ? { ...m, name: "you" } : m
    );
  }, [payers, userMemberId]);

  const setParticipants = (newParticipants: PickerMember[]) => {
    setParticipantsByCategory((prev) => ({
      ...prev,
      [participantsCategory.value]: newParticipants,
    }));
  };

  const setPayers = (newPayers: PickerMember[]) => {
    setPayersByCategory((prev) => ({
      ...prev,
      [payersCategory.value]: newPayers,
    }));
  };

  const onSubmit = () =>
    submitExpense({
      participants,
      setParticipantsError,
      payers,
      setPayersError,
      amount,
      setAmountError,
      location,
      description,
      setDescriptionError,
      isCreateExpense,
      group,
      expense,
      currencySymbol,
      expenseTime,
      labels,
      createExpenseMutation,
      editExpenseMutation,
      setShowAmountError,
      participantsCategory,
      payersCategory,
    });

  useExpenseValidation({
    amount,
    participants,
    payers,
    currencySymbol,
    setParticipantsError,
    setPayersError,
    setShowAmountError,
    setAmountError,
    participantsCategory,
    payersCategory,
  });

  const prevParticipantsByCategory = useRef(participantsByCategory);
  const prevPayersByCategory = useRef(payersByCategory);

  useSetBySharesAmountsToZero(
    payersCategory,
    prevPayersByCategory,
    payersByCategory,
    participantsCategory,
    prevParticipantsByCategory,
    participantsByCategory,
    setParticipantsByCategory,
    setPayersByCategory
  );

  useEffect(() => {
    if (isInitialRender.current && !isCreateExpense) {
      isInitialRender.current = false; // Mark initial render as done
      return;
    }
    setAmount("");
    displayedAmount.value = "";
  }, [currencySymbol]);

  useEffect(() => {
    if (!isCreateExpense) return;
    setDescriptionError("");
  }, [location.value, description]);

  useEffect(() => {
    setParticipantsError("");
    setPayersError("");
  }, [participantsByCategory["Shares"], payersByCategory["Shares"]]);

  const amountNumber = !amountError ? Number(amount) : Number.NaN;

  const handleInputBlur = useCallback(() => {
    if (
      participants.some((p) => p.selected) ||
      payers.some((p) => p.selected)
    ) {
      setShowAmountError(true);
      amountIsValid(amount, setAmountError);
    }
  }, [participants, payers, amount, setAmountError]);

  const handleCurrencyOptionsClick = useCallback(
    (curr: string) => {
      setCurrencySymbol(curr);
      currencyMenu.value = null;
    },
    [currencyMenu]
  );

  const handleInputChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e, currencySymbol, displayedAmount, setAmount);
      setShowAmountError(false);
    },
    [currencySymbol, displayedAmount, setAmount]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  return (
    <StyledExpenseForm>
      <div className="header">
        <div className="gap"></div>
        <div className="title">{header}</div>

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
          onChange={handleInputChangeCallback}
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
        memberAmounts={adjustParticipants}
        error={participantsError}
        setMemberAmounts={setParticipants}
        group={group}
        selectedCurrency={currencySymbol}
        category={participantsCategory}
        userMemberId={userMemberId}
      />
      <MemberPicker
        description={"Payers"}
        totalAmount={amountNumber}
        memberAmounts={adjustPayers}
        error={payersError}
        setMemberAmounts={setPayers}
        group={group}
        selectedCurrency={currencySymbol}
        category={payersCategory}
        userMemberId={userMemberId}
      />
      <FormInput
        description="Description"
        placeholder="e.g. Air tickets"
        value={description}
        error={descriptionError}
        onChange={handleDescriptionChange}
      />
      <LabelPicker labels={labels} setLabels={setLabels} groupId={group.id} />
      <LocationPicker
        location={location}
        isMapOpen={isMapOpen}
        timeZoneCoordinates={timeZoneCoordinates}
      />
      <DateTime
        selectedDateTime={expenseTime}
        setSelectedDateTime={setExpenseTime}
        timeZoneId={timeZoneId}
        isEdit={!isCreateExpense}
      />
      <div className="spacer"></div>
      <MyButton
        fontSize="16"
        onClick={onSubmit}
        isLoading={
          isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
        }
      >
        Submit
      </MyButton>
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handleCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />
    </StyledExpenseForm>
  );
}
