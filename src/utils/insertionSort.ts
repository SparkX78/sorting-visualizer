export async function insertionSort(
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setCurrentIndices: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  shouldStop: React.RefObject<boolean>,
  setComparisons: React.Dispatch<React.SetStateAction<number>>,
  setSwaps: React.Dispatch<React.SetStateAction<number>>,
  setGraphLog: React.Dispatch<React.SetStateAction<{ step: number; comparisons: number }[]>>
): Promise<void> {
  const arr = [...array];
  const delay = () => new Promise((res) => setTimeout(res, speed));

  const logComparison = () => {
    setComparisons((prev) => {
      const updated = prev + 1;
      setGraphLog((log) => [...log, { step: log.length, comparisons: updated }]);
      return updated;
    });
  };

  for (let i = 1; i < arr.length; i++) {
    if (shouldStop.current) return;

    const key = arr[i];
    let j = i - 1;

    setCurrentIndices([i, j]);
    await delay();

    while (j >= 0 && arr[j] > key) {
      if (shouldStop.current) return;

      logComparison(); // ✅ Real comparison

      arr[j + 1] = arr[j];
      j--;

      setSwaps((prev) => prev + 1);
      setArray([...arr]);
      setCurrentIndices([j, j + 1]);
      await delay();
    }

    arr[j + 1] = key;
    setArray([...arr]);
    await delay();
  }

  setCurrentIndices([]);
}