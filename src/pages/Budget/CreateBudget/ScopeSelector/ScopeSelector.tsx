import IonIcon from '@reacticons/ionicons';
import { StyledScopeSelector } from './ScopeSelector.styled';
import { Signal } from '@preact/signals-react';
import { useMemo } from 'react';
import { scopeBuilder } from '../helpers/scopeBuilder';

export const ScopeSelector = ({
  onClick,
  scopeState,
  targetGroupIds,
  allGroupsSelected,
  $inputError,
}: ScoleSelectorProps) => {
  const scopeDetails = useMemo(() => {
    return scopeBuilder(scopeState, allGroupsSelected, targetGroupIds);
  }, [scopeState.value, allGroupsSelected.value, targetGroupIds.value]);

  return (
    <StyledScopeSelector $inputError={$inputError}>
      <div className="spendingCycleHeader">
        <div className="prompt">Scope</div>
        <IonIcon
          // onClick={() => (menu.value = "infoBox")}
          name="information-circle-outline"
          className="information"
        />
      </div>
      <button className="scopeSelector" onClick={onClick}>
        {scopeDetails.text}
      </button>
    </StyledScopeSelector>
  );
};

interface ScoleSelectorProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  scopeState: Signal<{ personal: boolean; group: boolean; nonGroup: boolean }>;
  targetGroupIds: Signal<string[]>;
  allGroupsSelected: Signal<boolean>;
  $inputError: boolean;
}
