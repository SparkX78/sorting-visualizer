export async function binarySearch(
  array: number[],
  setCurrentIndices: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  shouldStop: React.RefObject<boolean>,
  target: number,
  setComparisons: React.Dispatch<React.SetStateAction<number>>
): Promise<number | null> {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    if (shouldStop.current) {
      setCurrentIndices([]);
      return null;
    }

    const mid = Math.floor((low + high) / 2);
    setCurrentIndices([low, mid, high]);
    setComparisons((prev) => prev + 1);
    await new Promise((res) => setTimeout(res, speed));

    if (array[mid] === target) return mid;
    if (array[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  setCurrentIndices([]);
  return null;
}