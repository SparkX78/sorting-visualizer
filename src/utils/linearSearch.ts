export async function linearSearch(
  array: number[],
  setCurrentIndices: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  shouldStop: React.RefObject<boolean>,
  target: number,
  setComparisons: React.Dispatch<React.SetStateAction<number>>
): Promise<number | null> {
  for (let i = 0; i < array.length; i++) {
    if (shouldStop.current) {
      setCurrentIndices([]);
      return null;
    }

    setCurrentIndices([i]); // highlight scanned index
    setComparisons((prev) => prev + 1);
    await new Promise((res) => setTimeout(res, speed));

    if (array[i] === target) {
      return i;
    }
  }

  setCurrentIndices([]);
  return null;
}