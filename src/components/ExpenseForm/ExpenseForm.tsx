import { useEffect, useRef, } from "react";
import { PickerMember, UserInfo, } from "@/types";
import MenuAnimationBackground from "@/components/Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "@/components/Menus/MenuAnimations/CurrencyOptionsAnimation";
import InputMonetary from "@/components/InputMonetary/InputMonetary";
import { useSignal } from "@preact/signals-react";
import { ExpenseFormProps } from "@/interfaces";
import { useExpense } from "@/api/services/useExpense";
import { useEditExpense } from "@/api/services/useEditExpense";
import { useNavigate, useOutletContext } from "react-router-dom";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import { LocationDisplay } from "./components/LocationDisplay/LocationDisplay";
import DateDisplay from "./components/DateDisplay/DateDisplay";
import { LabelMenu } from "./components/LabelMenu/LabelMenu";
import LabelsDisplay from "./components/LabelsDisplay/LabelsDisplay";
import FormInputWithTag from "./components/FormInputWithTag/FormInputWithTag";
import DetailedSharedExpenseText from "./components/DetailedSharedExpenseText/DetailedSharedExpenseText";
import { ShareExpenseButtons } from "./components/ShareExpenseButtons/ShareExpenseButtons";
import { useAdjustedMembers } from "./hooks/useAdjustedMembers";
import { useExpenseFormStore } from "./hooks/useExpenseFormStore";
import { ExpenseFormHeader } from "./components/ExpenseFormHeader/ExpenseFormHeader";
import { ExpenseFormFooter } from "./components/ExpenseFormFooter/ExpenseFormFooter";
import { useHandlers } from "./hooks/useHandlers";

