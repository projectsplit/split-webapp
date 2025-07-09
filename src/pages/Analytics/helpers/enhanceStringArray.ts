export const enhanceStringArray =(arr: string[], num: number): string[] => {
    return arr.flatMap((day, index) => {
      if (index < arr.length - 1) {
        return [day, ...Array(num).fill("")];
      } else {
        return [day];
      }
    });
  }