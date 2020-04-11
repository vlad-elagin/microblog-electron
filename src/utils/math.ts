const getMiddleNumber = (values: number[]): number => {
  return (Math.min(...values) + Math.max(...values)) / 2;
};

export const getMedianQuartiles = (values: number[]): number[] => {
  const sortedValues = values.sort((a, b) => a - b);
  const firstQuartile = getMiddleNumber(sortedValues.slice(0, Math.floor(values.length / 2)));
  const thirdQuartile = getMiddleNumber(
    sortedValues.slice(Math.floor(values.length / 2), values.length)
  );
  const median = (firstQuartile + thirdQuartile) / 2;
  return [firstQuartile, median, thirdQuartile];
};