export default function ExpenseForm({
  groupMembers,
  nonGroupUsers,
  groupId,
  expense,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  header,
  selectedExpense,
  isCreateExpense,
  isPersonal,
  isnonGroupExpense,
  currency,
  nonGroupMenu,
  nonGroupGroup,
  fromHome
}: ExpenseFormProps) {

  const isInitialRender = useRef<boolean>(true);
  const navigate = useNavigate();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();

  const { amount,
    description,
    currencySymbol,
    expenseTime, labels,
    location, amountError,
    showAmountError,
    participantsError,
    payersError,
    descriptionError,
    participantsByCategory,
    payersByCategory,
    userMemberId,
    participantsCategory,
    payersCategory,
    makePersonalClicked,
    showPicker,
    isSubmitting,
    validateForm,
    submitExpense,
    setMakePersonalClicked,
    setShowPicker,
    setAmount,
    setDescription,
    setCurrencySymbol,
    setExpenseTime,
    setLabels,
    setLocation,
    setAmountError,
    setShowAmountError,
    setParticipantsError,
    setPayersError,
    setDescriptionError,
    setIsSubmitting,
    setParticipantsByCategory,
    setPayersByCategory,
    initialize,
    updateMembers,
  } = useExpenseFormStore();

  useEffect(() => {
    initialize({
      isCreateExpense,
      expense,
      currency,
      groupMembers,
      nonGroupUsers,
      userInfo,
      userMemberId,
      isnonGroupExpense,
    });
  }, [initialize, isCreateExpense, expense?.id, currency, userInfo]);

  useEffect(() => {
    if (isSubmitting) return
    updateMembers({
      groupMembers,
      nonGroupUsers,
      expense,
      isCreateExpense,
      isnonGroupExpense,
      userInfo,
      userMemberId,
    });
  }, [
    updateMembers,
    groupMembers?.value,
    nonGroupUsers?.value,
    isnonGroupExpense?.value,
    expense,
    isCreateExpense,
    userInfo,
    userMemberId,
  ]);

  const currencyMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);
  const isDateShowing = useSignal<boolean>(!isCreateExpense);
  const labelMenuIsOpen = useSignal<boolean>(false);
  const displayedAmount = useSignal<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );

  const { participants, payers, adjustParticipants, adjustPayers } = useAdjustedMembers({
    participantsByCategory,
    payersByCategory,
    participantsCategory,
    payersCategory,
    nonGroupUsers,
    isnonGroupExpense,
    userInfo,
    userMemberId,
  });

  const setParticipants = (newParticipants: PickerMember[]) => {
    setParticipantsByCategory((prev) => ({
      ...prev,
      [participantsCategory.value]: newParticipants,
    }));
    validateForm({ showErrors: true })
  };

  const setPayers = (newPayers: PickerMember[]) => {
    setPayersByCategory((prev) => ({
      ...prev,
      [payersCategory.value]: newPayers,
    }));
    validateForm({ showErrors: true })
  };

  const { mutate: createExpenseMutation, isPending: isPendingCreateExpense } =
    useExpense(menu, groupId, navigate, setIsSubmitting, nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      makePersonalClicked,
      isnonGroupExpense);

  const { mutate: editExpenseMutation, isPending: isPendingEditExpense } =
    useEditExpense(menu, groupId, setIsSubmitting, nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      makePersonalClicked,
      isnonGroupExpense,
      selectedExpense);

  const onSubmit = () => {
    submitExpense({
      groupId,
      createExpenseMutation,
      editExpenseMutation,
      isnonGroupExpense,
      isCreateExpense,
      expense,
    });
  }

  const amountNumber = !amountError ? Number(amount) : 0;
  const { handleInputBlur, handleCurrencyOptionsClick, handleInputChangeCallback, handleDescriptionChange } = useHandlers(participants, payers, setShowAmountError, amount, setAmountError, setCurrencySymbol, currencyMenu, displayedAmount, setAmount, setParticipantsError, setPayersError, isInitialRender, validateForm, isCreateExpense, setDescription, setDescriptionError, currencySymbol)

  return (
    <StyledExpenseForm>
      <ExpenseFormHeader
        header={header}
        isnonGroupExpense={isnonGroupExpense}
        fromHome={fromHome}
        nonGroupUsers={nonGroupUsers}
        groupMembers={groupMembers}
        isPersonal={isPersonal}
        nonGroupGroup={nonGroupGroup}
        menu={menu}
      />
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
      <DetailedSharedExpenseText
        nonGroupGroup={nonGroupGroup}
        isCreateExpense={isCreateExpense}
        isPendingCreateExpense={isPendingCreateExpense}
        isPendingEditExpense={isPendingEditExpense}
        amountNumber={amountNumber}
        adjustParticipants={adjustParticipants}
        setParticipants={setParticipants}
        participantsError={participantsError}
        currencySymbol={currencySymbol}
        participantsCategory={participantsCategory}
        userMemberId={userMemberId}
        setParticipantsError={setParticipantsError}
        isnonGroupExpense={isnonGroupExpense}
        userInfo={userInfo}
        groupMembers={groupMembers}
        nonGroupUsers={nonGroupUsers}
        nonGroupMenu={nonGroupMenu}
        adjustPayers={adjustPayers}
        setPayers={setPayers}
        payersError={payersError}
        setPayersError={setPayersError}
        payersCategory={payersCategory}
        isPersonal={isPersonal}
      />
      <FormInputWithTag
        description="Description"
        placeholder="Description"
        value={description}
        error={descriptionError}
        onChange={handleDescriptionChange}
        labelMenuIsOpen={labelMenuIsOpen}
      />
      <ShareExpenseButtons
        isPersonal={isPersonal}
        amountNumber={amountNumber}
        nonGroupUsers={nonGroupUsers}
        adjustParticipants={adjustParticipants}
        adjustPayers={adjustPayers}
        fromHome={fromHome}
        nonGroupMenu={nonGroupMenu}
        setMakePersonalClicked={setMakePersonalClicked}
      />
      {labelMenuIsOpen.value && (
        <LabelMenu
          labelMenuIsOpen={labelMenuIsOpen}
          labels={labels}
          setLabels={setLabels}
          groupId={groupId}
        />
      )}

      <LocationDisplay location={location} isMapOpen={isMapOpen} setLocation={setLocation} />
      {isDateShowing.value && (
        <DateDisplay
          selectedDateTime={expenseTime}
          timeZoneId={timeZoneId}
          setTime={setExpenseTime}
          isDateShowing={isDateShowing}
          setShowPicker={setShowPicker}
        />
      )}
      {labels.length > 0 ? (
        <LabelsDisplay
          labels={labels}
          setLabels={setLabels}
          labelMenuIsOpen={labelMenuIsOpen}
        />
      ) : null}
      <div className="spacer" />
      <ExpenseFormFooter
        onSubmit={onSubmit}
        isCreateExpense={isCreateExpense}
        isPendingCreateExpense={isPendingCreateExpense}
        isPendingEditExpense={isPendingEditExpense}
        location={location}
        isMapOpen={isMapOpen}
        timeZoneCoordinates={timeZoneCoordinates}
        setLocation={setLocation}
        setDescriptionError={setDescriptionError}
        expenseTime={expenseTime}
        setExpenseTime={setExpenseTime}
        timeZoneId={timeZoneId}
        isDateShowing={isDateShowing}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
      />
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handleCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />
    </StyledExpenseForm>
  );
}
