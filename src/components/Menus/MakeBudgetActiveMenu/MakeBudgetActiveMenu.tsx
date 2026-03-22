import IonIcon from '@reacticons/ionicons';
import { StyledMakeBudgetActiveMenu } from './MakeBudgetActiveMenu.styled';
import MyButton from '@/components/MyButton/MyButton';
import Separator from '@/components/Separator/Separator';
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
      <div className="headerSeparator">
        <div className="header">
          <FaQuestion name="warning-outline" className="infoLogo" />
          <span>{title ? title : 'Warning'}</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
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
          <p> Do you want to make this budget your active budget?</p>
        )}
      </div>
      <div className="buttons">
        <div className="confirmButton">
          <MyButton
            onClick={() => {
              onConfirm(true);
              menu.value = null;
            }}
            fontSize="16"
          >
            Active
          </MyButton>
        </div>
        <div className="confirmButton">
          <MyButton
            onClick={() => {
              onConfirm(false);
              menu.value = null;
            }}
            fontSize="16"
          >
            Inactive
          </MyButton>
        </div>
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
