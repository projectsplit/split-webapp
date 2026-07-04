import { Signal } from '@preact/signals-react';
export declare const scopeBuilder: (scopeState: Signal<{
    personal: boolean;
    group: boolean;
    nonGroup: boolean;
}>, allGroupsSelected: Signal<boolean>, targetGroupIds: Signal<string[]>) => {
    text: string;
    flags: number;
};
