import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
const data = [
    { name: 'Bubble Sort (O(n²))', weight: 5 },
    { name: 'Selection Sort (O(n²))', weight: 5 },
    { name: 'Insertion Sort (O(n²))', weight: 4 },
    { name: 'Merge Sort (O(n log n))', weight: 2 },
    { name: 'Quick Sort (O(n log n))', weight: 1.5 },
    { name: 'Heap Sort (O(n log n))', weight: 2.5 },
];
const COLORS = ['#d82d13ff', '#3e343eff', '#20713eff', '#155eb8ff', '#bd62d3ff', '#d38240ff'];
export default function TimeComplexityPie() {
    return (_jsxs("div", { className: "bg-[#0f172a] p-6 rounded-2xl shadow-2xl w-full max-w-xl text-white border border-gray-700", children: [_jsx("h2", { className: "text-2xl mb-4 text-center font-bold tracking-wide", children: "\uD83E\uDDEE Time Complexity Breakdown" }), _jsx(ResponsiveContainer, { width: "100%", height: 310, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, dataKey: "weight", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 110, innerRadius: 40, label: ({ name }) => name, stroke: "#e4e9f3ff", strokeWidth: 4, children: data.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length], style: {
                                    filter: 'drop-shadow(2px 2px 6px rgba(0,0,0,0.6))',
                                } }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => [`Weight: ${value}`, 'Complexity'], contentStyle: {
                                backgroundColor: '#22b2c8ff',
                                borderRadius: '0.5rem',
                                border: 'none',
                                color: '#f8fafc',
                            }, labelStyle: { color: '#facc15' } }), _jsx(Legend, { wrapperStyle: { color: '#050505ff', marginTop: '10px', fontSize: '0.9rem' } })] }) })] }));
}
