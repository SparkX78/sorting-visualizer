export async function bubbleSort(array, setArray, setCurrentIndices, speed, shouldStop, setComparisons, setSwaps, setGraphLog) {
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
        for (let j = 0; j < n - i - 1; j++) {
            if (shouldStop.current)
                return;
            setCurrentIndices([j, j + 1]);
            await delay();
            if (arr[j] > arr[j + 1]) {
                logComparison(); // ✅ Log only when comparison affects sorting
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                setSwaps((prev) => prev + 1);
                setArray([...arr]);
                await delay();
            }
        }
    }
    setCurrentIndices([]);
}
