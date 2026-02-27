import { useEffect, useRef, useState } from "react";
import {
  StyledSearchTransactions,
} from "./SearchTransactions.styled";
import { IoClose } from "react-icons/io5";
import { EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useQueryClient } from "@tanstack/react-query";
import { EditorContent } from "./EditorContent/EditorContent";
import { handleSubmitButton } from "./helpers/handleSubmitButton";
import { handleCancelClick } from "./helpers/handleCancelClick";
import { initialConfig } from "./utils/lexicalThemeConfiguration";
import { EditorContentHandle, SearchTransactionsProps } from "../../interfaces";
import {
  FetchedLabel,
  Mode,
} from "../../types";
import MyButton from "../MyButton/MyButton";
import { CategorySelector } from "../CategorySelector/CategorySelector";
import {
} from "./helpers/localStorageStringParser";
import { usePeople } from "./hooks/usePeople";
import { useSearchFilters } from "./hooks/useSearchFilters";

export default function SearchTransactions({
  menu,
  group,
  userInfo,
  timeZoneId,
  expenseParsedFilters,
  transferParsedFilters,
  isPersonal
  // nonGroupUsers
}: SearchTransactionsProps) {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const queryClient = useQueryClient();

  const { fetchedPeople, enhancedPeopleWithProps, allUsers } = usePeople(
    group,
    userInfo,
    isPersonal
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
  } = useSearchFilters(group, allUsers, isPersonal);

  const editorContentRef = useRef<EditorContentHandle | null>(null);

  useEffect(() => {
    const handleBackNavigation = () => {
      if (menu.value) {
        menu.value = null;
      }
    };
    window.addEventListener("popstate", handleBackNavigation);
    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [menu]);

  const fetchedLabels: FetchedLabel[] = group?.labels.map((l) => ({
    id: l.id,
    value: l.text,
    color: l.color,
    prop: "category",
  })) || [];

  return (
    <StyledSearchTransactions>
      <>
        <div className="header">
          <div className="gap"></div>
          <div className="searchingIn">
            Searching In:&nbsp;
            <span className="groupName">{isPersonal ? "Personal" : group?.name ? group?.name : "Non Group"}</span>
          </div>
          <div className="closeSign" onClick={() => (menu.value = null)}>
            <IoClose name="close-outline" className="close" />
          </div>
        </div>
        {!isPersonal && <div className="catSelector">
          <CategorySelector
            activeCat={path}
            categories={{
              cat1: "Expenses",
              cat2: "Transfers",
            }}
            navLinkUse={true}
            activeCatAsState={category}
          />
        </div>}
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
            fontSize="16"
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
            variant={submitButtonIsActive.value ? "primary" : "secondary"}
          >
            Apply
          </MyButton>
          {submitButtonIsActive.value ? (
            <MyButton
              onClick={() => handleCancelClick(editorContentRef)}
              fontSize="16"
            >
              Cancel
            </MyButton>
          ) : null}
        </div>
      </>
    </StyledSearchTransactions>
  );
}


