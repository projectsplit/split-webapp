export const deduplicateFromEndofArr = (arr) => {
    const seen = new Set();
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const item = arr[i].trigger;
        if (!seen.has(item)) {
            seen.add(item);
            result.unshift(arr[i]);
        }
    }
    return result;
};
