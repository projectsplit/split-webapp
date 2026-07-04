import { EditorState } from 'lexical';
import { Signal } from '@preact/signals-react';
import { BeautifulMentionsItemData } from 'lexical-beautiful-mentions';
import { EnhancedPeopleWithProps, FetchedLabel } from '../../../types';
export declare const onChangeEditorContent: (editorState: EditorState, setEditorState: (value: React.SetStateAction<EditorState | null>) => void, showOptions: Signal<boolean>, setFilteredResults: React.Dispatch<React.SetStateAction<{
    [key: string]: BeautifulMentionsItemData;
    value: string;
}[]>>, enhancedPeopleWithProps: EnhancedPeopleWithProps, submitButtonIsActive: Signal<boolean>, removedFilter: Signal<boolean>, setEditorStateString: (value: React.SetStateAction<string | undefined>) => void, setIsEmpty: (value: React.SetStateAction<boolean>) => void, calendarIsOpen: Signal<boolean>, datePeriodClicked: Signal<string>, labels: FetchedLabel[], searchKeyword: Signal<string>) => void;
