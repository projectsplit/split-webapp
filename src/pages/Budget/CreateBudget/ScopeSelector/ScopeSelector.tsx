import IonIcon from '@reacticons/ionicons';
import { StyledScopeSelector } from './ScopeSelector.styled';
import { Signal, useSignal } from '@preact/signals-react';
import { useMemo } from 'react';
import { scopeBuilder } from '../helpers/scopeBuilder';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import InfoBoxAnimation from '@/components/Animations/InfoBoxAnimation';
import ScopeInfo from './ScopeInfo/ScopeInfo';

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

  const menu = useSignal<string | null>(null);

  return (
    <StyledScopeSelector $inputError={$inputError}>
      <div className="spendingCycleHeader">
        <div className="prompt">Scope</div>
        <IonIcon
          onClick={() => (menu.value = 'infoBox')}
          name="information-circle-outline"
          className="information"
        />
      </div>
      <button className="scopeSelector" onClick={onClick}>
        {scopeDetails.text}
      </button>
      <MenuAnimationBackground menu={menu} />
      <InfoBoxAnimation menu={menu}>
        <ScopeInfo menu={menu} />
      </InfoBoxAnimation>
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
