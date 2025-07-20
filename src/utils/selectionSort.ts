export async function selectionSort(
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
  const n = arr.length;
  const delay = () => new Promise((res) => setTimeout(res, speed));

  const logComparison = () => {
    setComparisons((prev) => {
      const updated = prev + 1;
      setGraphLog((log) => [...log, { step: log.length, comparisons: updated }]);
      return updated;
    });
  };

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (shouldStop.current) return;

      setCurrentIndices([minIdx, j]);
      await delay();

      logComparison(); // ✅ Only when evaluating a new candidate

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      setSwaps((prev) => prev + 1);
      setArray([...arr]);
      await delay();
    }
  }

  setCurrentIndices([]);
}