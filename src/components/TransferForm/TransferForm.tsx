import { TransferFormProps } from '../../interfaces';
import { StyledTransferForm } from './TransferForm.styled';
import { useEffect } from 'react';
import { signal, useSignal } from '@preact/signals-react';
import { DateTime } from '../DateTime';
import MyButton from '../MyButton/MyButton';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../Animations/CurrencyOptionsAnimation';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { UserInfo } from '../../types';
import FormInput from '../FormInput/FormInput';
import DateDisplay from '../ExpenseForm/components/DateDisplay/DateDisplay';
import {
  useTransferActions,
  useTransferData,
} from './hooks/useTransferFormStore';
import { Header } from './Header/Header';
import { InputAndErrorsWrapper } from './InputAndErrorsWrapper/InputAndErrorsWrapper';
import { NonGroupMenu } from './NonGroupMenu/NonGroupMenu';
import { GroupMenu } from './GroupMenu/GroupMenu';
import { useTransferFormLogic } from './hooks/useTransferFormLogic';
import GeneralWarningMenuAnimation from '../Animations/GeneralWarningMenuAnimation';

export default function TransferForm({
  groupMembers,
  currency,
  timeZoneId,
  menu,
  fromHomeGroup,
  groupId,
  nonGroupMenu,
  fromHome,
}: TransferFormProps) {
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const isSubmitting = useSignal<boolean>(false);
  const navigate = useNavigate();
  const displayedAmount = useSignal<string>('');
  const currencyMenu = useSignal<string | null>(null);
  const isDateShowing = useSignal<boolean>(false);
  const warningMenu = useSignal<string | null>(null);
  const warningMessage = useSignal<string>('');

  const showWarning = (message: string) => {
    warningMessage.value = message;
    warningMenu.value = 'generalWarning';
  };

  const data = useTransferData();
  const actions = useTransferActions();

  const isNonGroup = !groupId;

  useEffect(() => {
    if (userInfo?.userId) {
      actions.initForm(currency, userInfo.userId, isNonGroup);
      displayedAmount.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.userId, currency, actions, displayedAmount]);

  useEffect(() => {
    if (!userInfo?.userId) return;
    actions.setSenderId(isNonGroup ? userInfo.userId : '');
    actions.setReceiverId('');
  }, [isNonGroup, userInfo?.userId, actions]);

  const {
    handleInputBlur,
    handleCurrencyOptionsClick,
    submitTransfer,
    userMemberId,
    noReceiverSelected,
    sortedMembers,
    idError,
    isPendingCreateTransfer,
  } = useTransferFormLogic({
    userInfo,
    groupId,
    groupMembers,
    menu,
    nonGroupMenu,
    fromHomeGroup,
    navigate,
    isSubmitting,
    displayedAmount,
    currencyMenu,
    data,
    actions,
    isNonGroup,
    showWarning,
  });

  return (
    <StyledTransferForm
      $inputError={data.errors.showIdError}
      $noReceiverSelected={noReceiverSelected}
      $isSamePersonError={data.errors.showSamePersonError}
    >
      {' '}
      <Header menu={menu} />
      <div className="formScroll">
      <InputAndErrorsWrapper
        currencyMenu={currencyMenu}
        displayedAmount={displayedAmount}
        data={data}
        actions={actions}
        handleInputBlur={handleInputBlur}
      />
      {isNonGroup && nonGroupMenu ? (
        <NonGroupMenu
          $noReceiverSelected={noReceiverSelected}
          $isSamePersonError={data.errors.showSamePersonError}
          data={data}
          actions={actions}
          fromHome={fromHome}
          nonGroupMenu={nonGroupMenu}
          currentUserName={userInfo?.username}
        />
      ) : (
        <GroupMenu
          fromHomeGroup={fromHomeGroup}
          idError={idError}
          data={data}
          actions={actions}
          userMemberId={userMemberId}
          sortedMembers={sortedMembers}
        />
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
      </div>
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
          category={signal('Transfers')}
          isDateShowing={isDateShowing}
          showPicker={data.showPicker}
          setShowPicker={actions.setShowPicker}
          realtimeUpdate={data.isTrackingNow}
          setRealtimeUpdate={actions.setIsTrackingNow}
        />
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <MenuAnimationBackground menu={warningMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handleCurrencyOptionsClick}
        selectedCurrency={data.currencySymbol}
      />
      <GeneralWarningMenuAnimation
        menu={warningMenu}
        message={warningMessage.value}
      />
    </StyledTransferForm>
  );
}
