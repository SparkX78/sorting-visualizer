import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const sortingDetails = {
    bubble: {
        title: 'Bubble Sort 🫧',
        desc: 'Compares adjacent pairs and bubbles the largest to the end each round. Time complexity: O(n²).',
    },
    selection: {
        title: 'Selection Sort 🎯',
        desc: 'Finds the minimum and places it at the front, one by one. Time complexity: O(n²).',
    },
    insertion: {
        title: 'Insertion Sort 🛠',
        desc: 'Builds a sorted section by inserting items in the correct place. Time complexity: O(n²).',
    },
    merge: {
        title: 'Merge Sort ⚡',
        desc: 'Recursively divides and merges arrays. Stable and efficient. Time complexity: O(n log n).',
    },
    quick: {
        title: 'Quick Sort 🚀',
        desc: 'Selects a pivot and partitions the array recursively. Fast but not stable. Avg: O(n log n).',
    },
    heap: {
        title: 'Heap Sort 🏗',
        desc: 'Builds a heap and extracts max repeatedly. Consistent O(n log n) performance.',
    },
};
export default function SortingInfoPanel() {
    const [selected, setSelected] = useState('bubble');
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-4 text-white", children: "\u2139\uFE0F Sorting Info" }), _jsx("div", { className: "space-y-2 mb-4", children: Object.keys(sortingDetails).map((key) => (_jsx("button", { onClick: () => setSelected(key), className: `w-full text-left px-4 py-2 rounded-lg ${selected === key ? 'bg-purple-700 text-white' : 'bg-gray-800 text-gray-300'} hover:bg-purple-600`, children: sortingDetails[key].title }, key))) }), _jsxs("div", { className: "p-3 bg-gray-800 rounded-lg text-gray-200 shadow", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: sortingDetails[selected].title }), _jsx("p", { children: sortingDetails[selected].desc })] })] }));
}
