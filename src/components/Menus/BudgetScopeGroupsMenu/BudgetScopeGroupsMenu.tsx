import { useCallback, useEffect } from 'react';
import { StyledBudgetScopeGroupsMenu } from './BudgetScopeGroupsMenu.styled';
import { Signal } from '@preact/signals-react';
import { TiGroup } from 'react-icons/ti';
import { Group } from '@/types';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosArchive } from 'react-icons/io';

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

  return (
    <StyledBudgetScopeGroupsMenu $maxHeight="49vh">
      <div className="headerAndSearchbar">
        <input
          className="searchBar"
          placeholder="Search"
          onChange={handleInputChange}
          value={keyword}
        />
        {flattenedGroups?.length !== 0 && (
          <div
            className={`selectAll ${allGroupsSelected.value ? 'selected' : ''}`}
            onClick={() => {
              setKeyword('');
              allGroupsSelected.value = !allGroupsSelected.value;
              targetGroupIds.value = [];
            }}
          >
            {' '}
            <span className="text">All</span>
          </div>
        )}
      </div>{' '}
      {flattenedGroups?.length === 0 && (
        <div className="noResults">No groups found</div>
      )}
      <div className="groupSection">
        {flattenedGroups?.map((group, index) => (
          <div
            key={index}
            className={`groups ${targetGroupIds.value.includes(group.id) || allGroupsSelected.value ? 'selected' : ''}`}
            onClick={() => handleSuggestedGroupClick(group.id)}
          >
            <TiGroup className="groupIcon" />
            <div className="groupNameAndArchivedStatus">
              <span>{group.name} </span>
              {group.isArchived && (
                <div className="archivedText">
                  {' '}
                  <IoIosArchive className="archived" />
                </div>
              )}
            </div>
            {(targetGroupIds.value.includes(group.id) ||
              allGroupsSelected.value) && (
              <FaCheckCircle className="checkIcon" />
            )}
          </div>
        ))}{' '}
      </div>
    </StyledBudgetScopeGroupsMenu>
  );
};
