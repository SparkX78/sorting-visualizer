import React, { useState, useEffect, useRef } from 'react';
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

<ChatBot />




export const DEFAULT_SIZE = 150;
export const DEFAULT_SPEED = 50;


export default function App() {
  const [array, setArray] = useState<number[]>([]);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [isSorting, setIsSorting] = useState(false);
  const [showFinalSorted, setShowFinalSorted] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<null | number>(null);
  const [sortMessage, setSortMessage] = useState('');
  const [graphLog, setGraphLog] = useState<{ step: number; comparisons: number }[]>([]);

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
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleSort = async (
    sortFunction: (
      array: number[],
      setArray: React.Dispatch<React.SetStateAction<number[]>>,
      setCurrentIndices: React.Dispatch<React.SetStateAction<number[]>>,
      speed: number,
      shouldStop: React.RefObject<boolean>,
      setComparisons: React.Dispatch<React.SetStateAction<number>>,
      setSwaps: React.Dispatch<React.SetStateAction<number>>,
      setGraphLog: React.Dispatch<React.SetStateAction<{ step: number; comparisons: number }[]>>
    ) => Promise<void>
  ) => {
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

    const result = await linearSearch(
      array,
      setCurrentIndices,
      speed,
      shouldStop,
      Number(searchValue),
      setComparisons
    );

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

    const result = await binarySearch(
      sortedArray,
      setCurrentIndices,
      speed,
      shouldStop,
      Number(searchValue),
      setComparisons
    );

    setSearchResult(result);
    setIsSorting(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">🔢 Sorting & Searching Visualizer</h1>

      {sortMessage && (
        <div className="mb-4 px-4 py-2 bg-green-600 rounded shadow text-white text-lg transition-all duration-300">
          ✅ {sortMessage}
        </div>
      )}

      <div className="mb-4 flex gap-6 text-lg font-medium">
        <div>🔍 Comparisons: <span className="text-blue-400">{comparisons}</span></div>
        <div>🔁 Swaps: <span className="text-green-400">{swaps}</span></div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          height: '500px',
          padding: '16px',
          backgroundColor: '#220',
          overflowX: 'auto',
          borderRadius: '8px',
        }}
        className="w-full max-w-6xl mb-6"
      >
        {array.map((val, i) => (
          <div
            key={i}
            title={`Value: ${val}`}
            style={{
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
            }}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <button onClick={shuffleArray} disabled={isSorting} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">🔀 Shuffle</button>
            <button onClick={() => handleSort(bubbleSort)} disabled={isSorting} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700">🟦 Bubble</button>
            <button onClick={() => handleSort(selectionSort)} disabled={isSorting} className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black">🟨 Selection</button>
            <button onClick={() => handleSort(mergeSort)} disabled={isSorting} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">🧩 Merge</button>
            <button onClick={() => handleSort(quickSort)} disabled={isSorting} className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-700">🎯 Quick</button>
            <button onClick={() => handleSort(heapSort)} disabled={isSorting} className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600">🧱 Heap</button>
            <button onClick={() => handleSort(insertionSort)} disabled={isSorting} className="px-4 py-2 rounded bg-lime-500 hover:bg-lime-600 text-black">📥 Insertion</button>
            <button
                onClick={() => {
                    shouldStop.current = true;
                    setIsSorting(false);
                    setShowFinalSorted(false);
                    setSearchResult(null);
                    setSortMessage('');
                    setGraphLog([]);
                }}
                disabled={!isSorting}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
            >
            ⛔ Stop
            </button>
        </div>

        {/* Speed Slider */}
        <div className="mb-4 text-lg">
            <label className="flex items-center gap-3">
                Speed:
                <input
                    type="range"
                    min="10"
                    max="200"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="accent-blue-500"
                />
                <span className="text-blue-400">{speed}ms</span>
            </label>
        </div>

        {/* Search Controls */}
        <div className="flex gap-3 items-center mt-4">
            <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-3 py-1 rounded text-black"
                placeholder="Enter value to search"
            />
            <button
                onClick={handleLinearSearch}
                disabled={isSorting || !searchValue}
                className={`px-4 py-2 rounded shadow ${
                    isSorting ? 'bg-gray-500 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'
                }`}
            >
            🔍 Linear Search
            </button>
            <button
                onClick={handleBinarySearch}
                disabled={isSorting || !searchValue}
                className={`px-4 py-2 rounded shadow ${
                isSorting ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
                }`}
            >
            🧠 Binary Search
            </button>
        </div>

        {/* Search Result Display */}
        {searchResult !== null && (
            <div className="mt-3 text-green-400 text-lg font-semibold">
            🎯 Found at index {searchResult}
            </div>
        )}
        {searchResult === null && searchValue && !isSorting && (
            <div className="mt-3 text-red-400 text-lg font-semibold">
            ❌ Value not found
            </div>
        )}
        <div className="flex w-full items-start gap-6">
            {/* Left: Sorting Visualizer */}
            <div className="flex-1 flex flex-col items-center space-y-6">
                {/* Sorting buttons */}
                {/* Sorting bars */}
            </div>

            {/* Right: Info Panel */}
            <div className="w-[280px] bg-gray-900 p-4 rounded-xl shadow-lg">
                <SortingInfoPanel />
            </div>
        </div>
        {/* Graph Panel */}
        {graphLog.length > 0 && (
            <div className="mt-6 w-full flex justify-center">
                <GraphPanel data={graphLog} />
            </div>
        )}
        {/* 🍰 Time Complexity Pie Chart — KEEP THIS AT THE BOTTOM */}
        <div className="mt-10 w-full flex justify-center">
            <TimeComplexityPie />
        </div>
        <div style={{ fontFamily: 'Segoe UI, sans-serif', padding: 20 }}>
          <h1>🧠 Welcome to SortBot</h1>
          <p>Ask anything about sorting algorithms, logic, or project ideas!</p>

          {/* 🔵 Your chatbot controller */}
          <ChatBot />
        </div>


    </div>
  );}