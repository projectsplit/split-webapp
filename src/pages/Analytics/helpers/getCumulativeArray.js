export function getCumulativeShares(backendData) {
    if (!backendData?.items)
        return [];
    const cumulArrayData = backendData.items.map((c) => Math.round(c.accumulativeShareAmount));
    if (cumulArrayData[0] === 0 &&
        cumulArrayData[cumulArrayData.length - 1] === 0) {
        return [];
    }
    return cumulArrayData;
}
