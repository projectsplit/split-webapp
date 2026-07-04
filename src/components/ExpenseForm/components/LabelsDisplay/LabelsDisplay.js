import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledLabelsDisplay } from './LabelsDisplay.styled';
import { IoClose } from 'react-icons/io5';
import labelColors from '../../../../labelColors';
import { FaTags } from 'react-icons/fa';
import { MdGroup } from 'react-icons/md';
export default function LabelsDisplay({ labels, setLabels, labelMenuIsOpen, isPersonal, }) {
    const handleSelectedLabelClick = (labelId) => {
        setLabels(labels.filter((x) => x.id !== labelId));
    };
    return (_jsxs(StyledLabelsDisplay, { children: [' ', _jsx(FaTags, { className: "tagIcon", onClick: () => (labelMenuIsOpen.value = true) }), _jsxs("div", { className: "labels", children: [' ', labels.map((x) => {
                        return (_jsxs("span", { style: {
                                backgroundColor: labelColors[x.color],
                                color: '#000000c8',
                            }, onClick: () => handleSelectedLabelClick(x.id), className: "selected-label", children: [isPersonal && !x.id.includes('_') && (_jsx(MdGroup, { style: { marginRight: '4px' } })), x.text, _jsx(IoClose, {})] }, x.id));
                    })] })] }));
}
