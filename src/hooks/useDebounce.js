import { useState, useEffect } from 'react';
/**
 * Custom hook for debouncing a value and tracking debounce state.
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns A tuple with the debounced value and whether it is currently debouncing.
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);
    useEffect(() => {
        setIsDebouncing(true);
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsDebouncing(false);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return [debouncedValue, isDebouncing];
};
export default useDebounce;
