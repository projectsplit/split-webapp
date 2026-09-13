import IonIcon from '@reacticons/ionicons';
import { StyledMakeBudgetActiveMenu } from './MakeBudgetActiveMenu.styled';
import MyButton from '@/components/MyButton/MyButton';
import { Signal } from '@preact/signals-react';
import { FaQuestion } from 'react-icons/fa';

export default function MakeBudgetActiveMenu({
  menu,
  title,
  hasActiveBudgetData,
  hasInactiveBudgetData,
  onConfirm,
}: MakeBudgetActiveMenuProps) {
  return (
    <StyledMakeBudgetActiveMenu>
      <div className="dialogHeader">
        <FaQuestion className="dialogIcon" />
        <div className="dialogTitle">{title ? title : 'Warning'}</div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" />
        </div>
      </div>
      <div className="info">
        {hasActiveBudgetData && (
          <p>
            You already have an active budget. Do you want to make this budget
            your active budget instead?
          </p>
        )}
        {!hasActiveBudgetData && hasInactiveBudgetData && (
          <p>Do you want to make this budget your active budget?</p>
        )}
      </div>
      <div className="buttons">
        <MyButton
          onClick={() => {
            onConfirm(true);
            menu.value = null;
          }}
        >
          Active
        </MyButton>
        <MyButton
          variant="secondary"
          onClick={() => {
            onConfirm(false);
            menu.value = null;
          }}
        >
          Inactive
        </MyButton>
      </div>
    </StyledMakeBudgetActiveMenu>
  );
}

interface MakeBudgetActiveMenuProps {
  title: string;
  menu: Signal<string | null>;
  hasActiveBudgetData: boolean;
  hasInactiveBudgetData: boolean;
  onConfirm: (activate: boolean) => void;
}
