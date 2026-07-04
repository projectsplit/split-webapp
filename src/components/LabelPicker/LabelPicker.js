import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import AutoWidthInput from '../AutoWidthInput';
import { IoClose } from 'react-icons/io5';
import { StyledLabelPicker } from './LabelPicker.styled';
import { useGetGroupLabels } from '../../api/auth/QueryHooks/useGetGroupLabels';
import labelColors from '../../labelColors';
import { AiFillDelete } from 'react-icons/ai';
import { useLabels } from '@/api/auth/QueryHooks/useGetLabels';
import { useDeleteLabel } from '@/api/auth/CommandHooks/useDeleteLabel';
import { Spinner } from '../MyButton/MyButton';
const LabelPicker = ({ labels, setLabels, groupId, errorMessage, userId, isPersonal, menu, }) => {
    const [text, setText] = useState('');
    const [$deleteClicked, setDeleteClicked] = useState(false);
    const [deletingLabelId, setDeletingLabelId] = useState(null);
    const { mutate: removeLabelMutation, isPending } = useDeleteLabel(isPersonal, errorMessage, menu);
    const { data: suggestedLabelsResponse, isPending: isGroupLabelsPending } = useGetGroupLabels(groupId);
    const { data: suggestedUserLabelsResponse, isPending: isUserLabelsPending } = useLabels(userId, false, groupId);
    const groupLabels = suggestedLabelsResponse?.labels ?? [];
    const userLabels = suggestedUserLabelsResponse?.labels ?? [];
    const usedGroupColors = groupLabels?.map((x) => x.color)?.concat(labels?.map((x) => x.color)) ?? [];
    const usedUserColors = userLabels?.map((x) => x.color)?.concat(labels?.map((x) => x.color)) ?? [];
    const availableGroupColors = Object.keys(labelColors).filter((x) => !usedGroupColors.includes(x));
    const availableUserColors = Object.keys(labelColors).filter((x) => !usedUserColors.includes(x));
    const addLabel = (labelText) => {
        if (labels.map((x) => x.text).includes(labelText)) {
            setText('');
            return;
        }
        const existingGroupLabel = groupLabels.find((x) => x.text == labelText);
        const existingUserLabel = userLabels.find((x) => x.text == labelText);
        const newExpenseLabel = !!groupId
            ? !!existingGroupLabel
                ? {
                    id: existingGroupLabel.id,
                    color: existingGroupLabel.color,
                    text: existingGroupLabel.text,
                }
                : { id: labelText, color: availableGroupColors[0], text: labelText }
            : !!existingUserLabel
                ? {
                    id: existingUserLabel.id,
                    color: existingUserLabel.color,
                    text: existingUserLabel.text,
                }
                : { id: labelText, color: availableUserColors[0], text: labelText };
        setLabels([...labels, newExpenseLabel]);
        setText('');
    };
    const dropdownRef = useRef(null);
    const mainRef = useRef(null);
    const inputRef = useRef(null);
    const handleFocus = () => {
        setDeleteClicked(false);
        inputRef.current?.focus();
    };
    const handleBlur = () => {
        if (text.length > 0) {
            addLabel(text);
        }
    };
    const handleSelectedLabelClick = (labelId) => {
        setLabels(labels.filter((x) => x.id !== labelId));
    };
    const handleSuggestedLabelClick = (label) => {
        addLabel(label.text);
        inputRef.current?.focus();
    };
    const removeLabel = (e, labelId) => {
        e.stopPropagation();
        setDeletingLabelId(labelId);
        removeLabelMutation({ groupId, labelId });
        setDeleteClicked(true);
    };
    const handleInpuTextChange = (e) => {
        const newText = e.currentTarget.value;
        const trimmedText = newText.trim();
        if (trimmedText.length === 0) {
            setText('');
            return;
        }
        if (newText.slice(-1) === ' ') {
            addLabel(trimmedText);
            return;
        }
        setText(trimmedText);
    };
    const isLabelsLoading = !!groupId ? isGroupLabelsPending : isUserLabelsPending;
    const remainingSuggestedLabels = !!groupId
        ? groupLabels.filter((x) => !labels.map((x) => x.text).includes(x.text))
        : userLabels.filter((x) => !labels.map((x) => x.text).includes(x.text));
    const isEmpty = labels?.length === 0 && text.length === 0;
    return (_jsxs(StyledLabelPicker, { "$deleteClicked": $deleteClicked, children: [_jsxs("div", { className: "main", onFocus: () => handleFocus(), onBlur: handleBlur, ref: mainRef, tabIndex: 0, children: [labels.map((x) => {
                        return (_jsxs("span", { style: {
                                backgroundColor: labelColors[x.color],
                                color: '#000000c8',
                            }, onClick: () => handleSelectedLabelClick(x.id), className: "selected-label", children: [x.text, _jsx(IoClose, {})] }, x.id));
                    }), _jsx(AutoWidthInput, { className: "input", inputMode: "text", autoComplete: "off", autoCorrect: "off", spellCheck: false, value: text, onChange: handleInpuTextChange, ref: inputRef, isText: true }), isEmpty && (_jsx("div", { style: { position: 'absolute', flex: 1 }, children: "Select or create label" }))] }), _jsx("div", { className: "dropdown", ref: dropdownRef, children: isLabelsLoading ? (_jsx("div", { className: "loading-container", children: _jsx(Spinner, { variant: "secondary" }) })) : remainingSuggestedLabels.map((x) => (_jsxs("div", { onClick: () => handleSuggestedLabelClick(x), className: "suggested-label-container", children: [_jsx("div", { className: "suggested-label-text", style: {
                                backgroundColor: labelColors[x.color],
                                color: '#000000c8',
                            }, children: x.text }), _jsx("div", { className: "spinnerAndTrash", children: isPending && deletingLabelId === x.id ? (_jsx(Spinner, { variant: "secondary" })) : (_jsx(AiFillDelete, { style: { color: 'gray', cursor: 'pointer' }, onClick: (e) => removeLabel(e, x.id) })) })] }, x.id))) })] }));
};
export default LabelPicker;
