import { useCallback, useEffect, useRef, useState } from 'react';
import { StyledScopeSelectionMenu } from './ScopeSelectionMenu.styled';
import { Signal, useSignal } from '@preact/signals-react';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdGroupOff } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { BudgetScopeGroupsMenu } from '../BudgetScopeGroupsMenu/BudgetScopeGroupsMenu';
import { useSearchGroupsByName } from '@/api/auth/QueryHooks/useSearchGroupsByName';
import useDebounce from '@/hooks/useDebounce';
import { FaCheckCircle } from 'react-icons/fa';

export const ScopeSelectionMenu = ({
  menu,
  scopeState,
}: ScopeSelectionMenuProps) => {
  const [openGroups, setOpenGroups] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword] = useDebounce(
    keyword.length > 1 ? keyword : '',
    300
  );
  const targetGroupIds = useSignal<string[]>([]);
  const allGroupsSelected = useSignal<boolean>(true);

  const groupButtonRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const pageSize = 10;

  const {
    data: userGroups,
    fetchNextPage: fetchNextGroupsPage,
    hasNextPage: hasNextGroupsPage,
    isFetchingNextPage: isFetchingNextGroupsPage,
  } = useSearchGroupsByName(debouncedKeyword, pageSize);

  const flattenedGroups = userGroups?.pages.flatMap((x) => x.groups);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        scopeRef.current &&
        scopeRef.current.contains(event.target as Node) &&
        groupButtonRef.current &&
        !groupButtonRef.current.contains(event.target as Node)
      ) {
        setOpenGroups(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledScopeSelectionMenu>
      <div className="fixed-header-container">
        <div className="header">
          <div
            className="closeButtonContainer"
            onClick={() => (menu.value = null)}
          >
            <BiArrowBack className="closeButton" />
          </div>
          <div className="title">Select scope</div>
          <div className="gap"></div>
        </div>
      </div>
      <div className="scopeOptions" ref={scopeRef}>
        <div className="buttonWrapper">
          <div
            className="button"
            onClick={() => {
              scopeState.value = {
                ...scopeState.value,
                nonGroup: !scopeState.value.nonGroup,
              };
            }}
          >
            <MdGroupOff className="groupIcon non" />
            <div className="text-container">
              <span className="descr">Non</span>
              <span className="descr">Groups</span>
            </div>
          </div>
          {scopeState.value.nonGroup && <FaCheckCircle className="checkIcon" />}
        </div>

        <div className="wrapperAndPill">
          <div className="groupsButtonWrapper ">
            <div
              className="button"
              onClick={() => {
                scopeState.value = {
                  ...scopeState.value,
                  group: !scopeState.value.group,
                };
              }}
            >
              <TiGroup className="groupIcon active" />
              <div className="text-container">
                <span className="descr">All</span>
                <span className="descr">Groups</span>
              </div>
            </div>
            {scopeState.value.group && <FaCheckCircle className="checkIcon" />}
          </div>
          <div
            className={`pill ${openGroups ? 'open' : ''}`}
            ref={groupButtonRef}
            onClick={() => setOpenGroups(true)}
          >
            select groups
          </div>
        </div>

        <div className="buttonWrapper">
          <div
            className="button"
            onClick={() => {
              scopeState.value = {
                ...scopeState.value,
                personal: !scopeState.value.personal,
              };
            }}
          >
            <BsFillPersonFill className="groupIcon archived" />
            <div className="text-container">
              <span className="descr">Personal</span>
            </div>
          </div>
          {scopeState.value.personal && <FaCheckCircle className="checkIcon" />}
        </div>
      </div>
      {openGroups && (
        <BudgetScopeGroupsMenu
          targetGroupIds={targetGroupIds}
          setKeyword={setKeyword}
          keyword={keyword}
          flattenedGroups={flattenedGroups}
          allGroupsSelected={allGroupsSelected}
          hasNextGroupsPage={hasNextGroupsPage}
        />
      )}
    </StyledScopeSelectionMenu>
  );
};

interface ScopeSelectionMenuProps {
  menu: Signal<string | null>;
  scopeState: Signal<{ personal: boolean; group: boolean; nonGroup: boolean }>;
}
