import { ForwardedRef } from 'react';

export const caretToEndOnFocus =
  (ref: ForwardedRef<HTMLInputElement>) => () => {
    if (ref && typeof ref === 'object' && ref.current) {
      setTimeout(() => {
        const length = ref.current?.value.length || 0;
        ref.current?.setSelectionRange(length, length);
      }, 0);
    }
  };
