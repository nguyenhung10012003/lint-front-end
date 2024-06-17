export const formatToShortNumber = (x: number) => {
  if (x >= 1000000) {
    return `${(x / 1000000).toFixed(1)}m`;
  } else if (x >= 1000) {
    return `${(x / 1000).toFixed(1)}k`;
  } else {
    return x.toString();
  }
};
