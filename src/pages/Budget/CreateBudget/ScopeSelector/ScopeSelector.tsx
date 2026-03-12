import IonIcon from '@reacticons/ionicons';
import { StyledScopeSelector } from './ScopeSelector.styled';

export const ScopeSelector = ({ onClick }: ScoleSelectorProps) => {
  return (
    <StyledScopeSelector $inputError={false}>
      <div className="spendingCycleHeader">
        <div className="prompt">Budget scope</div>
        <IonIcon
          // onClick={() => (menu.value = "infoBox")}
          name="information-circle-outline"
          className="information"
        />
      </div>
      <button className="scopeSelector" onClick={onClick}>
        desaf
      </button>
    </StyledScopeSelector>
  );
};

interface ScoleSelectorProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
