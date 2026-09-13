import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import { StyledInfoDialog } from '../../../InfoDialog.styled';

export default function ScopeInfo({
  menu,
}: {
  menu: Signal<React.SetStateAction<string | null>>;
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
        <span className="firstP">
          Choose which expense types this budget should apply to. Default
          setting: All expenses (including groups, quick splits, and personal).
        </span>
      </div>
    </StyledInfoDialog>
  );
}
