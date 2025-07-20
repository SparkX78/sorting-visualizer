export async function heapSort(
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

  const swap = (i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setSwaps((prev) => prev + 1);
    setArray([...arr]);
  };

  const heapify = async (n: number, i: number): Promise<void> => {
    if (shouldStop.current) return;

    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setCurrentIndices([i, left, right]);
    await delay();

    if (left < n) {
      logComparison(); // ✅ Only when left exists and compared
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      logComparison(); // ✅ Only when right exists and compared
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swap(i, largest);
      await delay();
      await heapify(n, largest);
    }
  };

  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    if (shouldStop.current) return;

    swap(0, i);
    setCurrentIndices([0, i]);
    await delay();

    await heapify(i, 0);
  }

  setCurrentIndices([]);
}