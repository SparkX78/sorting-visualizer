export async function quickSort(
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

  const swap = (i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setSwaps((prev) => prev + 1);
    setArray([...arr]);
  };

  async function partition(low: number, high: number): Promise<number> {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (shouldStop.current) return i;

      setCurrentIndices([j, high]);
      await delay();

      logComparison(); // ✅ Only when comparing to pivot

      if (arr[j] < pivot) {
        i++;
        swap(i, j);
        await delay();
      }
    }

    swap(i + 1, high);
    await delay();
    return i + 1;
  }

  async function recursiveQuickSort(low: number, high: number): Promise<void> {
    if (shouldStop.current) return;
    if (low < high) {
      const pi = await partition(low, high);
      await recursiveQuickSort(low, pi - 1);
      await recursiveQuickSort(pi + 1, high);
    }
  }

  await recursiveQuickSort(0, arr.length - 1);
  setArray([...arr]);
  setCurrentIndices([]);
}