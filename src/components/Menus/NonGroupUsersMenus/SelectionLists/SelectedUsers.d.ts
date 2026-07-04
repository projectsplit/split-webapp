import React from 'react';
import { User } from '../../../../types';
export declare const SelectedUsers: React.MemoExoticComponent<({ users, onRemove, currentUserId, }: {
    users: User[];
    onRemove: (id: string) => void;
    currentUserId: string;
}) => (import("react/jsx-runtime").JSX.Element | null)[]>;
