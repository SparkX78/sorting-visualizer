export async function quickSort(array, setArray, setCurrentIndices, speed, shouldStop, setComparisons, setSwaps, setGraphLog) {
    const arr = [...array];
    const delay = () => new Promise((res) => setTimeout(res, speed));
    const logComparison = () => {
        setComparisons((prev) => {
            const updated = prev + 1;
            setGraphLog((log) => [...log, { step: log.length, comparisons: updated }]);
            return updated;
        });
    };
    const swap = (i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setSwaps((prev) => prev + 1);
        setArray([...arr]);
    };
    async function partition(low, high) {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (shouldStop.current)
                return i;
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
    async function recursiveQuickSort(low, high) {
        if (shouldStop.current)
            return;
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
