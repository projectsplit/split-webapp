import { useBeautifulMentions } from 'lexical-beautiful-mentions';
import { Signal } from '@preact/signals-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DateTime } from 'luxon';
export declare const insertDateMention: (day: DateTime, datePeriodClicked: Signal<string>, calendarIsOpen: Signal<boolean>, showOptions: Signal<boolean>, editor: ReturnType<typeof useLexicalComposerContext>[0], insertMention: ReturnType<typeof useBeautifulMentions>["insertMention"], category: Signal<string>) => void;
