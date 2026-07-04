export const groupBy = (arr, key) => arr.reduce((groups, item) => {
    var _a;
    (groups[_a = key(item)] || (groups[_a] = [])).push(item);
    return groups;
}, {});
