import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import {
  BeautifulMentionsPlugin,
  BeautifulMentionsItemData,
  BeautifulMentionsItem,
} from "lexical-beautiful-mentions";
import { Menu } from "../Menu/Menu";
import MentionsToolbar from "../Toolbars/MentionsToolbar";
import OptionsToolBar from "../Toolbars/OptionsToolbar/OptionsToolBar";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { useSignal } from "@preact/signals-react";
import { MenuItem } from "../MenuItem/MenuItem";
import { updateMembersMentions } from "../helpers/updateMembersMentions";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { onChangeEditorContent } from "../helpers/onChangeEditorContent";
import FilterCalendar from "../FilterCalendar/FilterCalendar";
import { PreventEnterCommandPlugin } from "../../../lexicalPlugins/PreventEnterCommandPlugin";
import { OnChangePlugin } from "../../../lexicalPlugins/OnChangePlugin";
import { ClearEditorPlugin } from "../../../lexicalPlugins/LexicalClearEditorPlugin";
import { EditorContentHandle, LexicalEditorProps } from "../../../interfaces";
import { updateFiltersMentions } from "../helpers/updateFiltersMentions";

export const EditorContent = forwardRef<
  EditorContentHandle,
  LexicalEditorProps
>((props, ref) => {
  const {
    contentEditableHeight,
    enhancedPeopleWithProps,
    submitButtonIsActive,
    expenseFilterState,
    transferFilterState,
    setEditorState,
    people,
    cancelled,
    filteredPeople,
    timeZoneId,
    labels,
    filteredLabels,
    category
  } = props;


  const [editor] = useLexicalComposerContext();
  const [isEmpty, setIsEmpty] = useState(true);
  const [filteredResults, setFilteredResults] = useState<
    { value: string; [key: string]: BeautifulMentionsItemData }[]
  >([]);

  const [editorStateString, setEditorStateString] = useState<string>();
  const contentEditableWrapRef = useRef<HTMLDivElement>(null);
  const showOptions = useSignal<boolean>(true);
  const calendarIsOpen = useSignal<boolean>(false);
  const removedFilter = useSignal<boolean>(false);
  const datePeriodClicked = useSignal<string>("");
  const showFreeTextPill = useSignal<boolean>(true)


  const mentionItems: Record<string, BeautifulMentionsItem[]> = {};

  mentionItems["payer:"] = [];
  mentionItems["participant:"] = [];
  mentionItems["sender:"] = [];
  mentionItems["receiver:"] = [];
  // mentionItems["before:"] = [];
  // mentionItems["during:"] = [];
  // mentionItems["after:"] = [];
  mentionItems["category:"] = [];

  updateMembersMentions(people, mentionItems);
  updateFiltersMentions(labels, mentionItems);

  const clearEditor = () => {
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    setIsEmpty(true);
    submitButtonIsActive.value = false;
    cancelled.value = true;
    showOptions.value = true;
  };

  useImperativeHandle(ref, () => ({
    clearEditor,
  }));

  return (
    <>
      <ClearEditorPlugin />
      <RichTextPlugin
        contentEditable={
          <div ref={contentEditableWrapRef} className="contentEditableWrap">
            <ContentEditable className="contentEditable" />
          </div>
        }
        placeholder={
          isEmpty ? (
            <div className="contentEditablePlaceholder">Search</div>
          ) : null
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState) =>
          onChangeEditorContent(
            editorState,
            setEditorState,
            showOptions,
            setFilteredResults,
            enhancedPeopleWithProps,
            submitButtonIsActive,
            removedFilter,
            setEditorStateString,
            setIsEmpty,
            calendarIsOpen,
            datePeriodClicked,
            labels
          )
        }
      />
      <BeautifulMentionsPlugin
        items={mentionItems}
        menuComponent={(props) => (
          <Menu {...props} contentEditableHeight={contentEditableHeight} />
        )}
        menuItemComponent={MenuItem}
        onMenuItemSelect={() => {
          showOptions.value = true;
        }}
        insertOnBlur={false}
        menuItemLimit={false}
        onMenuOpen={() => (showOptions.value = false)}
      />
      {calendarIsOpen.value ? (
        <FilterCalendar
          calendarIsOpen={calendarIsOpen}
          showOptions={showOptions}
          datePeriodClicked={datePeriodClicked}
          timeZoneId={timeZoneId}
          category={category}
        />
      ) : filteredResults.length === 0 || editorStateString === "" ? (
        <MentionsToolbar
          showOptions={showOptions}
          filteredPeople={filteredPeople}
          submitButtonIsActive={submitButtonIsActive}
          expenseFilterState={expenseFilterState}
          transferFilterState = {transferFilterState}
          cancelled={cancelled}
          removedFilter={removedFilter}
          calendarIsOpen={calendarIsOpen}
          datePeriodClicked={datePeriodClicked}
          filteredLabels={filteredLabels}
          category={category}
          showFreeTextPill={showFreeTextPill}
        />
      ) : (
        <OptionsToolBar
          editorStateString={editorStateString}
          filteredResults={filteredResults}
          setFilteredResults={setFilteredResults}
          submitButtonIsActive={submitButtonIsActive}
        />
      )}
      <AutoFocusPlugin />
      <PreventEnterCommandPlugin />
    </>
  );
});
