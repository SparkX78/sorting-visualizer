export async function mergeSort(array, setArray, setCurrentIndices, speed, shouldStop, setComparisons, setSwaps, setGraphLog) {
    const delay = () => new Promise(res => setTimeout(res, speed));
    const logComparison = () => {
        setComparisons(prev => {
            const updated = prev + 1;
            setGraphLog(log => [...log, { step: log.length, comparisons: updated }]);
            return updated;
        });
    };
    const workingArray = [...array];
    async function merge(arr, left, mid, right) {
        if (shouldStop.current)
            return;
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;
        while (i < leftArr.length && j < rightArr.length) {
            setCurrentIndices([k, left + i, mid + 1 + j]);
            await delay();
            logComparison(); // ✅ Only on actual comparison
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            }
            else {
                arr[k] = rightArr[j];
                j++;
            }
            setSwaps(prev => prev + 1);
            setArray([...arr]);
            k++;
        }
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
            setSwaps(prev => prev + 1);
            setArray([...arr]);
            setCurrentIndices([k]);
            await delay();
        }
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
            setSwaps(prev => prev + 1);
            setArray([...arr]);
            setCurrentIndices([k]);
            await delay();
        }
    }
    async function recursiveMergeSort(arr, left, right) {
        if (shouldStop.current || left >= right)
            return;
        const mid = Math.floor((left + right) / 2);
        await recursiveMergeSort(arr, left, mid);
        await recursiveMergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
        setArray([...arr]);
        await delay();
    }
    await recursiveMergeSort(workingArray, 0, workingArray.length - 1);
    setCurrentIndices([]);
}
