import { RenderBothScenariosProps, RenderScenariosProps, RenderSettledProps } from '../../../../interfaces';
export declare const RenderOwedOnly: ({ memberTransactions, pendingTransactions, isLogedUser, id, name, showTree, treeItems, participants, userOrMemberId, mode, }: RenderScenariosProps) => import("react/jsx-runtime").JSX.Element;
export declare const RenderOwesOnly: ({ memberTransactions, pendingTransactions, isLogedUser, id, name, showTree, treeItems, participants, userOrMemberId, mode, }: RenderScenariosProps) => import("react/jsx-runtime").JSX.Element;
export declare const RenderSettled: ({ isLogedUser, name }: RenderSettledProps) => import("react/jsx-runtime").JSX.Element;
export declare const RenderBoth: ({ memberTransactions, pendingTransactions, isLogedUser, id, name, doNotshowTreeWhenMemberIsOwed, doNotshowTreeWhenMemberOwes, memberIsOwedItems, memberOwesItems, participants, userOrMemberId, mode, }: RenderBothScenariosProps) => import("react/jsx-runtime").JSX.Element;
