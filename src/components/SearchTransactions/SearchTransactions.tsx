import { useRef, useState } from 'react';
import { StyledSearchTransactions } from './SearchTransactions.styled';
import { IoClose } from 'react-icons/io5';
import { EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useQueryClient } from '@tanstack/react-query';
import { EditorContent } from './EditorContent/EditorContent';
import { handleSubmitButton } from './helpers/handleSubmitButton';
import { handleClearAllClick } from './helpers/handleClearAllClick';
import { initialConfig } from './utils/lexicalThemeConfiguration';
import { EditorContentHandle, SearchTransactionsProps } from '../../interfaces';
import { FetchedLabel } from '../../types';
import MyButton from '../MyButton/MyButton';
import { CategorySelector } from '../CategorySelector/CategorySelector';
import {} from './helpers/localStorageStringParser';
import { usePeople } from './hooks/usePeople';
import { useSearchFilters } from './hooks/useSearchFilters';
import { useLabels } from '@/api/auth/QueryHooks/useGetLabels';

const SEARCH_CATEGORIES = {
  cat1: 'Expenses',
  cat2: 'Transfers',
};

export default function SearchTransactions({
  menu,
  group,
  userInfo,
  timeZoneId,
  expenseParsedFilters,
  transferParsedFilters,
  isPersonal,
}: SearchTransactionsProps) {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const queryClient = useQueryClient();

  const { fetchedPeople, enhancedPeopleWithProps, allUsers } = usePeople(
    group,
    userInfo,
    isPersonal
  );

  const { data: suggestedLabels } = useLabels(
    userInfo?.userId,
    isPersonal,
    group?.id
  );

  const {
    category,
    expenseFilterState,
    transferFilterState,
    filteredPeople,
    filteredLabels,
    submitButtonIsActive,
    cancelled,
    searchKeyword,
    path,
  } = useSearchFilters(group, allUsers, suggestedLabels, isPersonal);

  const editorContentRef = useRef<EditorContentHandle | null>(null);

  const fetchedLabels: FetchedLabel[] = group
    ? group?.labels.map((l) => ({
        id: l.id,
        value: l.text,
        color: l.color,
        prop: 'category',
      }))
    : suggestedLabels?.labels.map((l) => ({
        id: l.id,
        value: l.text,
        color: l.color,
        prop: 'category',
        isPersonal: isPersonal,
      })) || [];

  return (
    <StyledSearchTransactions>
      <>
        <div className="header">
          <div className="headerSpacer" />
          <div className="searchingIn">
            <div className="searchingInLabel">Searching in</div>
            <div className="groupName">
              {isPersonal
                ? 'Personal'
                : group?.name
                  ? group?.name
                  : 'Quick splits'}
            </div>
          </div>
          <div className="closeSign" onClick={() => (menu.value = null)}>
            <IoClose name="close-outline" className="close" />
          </div>
        </div>
        {!isPersonal && (
          <div className="catSelector">
            <CategorySelector
              variant="segmented"
              activeCat={path}
              categories={SEARCH_CATEGORIES}
              navLinkUse={true}
              activeCatAsState={category}
            />
          </div>
        )}
        <div className="searchBarAndCategories">
          <div className="lexicalSearch">
            <LexicalComposer initialConfig={initialConfig}>
              <EditorContent
                searchKeyword={searchKeyword}
                ref={editorContentRef}
                enhancedPeopleWithProps={enhancedPeopleWithProps}
                submitButtonIsActive={submitButtonIsActive}
                expenseFilterState={expenseFilterState}
                transferFilterState={transferFilterState}
                setEditorState={setEditorState}
                people={fetchedPeople}
                labels={fetchedLabels}
                cancelled={cancelled}
                filteredPeople={filteredPeople}
                timeZoneId={timeZoneId}
                filteredLabels={filteredLabels}
                category={category}
                isPersonal={isPersonal}
              />
            </LexicalComposer>
          </div>
        </div>
        <div className="submitButtons">
          <MyButton
            fontSize="15"
            onClick={() =>
              handleSubmitButton(
                editorState,
                expenseFilterState,
                transferFilterState,
                menu,
                category,
                queryClient,
                expenseParsedFilters,
                transferParsedFilters,
                isPersonal
              )
            }
            disabled={!submitButtonIsActive.value}
          >
            Apply
          </MyButton>
          <MyButton
            variant="secondary"
            fontSize="15"
            onClick={() =>
              handleClearAllClick(
                editorContentRef,
                expenseFilterState,
                transferFilterState,
                filteredPeople,
                filteredLabels,
                submitButtonIsActive,
                menu,
                queryClient,
                expenseParsedFilters,
                transferParsedFilters,
                isPersonal
              )
            }
          >
            Clear all
          </MyButton>
        </div>
      </>
    </StyledSearchTransactions>
  );
}
