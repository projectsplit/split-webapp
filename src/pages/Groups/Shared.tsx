import { generatePath, useNavigate, useOutletContext } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import { Signal, useSignal } from '@preact/signals-react';
import CreateGroupAnimation from '../../components/Animations/CreateGroupAnimation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMostRecentContext } from '../../api/auth/CommandHooks/useMostRecentContext';
import { StyledGroups } from './Shared.styled';
import ItemCard from '../../components/ListForms/ItemCard';
import Sentinel from '../../components/Sentinel';
import BalanceMeta from '../../components/BalanceMeta/BalanceMeta';
import BottomMainMenu from '../../components/Menus/BottomMainMenu/BottomMainMenu';
import ConfirmUnArchiveGroupAnimation from '../../components/Animations/ConfirmUnArchiveGroupAnimation';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import Spinner from '../../components/Spinner/Spinner';
import { StyledSharedContainer } from './SharedContainer.styled';
import GroupSearchBarAnimation from '../../components/Animations/GroupSearchBarAnimation';
import useDebounce from '@/hooks/useDebounce';
import NoGroupsFound from './NoGroupsFound/NoGroupsFound';
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl';
import { useGroupsList } from './hooks/useGroupList';
import routes from '@/routes';

type GroupRowProps = {
  group: any;
  isArchived: boolean;
  onOpen: (id: string, groupName: string) => void;
  onIconClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    groupId: string,
    isGroupArchived: boolean
  ) => void;
};

const GroupRow = memo(function GroupRow({
  group,
  isArchived,
  onOpen,
  onIconClick,
}: GroupRowProps) {
  return (
    <ItemCard onClick={() => onOpen(group.id, group.name)}>
      <div className="groupBody">
        <div className="groupName">{group.name}</div>
        <BalanceMeta details={group?.details} />
      </div>
      <div
        className={`groupAction ${isArchived ? 'archived' : ''}`}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onIconClick(e, group.id, isArchived)
        }
      >
        <IonIcon name={isArchived ? 'arrow-undo-outline' : 'qr-code'} />
      </div>
    </ItemCard>
  );
});

const GROUP_CATEGORY_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Archived', label: 'Archived' },
];

export default function Shared() {
  const menu = useSignal<string | null>(null);
  const currencyMenu = useSignal<string | null>(null);
  const groupIdClicked = useSignal<string>('');
  const showSearchBar = useSignal(false);
  const searchBarRef = useRef<any>(null);
  const generalRef = useRef<any>(null);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(
    keyword.length > 1 ? keyword : '',
    400
  );

  const {
    topMenuTitle,
    activeGroupCatAsState,
    openGroupOptionsMenu,
  } = useOutletContext<{
    topMenuTitle: Signal<string>;
    openGroupOptionsMenu: Signal<boolean>;
    activeGroupCatAsState: Signal<string>;
  }>();

  const navigate = useNavigate();
  const pageSize = 10;

  const {
    filteredGroups,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingGroups,
  } = useGroupsList(pageSize, debouncedKeyword, activeGroupCatAsState);

  useEffect(() => {
    if (!showSearchBar.value) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node) &&
        generalRef.current &&
        !generalRef.current.contains(e.target as Node)
      ) {
        showSearchBar.value = false;
        setKeyword('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchBar.value, showSearchBar]);

  useEffect(() => {
    topMenuTitle.value = 'Groups';
  }, [activeGroupCatAsState.value, topMenuTitle]);

  const updateMostRecentContextId = useMostRecentContext();
  const updateMostRecentContext = updateMostRecentContextId.mutate;

  const handleCategoryChange = useCallback(
    (next: string) => {
      setKeyword('');
      activeGroupCatAsState.value = next;
      showSearchBar.value = false;
    },
    [activeGroupCatAsState, showSearchBar]
  );

  const handleCreateGroupClick = useCallback(() => {
    menu.value = 'createGroup';
  }, [menu]);

  const handleGroupSearchClick = useCallback(() => {
    showSearchBar.value = true;
  }, [showSearchBar]);

  const onGroupClickHandler = useCallback(
    (id: string, groupName: string) => {
      navigate(generatePath(routes.GROUP_EXPENSES, { groupid: id }), {
        state: { groupName },
      });
      updateMostRecentContext(id);
    },
    [navigate, updateMostRecentContext]
  );

  const onIconClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      groupId: string,
      isGroupArchived: boolean
    ) => {
      if (!isGroupArchived) {
        e.stopPropagation();
        navigate(generatePath(routes.GENERATE_CODE, { groupid: groupId }));
      } else {
        e.stopPropagation();
        groupIdClicked.value = groupId;
        menu.value = 'unarchiveGroup';
      }
    },
    [navigate, groupIdClicked, menu]
  );

  return (
    <StyledSharedContainer>
      <div className="segmentedWrapper" ref={generalRef}>
        <SegmentedControl
          value={activeGroupCatAsState.value}
          onChange={handleCategoryChange}
          options={GROUP_CATEGORY_OPTIONS}
        />
      </div>
      <div className="groupsPane">
        <StyledGroups>
          <GroupSearchBarAnimation
            showSearchBar={showSearchBar}
            searchBarRef={searchBarRef}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          {isLoadingGroups ? (
            <Spinner />
          ) : (
            <div className="groups">
              <NoGroupsFound
                activeGroupCatAsState={activeGroupCatAsState}
                filteredGroups={filteredGroups}
                keyword={keyword}
              />
              {filteredGroups?.map((g: any) => (
                <div key={g.id}>
                  <GroupRow
                    group={g}
                    isArchived={activeGroupCatAsState.value === 'Archived'}
                    onOpen={onGroupClickHandler}
                    onIconClick={onIconClick}
                  />
                </div>
              ))}
              <Sentinel
                fetchPage={fetchNextPage}
                hasMore={hasNextPage}
                isFetchingPage={isFetchingNextPage}
              />
            </div>
          )}
        </StyledGroups>
      </div>
      <MenuAnimationBackground menu={menu} />
      <BottomMainMenu
        onClick={handleCreateGroupClick}
        onGroupSearchClick={handleGroupSearchClick}
        bottomBarRef={generalRef}
      />
      <CreateGroupAnimation menu={menu} currencyMenu={currencyMenu} />
      <ConfirmUnArchiveGroupAnimation
        menu={menu}
        groupId={groupIdClicked.value}
        openGroupOptionsMenu={openGroupOptionsMenu}
        navigateToGroups={true}
      />
    </StyledSharedContainer>
  );
}
