import { StyledMembersInfoBox } from './MembersInfoBox.styled';
import { MembersInfoBoxProps } from '../../../interfaces';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import Currency from 'currency.js';
import {
  GroupTransaction,
  NonGroupTransaction,
  TransactionType,
} from '../../../types';
import SectionLabel from '../../SectionLabel/SectionLabel';

export default function MembersInfoBox({
  transactions,
  areShares,
  currency,
  participants,
  userMemberId,
  userId,
  expenseType,
}: MembersInfoBoxProps) {
  const getId = (t: GroupTransaction | NonGroupTransaction) => {
    if ('memberId' in t) {
      return t.memberId;
    }
    return t.userId;
  };

  const sortedTransactions = [...(transactions || [])].sort((a, b) => {
    if (expenseType === TransactionType.Group) {
      const aId = getId(a);
      const bId = getId(b);
      if (aId === userMemberId) return -1;
      if (bId === userMemberId) return 1;
      return 0;
    } else {
      const aId = getId(a);
      const bId = getId(b);
      if (aId === userId) return -1;
      if (bId === userId) return 1;
      return 0;
    }
  });

  const totalAmount = transactions?.reduce(
    (acc: any, { amount }: { amount: number }) => acc.add(amount),
    Currency(0)
  );

  if (sortedTransactions.length === 0) return null;

  const count = sortedTransactions.length;
  const noun =
    expenseType === TransactionType.Group
      ? count === 1
        ? 'member'
        : 'members'
      : count === 1
        ? 'user'
        : 'users';

  const title = !areShares
    ? 'Paid by'
    : count === 1
      ? 'Billed to'
      : count === 2
        ? 'Split between'
        : 'Split among';

  return (
    <StyledMembersInfoBox>
      <SectionLabel title={title} aside={`${count} ${noun}`} />

      <div className="memberLines">
        {sortedTransactions.map((t, i) => {
          const id = getId(t);
          const isYou = id === userMemberId || id === userId;
          const name = isYou
            ? 'You'
            : participants.find((x) => x.id === id)?.name;
          const share =
            totalAmount && totalAmount.value !== 0
              ? (t.amount / totalAmount.value) * 100
              : 0;
          const percentage =
            share % 1 === 0 ? share.toFixed(0) : share.toFixed(1);

          return (
            <div className={`memberLine${isYou ? ' you' : ''}`} key={i}>
              <span className="memberName">{name}</span>
              <span className="memberAmount">
                {displayCurrencyAndAmount(t.amount.toString(), currency)}
              </span>
              <span className="memberShare">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </StyledMembersInfoBox>
  );
}
