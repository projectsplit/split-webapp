import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BiArrowBack } from 'react-icons/bi';
import { StyledLabelMenu } from './LabelMenu.styled';
import LabelPicker from '../../../LabelPicker/LabelPicker';
import MyButton from '../../../MyButton/MyButton';
import { useSignal } from '@preact/signals-react';
import GeneralWarningMenuAnimation from '@/components/Animations/GeneralWarningMenuAnimation';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
export const LabelMenu = ({ labelMenuIsOpen, groupId, labels, setLabels, userId, isPersonal, }) => {
    const errorMessage = useSignal('');
    const menu = useSignal(null);
    return (_jsxs(StyledLabelMenu, { children: [_jsxs("div", { className: "header", children: [_jsxs("div", { className: "closeButtonContainer", children: [' ', _jsx(BiArrowBack, { className: "backButton", onClick: () => (labelMenuIsOpen.value = false) })] }), _jsx("div", { className: "title", children: "Tag expense" }), _jsx("div", { className: "gap" })] }), _jsx("div", { className: "info", children: "Type to add a new label (press space to confirm) or pick an existing one." }), _jsx("div", { className: "label-picker-wrapper", children: _jsx(LabelPicker, { labels: labels, setLabels: setLabels, groupId: groupId, errorMessage: errorMessage, userId: userId, isPersonal: isPersonal, menu: menu }) }), _jsx(MyButton, { fontSize: "16", onClick: () => (labelMenuIsOpen.value = false), children: "Done" }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(GeneralWarningMenuAnimation, { message: errorMessage.value, menu: menu })] }));
};
export default name;
