import { useEffect, useRef, } from "react";
import { PickerMember, SplitCategory, UserInfo, } from "@/types";
import MenuAnimationBackground from "@/components/Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "@/components/Menus/MenuAnimations/CurrencyOptionsAnimation";
import InputMonetary from "@/components/InputMonetary/InputMonetary";
import { useSignal } from "@preact/signals-react";
import { ExpenseFormProps } from "@/interfaces";
import { useCreateGroupExpense } from "@/api/services/useCreateGroupExpense";
import { useCreateNonGroupExpense } from "@/api/services/useCreateNonGroupExpense";
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
import { useEditExpenseMutation } from "@/api/services/useEditExpenseMutation";
import GeneralWarningMenuAnimation from "../Menus/MenuAnimations/GeneralWarningMenuAnimation";

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
  const userExistsInCategory = useSignal<
    Record<SplitCategory, boolean | undefined>
  >({
    Participants: false,
    Payers: false,
  });
  const navigate = useNavigate();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();

  const inputs = useExpenseFormStore();

  useEffect(() => {
    inputs.initialize({
      isCreateExpense,
      expense,
      currency,
      groupMembers,
      nonGroupUsers,
      userInfo,
      userMemberId: inputs.userMemberId,
      isnonGroupExpense,
    });
  }, [inputs.initialize, isCreateExpense, expense?.id, currency, userInfo]);

  useEffect(() => {
    if (inputs.isSubmitting) return
    inputs.updateMembers({
      groupMembers,
      nonGroupUsers,
      expense,
      isCreateExpense,
      isnonGroupExpense,
      userInfo,
      userMemberId: inputs.userMemberId,
    });
  }, [
    inputs.updateMembers,
    groupMembers?.value,
    nonGroupUsers?.value,
    isnonGroupExpense?.value,
    expense,
    isCreateExpense,
    userInfo,
    inputs.userMemberId,
  ]);

  const currencyMenu = useSignal<string | null>(null);
  const warningMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);
  const isDateShowing = useSignal<boolean>(!isCreateExpense);
  const labelMenuIsOpen = useSignal<boolean>(false);
  const displayedAmount = useSignal<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );

  const { participants, payers, adjustParticipants, adjustPayers } = useAdjustedMembers({
    participantsByCategory: inputs.participantsByCategory,
    payersByCategory: inputs.payersByCategory,
    participantsCategory: inputs.participantsCategory,
    payersCategory: inputs.payersCategory,
    nonGroupUsers,
    isnonGroupExpense,
    userInfo,
    userMemberId: inputs.userMemberId,
  });

  const setParticipants = (newParticipants: PickerMember[]) => {
    inputs.setParticipantsByCategory((prev) => ({
      ...prev,
      [inputs.participantsCategory.value]: newParticipants,
    }));
    inputs.validateForm({ showErrors: true })
  };

  const setPayers = (newPayers: PickerMember[]) => {
    inputs.setPayersByCategory((prev) => ({
      ...prev,
      [inputs.payersCategory.value]: newPayers,
    }));
    inputs.validateForm({ showErrors: true })
  };

  const { mutate: createGroupExpenseMutation, isPending: isPendingCreateGroupExpense } =
    useCreateGroupExpense(
      menu,
      groupId,
      navigate,
      inputs.setIsSubmitting,
      inputs.makePersonalClicked,
      nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      fromHome,
    );

  const { mutate: createNonGroupExpenseMutation, isPending: isPendingCreateNonGroupExpense } =
    useCreateNonGroupExpense(
      menu,
      navigate,
      inputs.setIsSubmitting,
      nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      inputs.makePersonalClicked
    );

  const createExpenseMutation = isnonGroupExpense?.value
    ? createNonGroupExpenseMutation
    : createGroupExpenseMutation;

  const isPendingCreateExpense = isnonGroupExpense?.value
    ? isPendingCreateNonGroupExpense
    : isPendingCreateGroupExpense;

  const { mutate: editExpenseMutation, isPending: isPendingEditExpense } =
    useEditExpenseMutation(menu, inputs.setIsSubmitting, nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      inputs.makePersonalClicked,
      isnonGroupExpense,
      selectedExpense);

  const onSubmit = () => {
    if (isnonGroupExpense?.value && !userExistsInCategory.value.Participants && !userExistsInCategory.value.Payers) {
      warningMenu.value = "generalWarning";
      return;
    }
    inputs.submitExpense({
      groupId,
      createExpenseMutation,
      editExpenseMutation,
      isnonGroupExpense,
      isCreateExpense,
      expense,
    });
  }

  const amountNumber = !inputs.amountError ? Number(inputs.amount) : 0;
  const { handleInputBlur, handleCurrencyOptionsClick, handleInputChangeCallback, handleDescriptionChange } = useHandlers(participants, payers, inputs.setShowAmountError, inputs.amount, inputs.setAmountError, inputs.setCurrencySymbol, currencyMenu, displayedAmount, inputs.setAmount, inputs.setParticipantsError, inputs.setPayersError, isInitialRender, inputs.validateForm, isCreateExpense, inputs.setDescription, inputs.setDescriptionError, inputs.currencySymbol)

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
          currency={inputs.currencySymbol}
          autoFocus={true}
          $inputError={inputs.showAmountError && !!inputs.amountError}
        />
        <span className="errorMsg">
          {inputs.showAmountError && inputs.amountError ? inputs.amountError : ""}
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
        participantsError={inputs.participantsError}
        currencySymbol={inputs.currencySymbol}
        participantsCategory={inputs.participantsCategory}
        userMemberId={inputs.userMemberId}
        setParticipantsError={inputs.setParticipantsError}
        isnonGroupExpense={isnonGroupExpense}
        userInfo={userInfo}
        groupMembers={groupMembers}
        nonGroupUsers={nonGroupUsers}
        nonGroupMenu={nonGroupMenu}
        adjustPayers={adjustPayers}
        setPayers={setPayers}
        payersError={inputs.payersError}
        setPayersError={inputs.setPayersError}
        payersCategory={inputs.payersCategory}
        isPersonal={isPersonal}
        userExistsInCategory={userExistsInCategory}
      />
      <FormInputWithTag
        description="Description"
        placeholder="Description"
        value={inputs.description}
        error={inputs.descriptionError}
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
        setMakePersonalClicked={inputs.setMakePersonalClicked}
      />
      {labelMenuIsOpen.value && (
        <LabelMenu
          labelMenuIsOpen={labelMenuIsOpen}
          labels={inputs.labels}
          setLabels={inputs.setLabels}
          groupId={groupId}
        />
      )}

      <LocationDisplay location={inputs.location} isMapOpen={isMapOpen} setLocation={inputs.setLocation} />
      {isDateShowing.value && (
        <DateDisplay
          selectedDateTime={inputs.expenseTime}
          timeZoneId={timeZoneId}
          setTime={inputs.setExpenseTime}
          isDateShowing={isDateShowing}
          setShowPicker={inputs.setShowPicker}
        />
      )}
      {inputs.labels.length > 0 ? (
        <LabelsDisplay
          labels={inputs.labels}
          setLabels={inputs.setLabels}
          labelMenuIsOpen={labelMenuIsOpen}
        />
      ) : null}
      <div className="spacer" />
      <ExpenseFormFooter
        onSubmit={onSubmit}
        isCreateExpense={isCreateExpense}
        isPendingCreateExpense={isPendingCreateExpense}
        isPendingEditExpense={isPendingEditExpense}
        location={inputs.location}
        isMapOpen={isMapOpen}
        timeZoneCoordinates={timeZoneCoordinates}
        setLocation={inputs.setLocation}
        setDescriptionError={inputs.setDescriptionError}
        expenseTime={inputs.expenseTime}
        setExpenseTime={inputs.setExpenseTime}
        timeZoneId={timeZoneId}
        isDateShowing={isDateShowing}
        showPicker={inputs.showPicker}
        setShowPicker={inputs.setShowPicker}
      />
      <MenuAnimationBackground menu={currencyMenu} />
      <MenuAnimationBackground menu={warningMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handleCurrencyOptionsClick}
        selectedCurrency={inputs.currencySymbol}
      />
      <GeneralWarningMenuAnimation menu={warningMenu} message={"You need to be either a participant or a payer in order to submit a non-group expense."} />
    </StyledExpenseForm>
  );
}
