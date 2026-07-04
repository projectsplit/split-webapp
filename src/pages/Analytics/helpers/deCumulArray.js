export const deCumulArray = (cumulArr) => {
    if (cumulArr === undefined)
        return [];
    const deCumuledArr = [];
    cumulArr.map((c, index) => {
        const adjIndex = cumulArr.length - 1 - index;
        if (adjIndex !== 0)
            deCumuledArr.push(Number((cumulArr[adjIndex] - cumulArr[adjIndex - 1]).toFixed(2))); //TODO: Use currency.js
        if (adjIndex === 0)
            deCumuledArr.push(Number(cumulArr[adjIndex].toFixed(2)));
    });
    return deCumuledArr.reverse();
};
