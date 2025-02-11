export const enhanceNumberArray = (dataArray: number[], numberOfMidpoints: number) => {
  const enhancedData = [];

  for (let i = 0; i < dataArray.length - 1; i++) {
    const interval = (dataArray[i + 1] - dataArray[i]) / (numberOfMidpoints + 1);

    enhancedData.push(dataArray[i]);

    for (let j = 1; j <= numberOfMidpoints; j++) {
      const interpolatedValue = dataArray[i] + interval * j;
      enhancedData.push(interpolatedValue);
    }
  }

  enhancedData.push(dataArray[dataArray.length - 1]);

  return enhancedData;
};
