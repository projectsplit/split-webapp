import { IoClose } from "react-icons/io5";
import { TransferFormProps } from "../../interfaces";
import { StyledTransferForm } from "./TransferForm.styled";
import InputMonetary from "../InputMonetary/InputMonetary";
import { useCallback, useEffect, useMemo } from "react";
import { signal, useComputed, useSignal } from "@preact/signals-react";
import { handleInputChange } from "../../helpers/handleInputChange";
import { amountIsValid } from "../../helpers/amountIsValid";
import { DateTime } from "../DateTime";
import MyButton from "../MyButton/MyButton";
import MenuAnimationBackground from "../Animations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Animations/CurrencyOptionsAnimation";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CreateTransferRequest, Member, UserInfo } from "../../types";
import FormInput from "../FormInput/FormInput";
import DateDisplay from "../ExpenseForm/components/DateDisplay/DateDisplay";
import SendMenuWrapper from "./SendMenuWrapper/SendMenuWrapper";
import { TiGroup } from "react-icons/ti";
import { SelectedGroup } from "../Menus/NonGroupUsersMenus/SelectionLists/SelectedGroup";
import { useCreateGroupTransfer } from "@/api/auth/CommandHooks/useCreateGroupTransfer";
import { useCreateNonGroupTransfer } from "@/api/auth/CommandHooks/useCreateNonGroupTransfer";
import { useTransferActions, useTransferData } from "./hooks/useTransferFormStore";

