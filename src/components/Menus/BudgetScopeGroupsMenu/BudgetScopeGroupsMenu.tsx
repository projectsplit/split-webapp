import { useCallback, useEffect } from 'react';
import { StyledBudgetScopeGroupsMenu } from './BudgetScopeGroupsMenu.styled';
import { Signal } from '@preact/signals-react';
import { TiGroup } from 'react-icons/ti';
import { Group } from '@/types';
import { IoIosArchive } from 'react-icons/io';
import IonIcon from '@reacticons/ionicons';

interface BudgetScopeGroupsMenuProps {
  targetGroupIds: Signal<string[]>;
  setKeyword: (keyword: string) => void;
  keyword: string;
  flattenedGroups: Group[] | undefined;
  allGroupsSelected: Signal<boolean>;
  hasNextGroupsPage: boolean;
}

export const BudgetScopeGroupsMenu = ({
  targetGroupIds,
  setKeyword,
  keyword,
  flattenedGroups,
  allGroupsSelected,
  hasNextGroupsPage,
}: BudgetScopeGroupsMenuProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (keyword.length > 1) {
      allGroupsSelected.value = false;
    }
  }, [keyword]);

  const handleSuggestedGroupClick = useCallback(
    (groupId: string) => {
      targetGroupIds.value.includes(groupId)
        ? (targetGroupIds.value = targetGroupIds.value.filter(
            (id) => id !== groupId
          ))
        : (targetGroupIds.value = [...targetGroupIds.value, groupId]);

      flattenedGroups?.length === targetGroupIds.value.length &&
      !hasNextGroupsPage
        ? (allGroupsSelected.value = true)
        : (allGroupsSelected.value = false);
    },
    [targetGroupIds]
  );

  const isSelected = (groupId: string) =>
    targetGroupIds.value.includes(groupId) || allGroupsSelected.value;

  return (
    <StyledBudgetScopeGroupsMenu>
      <input
        className="searchBar"
        placeholder="Search groups"
        onChange={handleInputChange}
        value={keyword}
      />

      {flattenedGroups?.length === 0 ? (
        <div className="noResults">No groups found</div>
      ) : (
        <div className="groupList">
          <div
            className={`groupRow ${allGroupsSelected.value ? 'selected' : ''}`}
            onClick={() => {
              setKeyword('');
              allGroupsSelected.value = !allGroupsSelected.value;
              targetGroupIds.value = [];
            }}
          >
            <span className="groupIcon">
              <TiGroup />
            </span>
            <div className="groupName">All groups</div>
            {allGroupsSelected.value && (
              <IonIcon name="checkmark-outline" className="check" />
            )}
          </div>

          {flattenedGroups?.map((group) => (
            <div
              key={group.id}
              className={`groupRow ${isSelected(group.id) ? 'selected' : ''}`}
              onClick={() => handleSuggestedGroupClick(group.id)}
            >
              <span className="groupIcon">
                <TiGroup />
              </span>
              <div className="groupName">{group.name}</div>
              {group.isArchived && <IoIosArchive className="archived" />}
              {isSelected(group.id) && (
                <IonIcon name="checkmark-outline" className="check" />
              )}
            </div>
          ))}
        </div>
      )}
    </StyledBudgetScopeGroupsMenu>
  );
};
