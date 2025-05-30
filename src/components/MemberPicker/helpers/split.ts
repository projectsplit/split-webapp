export const split = (
    total: number,
    splits: number,
    maxDecimals: number
  ): number[] => {
    if (
      splits <= 0 ||
      !Number.isInteger(splits) ||
      maxDecimals < 0 ||
      !Number.isInteger(maxDecimals)
    )
      return [];
  
    const multiplier = Math.pow(10, maxDecimals);
    const totalCents = Math.round(total * multiplier);
    const baseCents = Math.floor(totalCents / splits);
    const remainderCents = totalCents - baseCents * splits;

    // console.log(multiplier,totalCents, baseCents, remainderCents, splits);
  
    const result = Array(splits).fill(baseCents);
  
    for (let i = 0; i < remainderCents; i++) {
      result[i]++;
    }

    return result
      .map((val) => Number((val / multiplier).toFixed(maxDecimals)))
      .sort((a, b) => a - b);


  };