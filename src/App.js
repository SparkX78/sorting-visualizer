import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { generateArray } from './utils/generateArray';
import { bubbleSort } from './utils/bubbleSort';
import { selectionSort } from './utils/selectionSort';
import { mergeSort } from './utils/mergeSort';
import { quickSort } from './utils/quickSort';
import { heapSort } from './utils/heapSort';
import { insertionSort } from './utils/insertionSort';
import { linearSearch } from './utils/linearSearch';
import { binarySearch } from './utils/binarySearch';
import confetti from 'canvas-confetti';
import GraphPanel from './components/GraphPanel'; // Create this component separately
import TimeComplexityPie from './components/TimeComplexityPie';
import SortingInfoPanel from './components/SortingInfoPanel';
import ChatBot from './components/ChatBot';
_jsx(ChatBot, {});
export const DEFAULT_SIZE = 150;
export const DEFAULT_SPEED = 50;
export default function App() {
    const [array, setArray] = useState([]);
    const [currentIndices, setCurrentIndices] = useState([]);
    const [speed, setSpeed] = useState(DEFAULT_SPEED);
    const [isSorting, setIsSorting] = useState(false);
    const [showFinalSorted, setShowFinalSorted] = useState(false);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [sortMessage, setSortMessage] = useState('');
    const [graphLog, setGraphLog] = useState([]);
    const shouldStop = useRef(false);
    useEffect(() => {
        setArray(generateArray(DEFAULT_SIZE));
    }, []);
    const shuffleArray = () => {
        shouldStop.current = true;
        setArray(generateArray(DEFAULT_SIZE));
        setCurrentIndices([]);
        setIsSorting(false);
        setShowFinalSorted(false);
        setComparisons(0);
        setSwaps(0);
        setSearchResult(null);
        setSearchValue('');
        setSortMessage('');
        setGraphLog([]);
    };
    const triggerConfetti = () => {
        const duration = 1800;
        const end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
            if (Date.now() < end)
                requestAnimationFrame(frame);
        })();
    };
    const handleSort = async (sortFunction) => {
        shouldStop.current = false;
        setIsSorting(true);
        setShowFinalSorted(false);
        setComparisons(0);
        setSwaps(0);
        setSearchResult(null);
        setSortMessage('');
        setGraphLog([]);
        await sortFunction(array, setArray, setCurrentIndices, speed, shouldStop, setComparisons, setSwaps, setGraphLog);
        setIsSorting(false);
        setCurrentIndices([]);
        setShowFinalSorted(true);
        setSortMessage(`${sortFunction.name.replace('Sort', '')} Sort Completed!`);
        triggerConfetti();
        setTimeout(() => {
            setShowFinalSorted(false);
            setSortMessage('');
        }, 3000);
    };
    const handleLinearSearch = async () => {
        shouldStop.current = false;
        setIsSorting(true);
        setComparisons(0);
        setCurrentIndices([]);
        setSearchResult(null);
        setSortMessage('');
        const result = await linearSearch(array, setCurrentIndices, speed, shouldStop, Number(searchValue), setComparisons);
        setSearchResult(result);
        setIsSorting(false);
    };
    const handleBinarySearch = async () => {
        shouldStop.current = false;
        setIsSorting(true);
        setComparisons(0);
        setCurrentIndices([]);
        setSearchResult(null);
        setSortMessage('');
        const sortedArray = [...array].sort((a, b) => a - b);
        setArray(sortedArray);
        const result = await binarySearch(sortedArray, setCurrentIndices, speed, shouldStop, Number(searchValue), setComparisons);
        setSearchResult(result);
        setIsSorting(false);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-950 text-white p-6 font-sans flex flex-col items-center", children: [_jsx("h1", { className: "text-3xl font-bold mb-4 text-center", children: "\uD83D\uDD22 Sorting & Searching Visualizer" }), sortMessage && (_jsxs("div", { className: "mb-4 px-4 py-2 bg-green-600 rounded shadow text-white text-lg transition-all duration-300", children: ["\u2705 ", sortMessage] })), _jsxs("div", { className: "mb-4 flex gap-6 text-lg font-medium", children: [_jsxs("div", { children: ["\uD83D\uDD0D Comparisons: ", _jsx("span", { className: "text-blue-400", children: comparisons })] }), _jsxs("div", { children: ["\uD83D\uDD01 Swaps: ", _jsx("span", { className: "text-green-400", children: swaps })] })] }), _jsx("div", { style: {
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '4px',
                    height: '500px',
                    padding: '16px',
                    backgroundColor: '#220',
                    overflowX: 'auto',
                    borderRadius: '8px',
                }, className: "w-full max-w-6xl mb-6", children: array.map((val, i) => (_jsx("div", { title: `Value: ${val}`, style: {
                        height: `${val * 3.25}px`,
                        width: '6px',
                        backgroundColor: showFinalSorted
                            ? '#a855f7'
                            : i === currentIndices[0]
                                ? '#f43f5e'
                                : i === currentIndices[1]
                                    ? '#0ea5e9'
                                    : i === currentIndices[2]
                                        ? '#facc15'
                                        : '#00ff00',
                        transform: showFinalSorted ? 'scaleY(1.1)' : 'scaleY(1)',
                        transition: showFinalSorted
                            ? 'background-color 0.5s ease, transform 0.3s ease'
                            : 'height 0.2s ease',
                    } }, i))) }), _jsxs("div", { className: "flex flex-wrap justify-center items-center gap-4 mb-6", children: [_jsx("button", { onClick: shuffleArray, disabled: isSorting, className: "px-4 py-2 rounded bg-blue-600 hover:bg-blue-700", children: "\uD83D\uDD00 Shuffle" }), _jsx("button", { onClick: () => handleSort(bubbleSort), disabled: isSorting, className: "px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700", children: "\uD83D\uDFE6 Bubble" }), _jsx("button", { onClick: () => handleSort(selectionSort), disabled: isSorting, className: "px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black", children: "\uD83D\uDFE8 Selection" }), _jsx("button", { onClick: () => handleSort(mergeSort), disabled: isSorting, className: "px-4 py-2 rounded bg-purple-600 hover:bg-purple-700", children: "\uD83E\uDDE9 Merge" }), _jsx("button", { onClick: () => handleSort(quickSort), disabled: isSorting, className: "px-4 py-2 rounded bg-pink-600 hover:bg-pink-700", children: "\uD83C\uDFAF Quick" }), _jsx("button", { onClick: () => handleSort(heapSort), disabled: isSorting, className: "px-4 py-2 rounded bg-orange-500 hover:bg-orange-600", children: "\uD83E\uDDF1 Heap" }), _jsx("button", { onClick: () => handleSort(insertionSort), disabled: isSorting, className: "px-4 py-2 rounded bg-lime-500 hover:bg-lime-600 text-black", children: "\uD83D\uDCE5 Insertion" }), _jsx("button", { onClick: () => {
                            shouldStop.current = true;
                            setIsSorting(false);
                            setShowFinalSorted(false);
                            setSearchResult(null);
                            setSortMessage('');
                            setGraphLog([]);
                        }, disabled: !isSorting, className: "px-4 py-2 rounded bg-red-600 hover:bg-red-700", children: "\u26D4 Stop" })] }), _jsx("div", { className: "mb-4 text-lg", children: _jsxs("label", { className: "flex items-center gap-3", children: ["Speed:", _jsx("input", { type: "range", min: "10", max: "200", value: speed, onChange: (e) => setSpeed(Number(e.target.value)), className: "accent-blue-500" }), _jsxs("span", { className: "text-blue-400", children: [speed, "ms"] })] }) }), _jsxs("div", { className: "flex gap-3 items-center mt-4", children: [_jsx("input", { type: "number", value: searchValue, onChange: (e) => setSearchValue(e.target.value), className: "px-3 py-1 rounded text-black", placeholder: "Enter value to search" }), _jsx("button", { onClick: handleLinearSearch, disabled: isSorting || !searchValue, className: `px-4 py-2 rounded shadow ${isSorting ? 'bg-gray-500 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'}`, children: "\uD83D\uDD0D Linear Search" }), _jsx("button", { onClick: handleBinarySearch, disabled: isSorting || !searchValue, className: `px-4 py-2 rounded shadow ${isSorting ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'}`, children: "\uD83E\uDDE0 Binary Search" })] }), searchResult !== null && (_jsxs("div", { className: "mt-3 text-green-400 text-lg font-semibold", children: ["\uD83C\uDFAF Found at index ", searchResult] })), searchResult === null && searchValue && !isSorting && (_jsx("div", { className: "mt-3 text-red-400 text-lg font-semibold", children: "\u274C Value not found" })), _jsxs("div", { className: "flex w-full items-start gap-6", children: [_jsx("div", { className: "flex-1 flex flex-col items-center space-y-6" }), _jsx("div", { className: "w-[280px] bg-gray-900 p-4 rounded-xl shadow-lg", children: _jsx(SortingInfoPanel, {}) })] }), graphLog.length > 0 && (_jsx("div", { className: "mt-6 w-full flex justify-center", children: _jsx(GraphPanel, { data: graphLog }) })), _jsx("div", { className: "mt-10 w-full flex justify-center", children: _jsx(TimeComplexityPie, {}) }), _jsxs("div", { style: { fontFamily: 'Segoe UI, sans-serif', padding: 20 }, children: [_jsx("h1", { children: "\uD83E\uDDE0 Welcome to SortBot" }), _jsx("p", { children: "Ask anything about sorting algorithms, logic, or project ideas!" }), _jsx(ChatBot, {})] })] }));
}
