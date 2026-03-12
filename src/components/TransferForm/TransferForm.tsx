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

export default function TransferForm({
  groupMembers,
  nonGroupUsers,
  currency,
  timeZoneId,
  menu,
  fromHomeGroup,
  groupId,
  isnonGroupTransfer,
  nonGroupMenu,
  fromHome,
}: TransferFormProps) {
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const isSubmitting = useSignal<boolean>(false);
  const navigate = useNavigate();
  const displayedAmount = useSignal<string>('');
  const currencyMenu = useSignal<string | null>(null);
  const isDateShowing = useSignal<boolean>(false);

  const data = useTransferData();
  const actions = useTransferActions();

  useEffect(() => {
    if (userInfo?.userId) {
      actions.initForm(currency, userInfo.userId, !!isnonGroupTransfer?.value);
    }
  }, [userInfo?.userId, currency, isnonGroupTransfer?.value, actions]);

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
    nonGroupUsers,
    isnonGroupTransfer,
    nonGroupMenu,
    fromHomeGroup,
    navigate,
    isSubmitting,
    displayedAmount,
    currencyMenu,
    data,
    actions,
  });

  return (
    <StyledTransferForm
      $inputError={data.errors.showIdError}
      $noReceiverSelected={noReceiverSelected}
      $isSamePersonError={data.errors.showSamePersonError}
    >
      {' '}
      <Header menu={menu} />
      <InputAndErrorsWrapper
        currencyMenu={currencyMenu}
        displayedAmount={displayedAmount}
        data={data}
        actions={actions}
        handleInputBlur={handleInputBlur}
      />
      {isnonGroupTransfer &&
      isnonGroupTransfer.value &&
      nonGroupMenu &&
      fromHomeGroup?.value === null ? (
        <NonGroupMenu
          $noReceiverSelected={noReceiverSelected}
          $isSamePersonError={data.errors.showSamePersonError}
          data={data}
          actions={actions}
          fromHome={fromHome}
          nonGroupMenu={nonGroupMenu}
          noReceiverSelected={noReceiverSelected}
        />
      ) : (
        <GroupMenu
          fromHomeGroup={fromHomeGroup}
          isnonGroupTransfer={isnonGroupTransfer}
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
          category={signal('Transfers')}
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
