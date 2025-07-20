import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export default function GraphPanel({ data }) {
    return (_jsxs("div", { className: "bg-slate-900 p-4 rounded-lg shadow w-full max-w-3xl mb-6", children: [_jsx("h2", { className: "text-white text-xl mb-3", children: "\uD83D\uDCC8 Comparisons Over Time" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: data, children: [_jsx(CartesianGrid, { stroke: "#666", strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "step", stroke: "#ccc" }), _jsx(YAxis, { stroke: "#ccc" }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "comparisons", stroke: "#38bdf8", strokeWidth: 2, dot: false })] }) })] }));
}
