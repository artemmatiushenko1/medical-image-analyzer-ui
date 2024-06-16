const getScalePercentageString = (scale: number) =>
  `${Math.floor((scale - 1) * 100)}%`;

export { getScalePercentageString };
