import { useLayoutEffect } from 'react';
declare const useLayoutEffectImpl: typeof useLayoutEffect;
export default useLayoutEffectImpl;
type Props = Readonly<{
    onClear?: () => void;
}>;
export declare function ClearEditorPlugin({ onClear }: Props): JSX.Element | null;