export default function TransferForm({
  groupMembers,
  nonGroupUsers,
  currency,
  timeZoneId,
  menu,
  nonGroupGroup,
  groupId,
  isnonGroupTransfer,
  nonGroupMenu,
  fromHome,
}: TransferFormProps) {

  const { userInfo } = useOutletContext<{ userInfo: UserInfo; }>();
  const isSubmitting = useSignal<boolean>(false);
  const navigate = useNavigate();
  const displayedAmount = useSignal<string>("");
  const currencyMenu = useSignal<string | null>(null);
  const isDateShowing = useSignal<boolean>(false);

  const data = useTransferData();
  const actions = useTransferActions();

  useEffect(() => {
    actions.initForm(currency, userInfo?.userId, !!isnonGroupTransfer?.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    actions.setError('showAmountError', true);
    amountIsValid(data.amount, (err) => actions.setError('amountError', err));
  }, [data.amount, actions]);

  const userMembers = groupMembers?.value.filter(
    (item): item is Member => "userId" in item
  );

  const userMemberId = userMembers?.find(
    (m) => m.userId === userInfo?.userId
  )?.id;

  const { noReceiverSelected, isSamePerson } = useMemo(() => {
    return {
      noReceiverSelected: nonGroupMenu?.value.receiverName === "",
      isSamePerson:
        nonGroupMenu?.value.senderId === nonGroupMenu?.value.receiverId,
    };
  }, [nonGroupMenu?.value.senderId, nonGroupMenu?.value.receiverId]);

  const { mutate: createGroupTransferMutation, isPending: isGroupTransferPending } = useCreateGroupTransfer(
    menu,
    groupId,
    navigate,
    isSubmitting,
    nonGroupGroup
  );

  const { mutate: createNonGroupTransferMutation, isPending: isNonGroupTransferPending } = useCreateNonGroupTransfer(
    menu,
    navigate,
    isSubmitting,
  );

  const createTransferMutation = isnonGroupTransfer?.value
    ? createNonGroupTransferMutation
    : createGroupTransferMutation;

  const isPendingCreateTransfer = isnonGroupTransfer?.value
    ? isNonGroupTransferPending
    : isGroupTransferPending;

  const handleCurrencyOptionsClick = useCallback(
    (curr: string) => {
      actions.setCurrencySymbol(curr);
      currencyMenu.value = null;
      actions.setAmount("");
      displayedAmount.value = "";
    },
    [actions, currencyMenu]
  );


  const submitTransfer = useCallback(() => {
    actions.setError('showAmountError', true);
    actions.setError('showIdError', true);

    if (noReceiverSelected) {
      actions.setError('recipientError', "Select a recipient");
    }
    if (isSamePerson) {
      actions.setError('isSameUserError', "Sender and receiver cannot be the same person");
      actions.setError('showSamePersonError', true);
    }

    if (!amountIsValid(data.amount, (err) => actions.setError('amountError', err))) return;

    if (!!data.errors.idErrorMessage) return;

    let createTransferRequest: CreateTransferRequest = {
      amount: Number(data.amount),
      groupId: groupId,
      currency: data.currencySymbol,
      receiverId: data.receiverId,
      senderId: data.senderId,
      occurred: data.transferTime,
      description: data.description,
    };

    createTransferMutation(createTransferRequest);
  }, [
    actions,
    noReceiverSelected,
    isSamePerson,
    data.amount,
    data.errors.idErrorMessage,
    data.currencySymbol,
    data.receiverId,
    data.senderId,
    data.transferTime,
    data.description,
    groupId,
    createTransferMutation,
  ]);

  const sortedMembers = useComputed(() => {
    if (!!groupId) {
      return [...groupMembers.value].sort((a, b) =>
        a.id === userMemberId ? -1 : b.id === userMemberId ? 1 : 0
      );
    } else {
      return [...groupMembers.value].sort((a, b) =>
        a.id === userInfo?.userId ? -1 : b.id === userInfo?.userId ? 1 : 0
      );
    }
  });

  useEffect(() => {
    if (nonGroupMenu?.value.senderId) {
      actions.setSenderId(nonGroupMenu.value.senderId);
    }
    if (nonGroupMenu?.value.receiverId) {
      actions.setReceiverId(nonGroupMenu.value.receiverId);
    }
  }, [nonGroupMenu?.value.senderId, nonGroupMenu?.value.receiverId, actions]);

  useEffect(() => {
    if (isnonGroupTransfer?.value && !data.senderId && userInfo?.userId) return;
    if (data.senderId === data.receiverId && data.senderId !== "") {
      actions.setError('isReceiverError', true);
      actions.setError('isSenderError', true);
      actions.setError('idErrorMessage', "Sender and receiver cannot be the same person");
    } else if (data.senderId === "" && data.receiverId === "") {
      actions.setError('idErrorMessage', "Select a sender and a receiver");
      actions.setError('isReceiverError', true);
      actions.setError('isSenderError', true);
    } else {

      actions.setError('idErrorMessage', "");
      actions.setError('isReceiverError', false);
      actions.setError('isSenderError', false);
    }
  }, [data.senderId, data.receiverId]);

  const idError = useMemo(() => ({
    isSenderError: data.errors.isSenderError,
    isReceiverError: data.errors.isReceiverError,
    error: data.errors.idErrorMessage
  }), [data.errors.isSenderError, data.errors.isReceiverError, data.errors.idErrorMessage]);

  return (
    <StyledTransferForm
      $inputError={data.errors.showIdError}
      $noReceiverSelected={noReceiverSelected}
      $isSamePersonError={data.errors.showSamePersonError}
    >
      {" "}
      <div className="header">
        <div className="gap"></div>
        <div className="title">New Transfer</div>
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
            handleInputChange(e, data.currencySymbol, displayedAmount, actions.setAmount);
            actions.setError('showAmountError', false);
            actions.setError('showSamePersonError', false);
            actions.setError('isSameUserError', "");
            actions.setError('recipientError', "");
          }}
          onBlur={handleInputBlur}
          currency={data.currencySymbol}
          autoFocus={true}
          $inputError={data.errors.showAmountError && !!data.errors.amountError}
        />
        <span className="errorMsg">
          {data.errors.showAmountError && data.errors.amountError ? data.errors.amountError : ""}
        </span>
      </div>
      {isnonGroupTransfer &&
        isnonGroupTransfer.value &&
        nonGroupMenu &&
        nonGroupGroup?.value === null ? (
        <div className="options">
          <div className="nonGroupMenu">
            <div className="textAndButton">
              <div className="text"> Sent from </div>
              <div
                className="button senderButton"
                onClick={() => {
                  nonGroupMenu.value = {
                    ...nonGroupMenu.value,
                    attribute: "sender",
                    menu: "nonGroupTransfer",
                  };
                  // setShowSamePersonError(false);
                  actions.setError('showSamePersonError', false);
                  actions.setError('isSameUserError', "");
                  actions.setError('showIdError', false);
                }}
              >
                {nonGroupMenu.value.senderName}
              </div>{" "}
            </div>
            <div className="textAndButton">
              <div className="text"> and received by </div>
              <div
                className="button receiverButton"
                onClick={() => {
                  nonGroupMenu.value = {
                    ...nonGroupMenu.value,
                    attribute: "receiver",
                    menu: "nonGroupTransfer",
                  };
                  actions.setError('showSamePersonError', false);
                  actions.setError('isSameUserError', "");
                  actions.setError('showIdError', false);
                }}
              >
                {nonGroupMenu.value.receiverName === ""
                  ? "select user"
                  : nonGroupMenu.value.receiverName}
              </div>
            </div>
          </div>
          <span className="errorMsg">
            {data.errors.showAmountError &&
              data.errors.recipientError &&
              noReceiverSelected
              ? data.errors.recipientError
              : ""}
            {data.errors.showAmountError && data.errors.isSameUserError
              ? data.errors.isSameUserError
              : ""}
            {data.errors.showIdError && data.errors.idErrorMessage ? data.errors.idErrorMessage : ""}
          </span>
          {fromHome && <div className="buttonWrapper">
            <div
              className="groupButton"
              onClick={() => {
                actions.setError('showAmountError', false);
                actions.setError('showIdError', false);
                nonGroupMenu.value = {
                  ...nonGroupMenu.value,
                  attribute: "groups",
                  menu: "nonGroupTransfer",
                };
              }}
            >
              <TiGroup className="groupIcon" />
              <span className="descr">Groups</span>
            </div>
          </div>}
        </div>
      ) : (
        <div className="groupMenu">
          {nonGroupGroup && isnonGroupTransfer && (
            <div className="nonGroupGroupPill">
              <SelectedGroup
                group={nonGroupGroup.value}
                onRemove={() => {
                  nonGroupGroup.value = null;
                  isnonGroupTransfer.value = true;
                }}
              />
              <div />
            </div>
          )}
          <SendMenuWrapper
            title="Sender"
            idError={idError}
            id={data.senderId}
            setId={actions.setSenderId}
            setShowIdError={(val: boolean) => actions.setError('showIdError', val)}
            userMemberId={userMemberId}
            showIdError={data.errors.showIdError}
            sortedMembers={sortedMembers}
          />
          <SendMenuWrapper
            title="Receiver"
            idError={idError}
            id={data.receiverId}
            setId={actions.setReceiverId}
            setShowIdError={(val: boolean) => actions.setError('showIdError', val)}
            userMemberId={userMemberId}
            showIdError={data.errors.showIdError}
            sortedMembers={sortedMembers}
          />
        </div>
      )}
      <FormInput
        description=""
        placeholder="Description"
        value={data.description}
        onChange={(e) => actions.setDescription(e.target.value)}
      />
      {isDateShowing.value && (
        <DateDisplay
          selectedDateTime={data.transferTime}
          timeZoneId={timeZoneId}
          setTime={actions.setTransferTime}
          isDateShowing={isDateShowing}
          setShowPicker={actions.setShowPicker}
        />
      )}
      <div className="spacer"></div>
      <div className="bottomButtons">
        <div className="submitButton">
          <MyButton
            fontSize="16"
            onClick={submitTransfer}
            isLoading={isPendingCreateTransfer}
          >
            Submit
          </MyButton>
        </div>

        <DateTime
          selectedDateTime={data.transferTime}
          setSelectedDateTime={actions.setTransferTime}
          timeZoneId={timeZoneId}
          isEdit={false}
          category={signal("Transfers")}
          isDateShowing={isDateShowing}
          showPicker={data.showPicker}
          setShowPicker={actions.setShowPicker}
        />
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handleCurrencyOptionsClick}
        selectedCurrency={data.currencySymbol}
      />
    </StyledTransferForm>
  );
}
