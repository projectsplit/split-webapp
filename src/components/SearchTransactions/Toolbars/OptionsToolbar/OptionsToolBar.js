import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useBeautifulMentions } from 'lexical-beautiful-mentions';
import { $getNodeByKey } from 'lexical';
import { StyledOptionsToolbar } from './OptionsToolbar.styled';
import Pill from '../../../Pill/Pill';
import labelColors from '../../../../labelColors';
const OptionsToolBar = ({ editorStateString, filteredResults, setFilteredResults, }) => {
    const { insertMention } = useBeautifulMentions();
    const [editor] = useLexicalComposerContext();
    const groupedResults = filteredResults.reduce((acc, item) => {
        const key = item.prop;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push({ ...item, prop: key });
        return acc;
    }, {});
    return (_jsx(_Fragment, { children: editorStateString === ''
            ? null
            : Object.entries(groupedResults).map(([prop, results]) => (_jsx(StyledOptionsToolbar, { children: _jsxs("div", { className: "categoryAndTypesWrapper", children: [_jsx("div", { className: "category", children: prop }), _jsx("div", { className: "types", children: results.map((result, index) => (_jsx(Pill, { "$textColor": '#000000c8', color: prop === 'category'
                                    ? labelColors[result?.color]
                                    : '#ffffff', title: result.value, closeButton: false, "$border": prop === 'category' ? false : true, onClick: () => {
                                    editor.update(() => {
                                        const nodeMap = editor._editorState._nodeMap;
                                        let lastTextNodeKey = null;
                                        for (let [key, node] of nodeMap.entries()) {
                                            if (node.__type === 'text') {
                                                lastTextNodeKey = key;
                                            }
                                        }
                                        if (lastTextNodeKey) {
                                            const lastTextNode = $getNodeByKey(lastTextNodeKey);
                                            if (lastTextNode) {
                                                lastTextNode.remove();
                                            }
                                        }
                                        if (result.prop === 'category') {
                                            insertMention({
                                                trigger: result.prop + ':',
                                                value: result.value,
                                                data: { id: result.id },
                                            });
                                        }
                                        else {
                                            //else is going to be a member
                                            insertMention({
                                                trigger: result.prop + ':',
                                                value: result.value,
                                                data: { memberId: result.memberId },
                                            });
                                        }
                                        setFilteredResults([]);
                                    });
                                } }, index))) })] }) }, prop))) }));
};
export default OptionsToolBar;
