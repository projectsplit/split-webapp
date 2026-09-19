import IonIcon from '@reacticons/ionicons';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { useSignal } from '@preact/signals-react';
import { useParams } from 'react-router-dom';
import { SettleUpOptionsProps } from '../../../interfaces';
import { StyledSettleUpOptions } from './SettleUpOptions.styled';
import { CreateTransfersRequest, Transfer } from '../../../types';
import { DateTime } from 'luxon';
import MyButton from '../../../components/MyButton/MyButton';
import { useTheme } from 'styled-components';
import { getUserName } from '@/helpers/getUserName';
import { useMultipleTransfers } from '@/api/auth/CommandHooks/useMultipleTransfers';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import GeneralWarningMenuAnimation from '@/components/Animations/GeneralWarningMenuAnimation';

export default function SettleUpOptions({
  pendingTransactions,
  idSelectedToSettleUp,
  menu,
  members,
  userId,
}: SettleUpOptionsProps) {
  const selectedItem = useSignal<number[]>([0]);
  const params = useParams();
  const groupId = params?.groupid;
  const warningMenu = useSignal<string | null>(null);
  const warningMessage = useSignal<string>('');

  const showWarning = (message: string) => {
    warningMessage.value = message;
    warningMenu.value = 'generalWarning';
  };

  const { mutate: submitMultipleTransfers, isPending } = useMultipleTransfers(
    menu,
    groupId,
    showWarning
  );
  const enabled = selectedItem.value.length > 0;
  const theme = useTheme();

  const memberPendingTransactions = pendingTransactions.filter(
    (p) =>
      p.debtor === idSelectedToSettleUp.value ||
      p.creditor === idSelectedToSettleUp.value
  );

  const selectedTransactions = selectedItem.value
    .map((index) => memberPendingTransactions[index])
    .filter(Boolean);

  const selectedCurrencies = new Set(selectedTransactions.map((t) => t.currency));

  const selectedTotal =
    selectedCurrencies.size === 1
      ? displayCurrencyAndAmount(
          selectedTransactions
            .reduce((sum, t) => sum + parseFloat(String(t.amount)), 0)
            .toString(),
          selectedTransactions[0].currency
        )
      : '';

  const counterpartIds = new Set(
    memberPendingTransactions.map((p) =>
      p.debtor === userId ? p.creditor : p.debtor
    )
  );

  const counterpartName =
    counterpartIds.size === 1
      ? members.find((member) => member.id === [...counterpartIds][0])?.name
      : undefined;

  const submitButtonHandler = () => {
    const selectedTransactions = selectedItem.value.map(
      (index) => memberPendingTransactions[index]
    );

    const transfers: Transfer[] = selectedTransactions.map((transaction) => ({
      description: 'Settled Debt',
      amount: transaction.amount,
      currency: transaction.currency,
      receiverId: transaction.creditor,
      senderId: transaction.debtor,
      occurred: DateTime.now().toUTC().toISO(),
    }));

    const createTransfersRequest: CreateTransfersRequest = {
      groupId,
      transfers,
    };

    submitMultipleTransfers(createTransfersRequest);
  };

  return (
    <StyledSettleUpOptions>
      <div className="sheetHandle" />

      <div className="settleUpHeader">
        <div className="header">
          {counterpartName ? `Settle up with ${counterpartName}` : 'Settle up'}
        </div>
        <div className="settleUpNote">
          Select the payments that have actually been made. Each one is recorded
          as a transfer.
        </div>
      </div>

      <div className="settleUpOptions">
        {memberPendingTransactions.map((p, index) => {
          const selected = selectedItem.value.includes(index);

          return (
            <div
              className={`settleUpOption ${selected ? 'clicked' : ''}`}
              key={index}
              onClick={() => {
                if (selected) {
                  selectedItem.value = selectedItem.value.filter(
                    (i) => i !== index
                  );
                } else {
                  selectedItem.value = [...selectedItem.value, index];
                }
              }}
            >
              <span className={`optionCheck ${selected ? 'checked' : ''}`}>
                {selected ? <IonIcon name="checkmark-outline" /> : null}
              </span>

              <div className="optionText">
                <span className="preposition">from </span>
                <span className="name">
                  {getUserName(p, members, userId, 'from')}
                </span>
                <span className="preposition"> to </span>
                <span className="name">
                  {getUserName(p, members, userId, 'to')}
                </span>
              </div>

              <span
                className="optionAmount"
                style={{
                  color:
                    p.creditor === userId
                      ? theme.direction.owed
                      : p.debtor === userId
                        ? theme.direction.owe
                        : theme.ink.primary,
                }}
              >
                {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="settleUpSummary">
        <span className="count">
          {selectedItem.value.length} of {memberPendingTransactions.length}{' '}
          selected
        </span>
        {selectedTotal ? (
          <span className="total">{selectedTotal}</span>
        ) : null}
      </div>

      <div className="settleUpButton">
        {' '}
        <MyButton
          onClick={() => submitButtonHandler()}
          disabled={!enabled}
          isLoading={isPending}
        >
          Record transfer
        </MyButton>
      </div>
      <MenuAnimationBackground menu={warningMenu} />
      <GeneralWarningMenuAnimation
        menu={warningMenu}
        message={warningMessage.value}
      />
    </StyledSettleUpOptions>
  );
}
