import { useEffect, useState } from 'react';
import { StyledScopeSelectionMenu } from './ScopeSelectionMenu.styled';
import BackButton from '../../BackButton/BackButton';
import MyButton from '../../MyButton/MyButton';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import { Signal } from '@preact/signals-react';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { TiGroup } from 'react-icons/ti';
import { BudgetScopeGroupsMenu } from '../BudgetScopeGroupsMenu/BudgetScopeGroupsMenu';
import { useSearchGroupsByName } from '@/api/auth/QueryHooks/useSearchGroupsByName';
import useDebounce from '@/hooks/useDebounce';

export const ScopeSelectionMenu = ({
  menu,
  scopeState,
  targetGroupIds,
  allGroupsSelected,
}: ScopeSelectionMenuProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [groupsOpen, setGroupsOpen] = useState<boolean>(
    scopeState.value.group
  );
  const [debouncedKeyword] = useDebounce(
    keyword.length > 1 ? keyword : '',
    300
  );

  const pageSize = 10;

  const { data: userGroups, hasNextPage: hasNextGroupsPage } =
    useSearchGroupsByName(debouncedKeyword, pageSize);

  const flattenedGroups = userGroups?.pages.flatMap((x) => x.groups);

  useEffect(() => {
    if (targetGroupIds.value.length === 0) {
      scopeState.value = {
        ...scopeState.value,
        group: false,
        none: true,
      };
    }
    if (targetGroupIds.value.length > 0) {
      scopeState.value = {
        ...scopeState.value,
        group: true,
        none: false,
      };
    }
    if (allGroupsSelected.value) {
      scopeState.value = {
        ...scopeState.value,
        group: true,
        none: false,
      };
    }
  }, [targetGroupIds.value.length, allGroupsSelected.value, scopeState]);

  const toggleNonGroup = () => {
    const newNonGroup = !scopeState.value.nonGroup;
    scopeState.value = {
      ...scopeState.value,
      nonGroup: newNonGroup,
      none:
        !newNonGroup &&
        !scopeState.value.group &&
        !scopeState.value.personal,
    };
  };

  const toggleGroup = () => {
    const newGroup = !scopeState.value.group;
    setGroupsOpen(newGroup);
    scopeState.value = {
      ...scopeState.value,
      group: newGroup,
      none:
        !newGroup && !scopeState.value.personal && !scopeState.value.nonGroup,
    };
    if (!newGroup) {
      targetGroupIds.value = [];
      allGroupsSelected.value = false;
    } else if (targetGroupIds.value.length === 0) {
      allGroupsSelected.value = true;
    }
  };

  const togglePersonal = () => {
    const newPersonal = !scopeState.value.personal;
    scopeState.value = {
      ...scopeState.value,
      personal: newPersonal,
      none:
        !newPersonal &&
        !scopeState.value.group &&
        !scopeState.value.nonGroup,
    };
  };

  return (
    <StyledScopeSelectionMenu>
      <div className="fixedHeader">
        <div className="header">
          <BackButton onClick={() => (menu.value = null)} />
          <div className="title">Select scope</div>
          <div className="gap"></div>
        </div>
      </div>

      <div className="scrollable-content">
        <div className="hint">
          Pick which of your expenses this budget counts.
        </div>

        <div className="scopeCard">
          <div className="scopeRow">
            <span className="scopeIcon">
              <BsFillPersonFill />
            </span>
            <div className="scopeName">Personal</div>
            <ToggleSwitch
              isOn={scopeState.value.personal}
              onToggle={togglePersonal}
            />
          </div>

          <div className="scopeRow">
            <span className="scopeIcon">
              <BsPeopleFill />
            </span>
            <div className="scopeName">Quick splits</div>
            <ToggleSwitch
              isOn={scopeState.value.nonGroup}
              onToggle={toggleNonGroup}
            />
          </div>

          <div className="scopeRow">
            <span className="scopeIcon">
              <TiGroup />
            </span>
            <div className="scopeName">Groups</div>
            <ToggleSwitch
              isOn={scopeState.value.group}
              onToggle={toggleGroup}
            />
          </div>
        </div>

        {(groupsOpen || scopeState.value.group) && (
          <BudgetScopeGroupsMenu
            targetGroupIds={targetGroupIds}
            setKeyword={setKeyword}
            keyword={keyword}
            flattenedGroups={flattenedGroups}
            allGroupsSelected={allGroupsSelected}
            hasNextGroupsPage={hasNextGroupsPage}
          />
        )}
      </div>

      <div className="doneButton">
        <MyButton onClick={() => (menu.value = null)}>Done</MyButton>
      </div>
    </StyledScopeSelectionMenu>
  );
};

interface ScopeSelectionMenuProps {
  menu: Signal<string | null>;
  scopeState: Signal<{
    none: boolean;
    personal: boolean;
    group: boolean;
    nonGroup: boolean;
  }>;
  targetGroupIds: Signal<string[]>;
  allGroupsSelected: Signal<boolean>;
}
