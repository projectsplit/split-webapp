import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Tree from '../../../../components/Tree/Tree';
import { MemberDetailedDescription } from '../MemberDetailedDescription/MemberDetailedDescription';
import { StyledDescriptionAndTree } from './DescriptionAndTree.Styled';
import { Mode } from '@/types';
export const DescriptionAndTree = ({ memberTransactions, pendingTransactions, isLogedUser, id, name, isOwed, showTree, treeItems, participants, userOrMemberId, mode, }) => {
    const conditionForTree = (showTree && mode === Mode.Group) || (showTree && isLogedUser);
    return (_jsxs(StyledDescriptionAndTree, { children: [_jsx(MemberDetailedDescription, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isOwed: isOwed, isLogedUser: isLogedUser, id: id, name: name, participants: participants, userOrMemberId: userOrMemberId, mode: mode }), conditionForTree && _jsx(Tree, { items: treeItems })] }));
};
