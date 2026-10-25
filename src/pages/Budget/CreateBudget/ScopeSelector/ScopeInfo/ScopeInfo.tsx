import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import { StyledInfoDialog } from '../../../InfoDialog.styled';

export default function ScopeInfo({
  menu,
  text = 'Choose which expense types this budget should apply to. Default setting: All expenses (including groups, quick splits, and personal).',
}: {
  menu: Signal<React.SetStateAction<string | null>>;
  text?: string;
}) {
  return (
    <StyledInfoDialog>
      <div className="header">
        <div className="info">
          <IonIcon name="information-circle-outline" className="infoLogo" />
          <strong>Scope</strong>
        </div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" className="close" />
        </div>
      </div>
      <div className="text">
        <span className="firstP">{text}</span>
      </div>
    </StyledInfoDialog>
  );
}
