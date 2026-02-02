import { useEffect, useMemo, useRef, useState } from "react";
import {
  StyledSearchTransactions,
} from "./SearchTransactions.styled";
import { IoClose } from "react-icons/io5";
import { EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { EditorContent } from "./EditorContent/EditorContent";
import { handleSubmitButton } from "./helpers/handleSubmitButton";
import { handleCancelClick } from "./helpers/handleCancelClick";
import { initializeFilterState } from "./helpers/initializeFilterState";
import { initialConfig } from "./utils/lexicalThemeConfiguration";
import { EditorContentHandle, SearchTransactionsProps } from "../../interfaces";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  FetchedLabel,
  FilteredPeople,
} from "../../types";
import MyButton from "../MyButton/MyButton";

import { CategorySelector } from "../CategorySelector/CategorySelector";
import { localStorageStringParser } from "./helpers/localStorageStringParser";
import { useSearchFriendsToInvite } from "@/api/services/useSearchFriendsToInvite";
import useDebounce from "@/hooks/useDebounce";
import { usePeople } from "./hooks/usePeople";

export default function SearchTransactions({
  menu,
  group,
  userInfo,
  timeZoneId,
  expenseParsedFilters,
  transferParsedFilters,
  // nonGroupUsers
}: SearchTransactionsProps) {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [contentEditableHeight, setContentEditableHeight] = useState<number>(0);
  // const submitFiltersError = useSignal<string>("");
  const contentEditableWrapRef = useRef<HTMLDivElement>(null);
  const submitButtonIsActive = useSignal<boolean>(false);
  const cancelled = useSignal<boolean>(false);
  const path = location.pathname.split("/").pop() || "";
  const category = useSignal<string>("expenses");
  const queryClient = useQueryClient();
  const searchKeyword = useSignal<string>("");
  const [debouncedKeyword, isDebouncing] = useDebounce(
    searchKeyword.value.length > 1 ? searchKeyword.value : "",
    300
  );
  const pageSize =10;

  const expenseFilterState = useSignal<CreateExpenseFilterRequest>({
    groupId: group?.id || "",
    participantsIds: [],
    payersIds: [],
    freeText: "",
    before: [],
    during: [],
    after: [],
    labels: [],
  });

  const transferFilterState = useSignal<CreateTransferFilterRequest>({
    groupId: group?.id || "",
    receiversIds: [],
    sendersIds: [],
    freeText: "",
    before: [],
    during: [],
    after: [],
  });

  const filteredPeople = useSignal<FilteredPeople>({
    payers: [],
    participants: [],
    senders: [],
    receivers: [],
  });

  const filteredLabels = useSignal<FetchedLabel[]>([]);

  const editorContentRef = useRef<EditorContentHandle | null>(null);
  const params = useParams();

  const users = useSearchFriendsToInvite(//TODO need an endpoint that only fetches non group expense users that are in non group expenses same as user.
    "f7637b50-e77d-4609-9e38-eb0acc9c9c51",
    debouncedKeyword,
    pageSize
  );
  const allUsers = useMemo(() => {
    return users.data?.pages.flatMap((page) => page.users) || [];
  }, [users.data]);

  const { fetchedPeople, enhancedPeopleWithProps } = usePeople(
    group,
    userInfo,
    allUsers
  );

  const fetchedLabels: FetchedLabel[] = group?.labels.map((l) => ({
    id: l.id,
    value: l.text,
    color: l.color,
    prop: "category",
  })) || [];

  useEffect(() => {
    if (path === "debts") {
      category.value = "expenses";
    } else {
      category.value = path;
    }
  }, [path]);

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


  const { expenseFilter, transferFilter } = useMemo(() => {
    return localStorageStringParser(
      localStorage.getItem("expenseFilter"),
      localStorage.getItem("transferFilter")
    );
  }, [localStorage.getItem("expenseFilter"), localStorage.getItem("transferFilter")]);

  useEffect(() => {
    initializeFilterState(
      expenseFilter,
      transferFilter,
      params,
      expenseFilterState,
      transferFilterState,
      filteredPeople,
      filteredLabels,
      group,
      allUsers
    );
  }, [expenseFilter, transferFilter, params.groupid, cancelled.value, allUsers]);

  useEffect(() => {
    const handleResize = () => {
      if ((category.value = "expenses")) {
        expenseFilterState.value.groupId = params.groupid as string || "";
        if (contentEditableWrapRef.current) {
          setContentEditableHeight(contentEditableWrapRef.current.offsetHeight);
        }
      } else {
        transferFilterState.value.groupId = params.groupid as string || "";
        if (contentEditableWrapRef.current) {
          setContentEditableHeight(contentEditableWrapRef.current.offsetHeight);
        }
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (contentEditableWrapRef.current) {
      resizeObserver.observe(contentEditableWrapRef.current);
    }

    return () => {
      if (contentEditableWrapRef.current) {
        resizeObserver.unobserve(contentEditableWrapRef.current);
      }
    };
  }, []);

  return (
    <StyledSearchTransactions>
      <>
        <div className="header">
          <div className="gap"></div>
          <div className="searchingIn">
            Searching In:&nbsp;
            <span className="groupName">{group?.name || "Non Group"}</span>
          </div>
          <div className="closeSign" onClick={() => (menu.value = null)}>
            <IoClose name="close-outline" className="close" />
          </div>
        </div>
        <div className="catSelector">
          <CategorySelector
            activeCat={path}
            categories={{
              cat1: "Expenses",
              cat2: "Transfers",
            }}
            navLinkUse={true}
            activeCatAsState={category}
          />
        </div>
        <div className="searchBarAndCategories">
          <div className="lexicalSearch">
            <LexicalComposer initialConfig={initialConfig}>
              <EditorContent
                searchKeyword={searchKeyword}
                ref={editorContentRef}
                contentEditableHeight={contentEditableHeight}
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
                fetchNextPage={() => users.fetchNextPage()}
                hasNextPage={users.hasNextPage}
                isFetchingNextPage={users.isFetchingNextPage}
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
                transferParsedFilters
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


