import { useEffect, useRef, useState } from "react";
import {
  SpinnerContainer,
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
import Spinner from "../Spinner/Spinner";
import { EditorContentHandle, SearchTransactionsProps } from "../../interfaces";
import {
  CreateFiltersRequest,
  FetchedLabel,
  FilteredMembers,
} from "../../types";
import MyButton from "../MyButton/MyButton";
import { useSubmitFilters } from "../../api/services/useSubmitFilters";
import { useGetGroupFilters } from "../../api/services/useGetGroupFilters";
import { useMembers } from "./hooks/useMembers";


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
  const queryClient = useQueryClient();
  const filterState = useSignal<CreateFiltersRequest>({
    groupId: group.id,
    participantsIds: [],
    payersIds: [],
    receiversIds: [],
    sendersIds: [],
    description: "",
    before: [],
    during: [],
    after: [],
    labels: [],
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
    color:l.color
  }));

  //TODO Uncomment
  // const {
  //   isFetching,
  //   data: groupFiltersData,
  //   error,
  // } = useGetGroupFilters(params.groupid);

  // useEffect(() => {
  //   if (groupFiltersData) {
  //     initializeFilterState(
  //       groupFiltersData,
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
      filterState.value.groupId = params.groupid as string;
      if (contentEditableWrapRef.current) {
        setContentEditableHeight(contentEditableWrapRef.current.offsetHeight);
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

  const { mutate: submitFilters, isPending } =
    useSubmitFilters(submitFiltersError);

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
            <IoClose />
          </div>
        </div>
        <div className="searchBarAndCategories">
          <div className="lexicalSearch">
            <LexicalComposer initialConfig={initialConfig}>
              {false ? (//TODO isFetching
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
                  filterState={filterState}
                  setEditorState={setEditorState}
                  members={fetchedMembers}
                  labels = {fetchedLabels}
                  cancelled={cancelled}
                  filteredMembers={filteredMembers}
                  timeZoneId={timeZoneId}
                  filteredLabels={filteredLabels}
                  
                />
              )}
            </LexicalComposer>
          </div>
        </div>
        <div className="submitButtons">
          <MyButton
            fontSize="16"
            onClick={() =>
              handleSubmitButton(editorState, filterState, submitFilters, menu)
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
