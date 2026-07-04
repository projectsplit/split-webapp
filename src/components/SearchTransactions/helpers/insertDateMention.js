import { removeWordFromEditor } from './removeWordFromEditor';
export const insertDateMention = (day, datePeriodClicked, calendarIsOpen, showOptions, editor, insertMention, category) => {
    if (!day.isValid) {
        console.warn('Invalid date provided to insertDateMention');
        return;
    }
    const formattedDate = day.toFormat('dd-MM-yyyy');
    switch (datePeriodClicked.value) {
        case 'before':
            removeWordFromEditor(editor, 'before:');
            insertMention({
                trigger: 'before' + ':',
                value: formattedDate,
                data: {
                    category: category.value,
                },
            });
            break;
        case 'during':
            removeWordFromEditor(editor, 'during:');
            insertMention({
                trigger: 'during' + ':',
                value: formattedDate,
                data: {
                    category: category.value,
                },
            });
            break;
        case 'after':
            removeWordFromEditor(editor, 'after:');
            insertMention({
                trigger: 'after' + ':',
                value: formattedDate,
                data: {
                    category: category.value,
                },
            });
            break;
        default:
            console.warn('Unknown period:', datePeriodClicked.value);
            break;
    }
    calendarIsOpen.value = false;
    showOptions.value = true;
};
