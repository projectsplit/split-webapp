import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import { StyledScopeInfo } from './ScopeInfo.styled';


export default function ScopeInfo({ menu }: {  menu: Signal<React.SetStateAction<string | null>>; }) {

  return (
    <StyledScopeInfo>
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
        Choose which expense types this budget should apply to.
Default setting: All expenses (including group, non-group, and personal).
        </span>
        <span className="secondP">
        </span>
      </div>
    </StyledScopeInfo>
  );
}
