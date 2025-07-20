import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: { step: number; comparisons: number }[];
}

export default function GraphPanel({ data }: Props) {
  return (
    <div className="bg-slate-900 p-4 rounded-lg shadow w-full max-w-3xl mb-6">
      <h2 className="text-white text-xl mb-3">📈 Comparisons Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#666" strokeDasharray="3 3" />
          <XAxis dataKey="step" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="comparisons" stroke="#38bdf8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}