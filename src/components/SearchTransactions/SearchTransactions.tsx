import { useEffect, useRef, useState } from "react";
import {
  SpinnerContainer,
  StyledSearchTransactions,
} from "./SearchTransactions.styled";
import { IoClose } from "react-icons/io5";
import { $getRoot, EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { EditorContent } from "./EditorContent/EditorContent";
import { handleSubmitButton } from "./helpers/handleSubmitButton";
import { handleCancelClick } from "./helpers/handleCancelClick";
import { initializeFilterState } from "./helpers/initializeFilterState";
import { initialConfig } from "./utils/lexicalThemeConfiguration";
import Spinner from "../Spinner/Spinner";
import { EditorContentHandle, SearchTransactionsProps } from "../../interfaces";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  FetchedLabel,
  FilteredMembers,
} from "../../types";
import MyButton from "../MyButton/MyButton";
import { useSubmitExpenseFilters } from "../../api/services/useSubmitExpenseFilters";
import { useGetGroupFilters } from "../../api/services/useGetGroupFilters";
import { useMembers } from "./hooks/useMembers";
import { useSubmitTransferFilters } from "../../api/services/useSubmitTransferFilters";
import { CategorySelector } from "../CategorySelector/CategorySelector";

export default function SearchTransactions({
  menu,
  group,
  userInfo,
  timeZoneId,
}: SearchTransactionsProps) {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [contentEditableHeight, setContentEditableHeight] = useState<number>(0);
  const submitFiltersError = useSignal<string>("");
  const contentEditableWrapRef = useRef<HTMLDivElement>(null);
  const submitButtonIsActive = useSignal<boolean>(false);
  const cancelled = useSignal<boolean>(false);
  const path = location.pathname.split("/").pop() || "";
  const category = useSignal<string>("expenses");
  const queryClient = useQueryClient();

  const expenseFilterState = useSignal<CreateExpenseFilterRequest>({
    groupId: group.id,
    participantsIds: [],
    payersIds: [],
    freeText: "",
    before: [],
    during: [],
    after: [],
    labels: [],
  });

  const transferFilterState = useSignal<CreateTransferFilterRequest>({
    groupId: group.id,
    receiversIds: [],
    sendersIds: [],
    freeText: "",
    before: [],
    during: [],
    after: [],
  });

  const filteredMembers = useSignal<FilteredMembers>({
    payers: [],
    participants: [],
    senders: [],
    receivers: [],
  });
  const filteredLabels = useSignal<FetchedLabel[]>([]);

  const editorContentRef = useRef<EditorContentHandle | null>(null);
  const params = useParams();

  const { fetchedMembers, enhancedMembersWithProps } = useMembers(
    group,
    userInfo
  );
  const fetchedLabels: FetchedLabel[] = group.labels.map((l) => ({
    id: l.id,
    value: l.text,
    color: l.color,
    prop: "category",
  }));

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

  //TODO Uncomment
  // const {
  //   isFetching,
  //   data: groupFiltersData,
  //   error,
  // } = useGetGroupFilters(params.groupid);

  // useEffect(() => {
  //   if (groupFiltersData) {
  //     initializeFilterState(
  //       groupExpenseFiltersData, this used to be groupFiltersData from useGroupFilters. You will now have two endpoints or maybe use local storage if they won't be stored at DB from now on.
  //       groupTransferFiltersData,
  //       params,
  //       filterState,
  //       filteredMembers,
  //       filteredLabels
  //     );
  //   }
  // }, [groupFiltersData, params.groupid, cancelled.value]);

  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: ["filters"],
      exact: false,
    }); //TODO: Might not need it - can be deleted

    const handleResize = () => {
      if ((category.value = "expenses")) {
        expenseFilterState.value.groupId = params.groupid as string;
        if (contentEditableWrapRef.current) {
          setContentEditableHeight(contentEditableWrapRef.current.offsetHeight);
        }
      } else {
        transferFilterState.value.groupId = params.groupid as string;
        if (contentEditableWrapRef.current) {
          setContentEditableHeight(contentEditableWrapRef.current.offsetHeight);
        }
      }
    };

    //handleResize();

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

  const { mutate: submitExpenseFilters, isPending: isPendingExpense } =
    useSubmitExpenseFilters(submitFiltersError);

  const { mutate: submitTransferFilters, isPending: isPendingTransfer } =
    useSubmitTransferFilters(submitFiltersError);

  return (
    <StyledSearchTransactions>
      <>
        <div className="header">
          <div className="gap"></div>
          <div className="searchingIn">
            Searching In:&nbsp;
            <span className="groupName">{group.name}</span>
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
              {false ? ( //TODO isFetching
                <SpinnerContainer>
                  <Spinner />
                </SpinnerContainer>
              ) : (
                <EditorContent
                  ref={editorContentRef}
                  contentEditableHeight={contentEditableHeight}
                  enhancedMembersWithProps={enhancedMembersWithProps}
                  submitButtonIsActive={submitButtonIsActive}
                  isFetching={false} //TODO isFetching
                  expenseFilterState={expenseFilterState}
                  transferFilterState={transferFilterState}
                  setEditorState={setEditorState}
                  members={fetchedMembers}
                  labels={fetchedLabels}
                  cancelled={cancelled}
                  filteredMembers={filteredMembers}
                  timeZoneId={timeZoneId}
                  filteredLabels={filteredLabels}
                  category={category}
                />
              )}
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
                submitExpenseFilters,
                submitTransferFilters,
                menu,
                category
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
