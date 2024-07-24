export const formatToShortNumber = (x: number) => {
  if (!x) return "0";
  if (x >= 1000000) {
    return `${(x / 1000000).toFixed(1)}m`;
  } else if (x >= 1000) {
    return `${(x / 1000).toFixed(1)}k`;
  } else {
    return x.toString();
  }
};

export function getRandomInt(from: number, to: number): number {
  if (from > to) {
    throw new Error(
      "The 'from' parameter should be less than or equal to the 'to' parameter."
    );
  }

  // Tạo ra một số ngẫu nhiên trong khoảng từ 0 đến (to - from), sau đó cộng thêm `from` để được số trong khoảng `from` đến `to`
  const randomInt = Math.floor(Math.random() * (to - from + 1)) + from;
  return randomInt;
}
