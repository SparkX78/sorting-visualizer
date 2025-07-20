export async function linearSearch(array, setCurrentIndices, speed, shouldStop, target, setComparisons) {
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
