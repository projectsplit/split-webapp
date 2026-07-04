/**
 * Custom hook for debouncing a value and tracking debounce state.
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns A tuple with the debounced value and whether it is currently debouncing.
 */
declare const useDebounce: <T>(value: T, delay: number) => [T, boolean];
export default useDebounce;
