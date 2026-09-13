import { memo } from 'react';
import { IoClose } from 'react-icons/io5';
import { StyledFormHeader } from '@/components/FormHeader/FormHeader.styled';
import { Signal } from '@preact/signals-react';
import { Group, Guest, Member, User } from '@/types';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';

interface ExpenseFormHeaderProps {
  header: string;
  isnonGroupExpense?: Signal<boolean>;
  fromHome?: boolean;
  nonGroupUsers: Signal<User[]>;
  groupMembers: Signal<(Member | Guest)[]>;
  isPersonal: Signal<boolean>;
  fromHomeGroup?: Signal<Group | null>;
  menu: Signal<string | null>;
}

const ExpenseFormHeaderPreMemo = ({
  header,
  isnonGroupExpense,
  fromHome,
  nonGroupUsers,
  groupMembers,
  isPersonal,
  fromHomeGroup,
  menu,
}: ExpenseFormHeaderProps) => {
  const close = () => {
    if (isnonGroupExpense && isnonGroupExpense?.value) {
      if (fromHome) {
        nonGroupUsers.value = [];
        groupMembers.value = [];
        isPersonal.value = true;
        isnonGroupExpense.value = false;
        if (fromHomeGroup) {
          fromHomeGroup.value = null;
        }
      }
    }
    menu.value = null;
  };

  useCloseOnBack(!!fromHome, close);

  return (
    <StyledFormHeader>
      <div className="gap"></div>
      <div className="title">{header}</div>
      <div
        className="closeButtonContainer"
        onClick={close}
      >
        <IoClose className="closeButton" />
      </div>
    </StyledFormHeader>
  );
};

export const ExpenseFormHeader = memo(ExpenseFormHeaderPreMemo);
