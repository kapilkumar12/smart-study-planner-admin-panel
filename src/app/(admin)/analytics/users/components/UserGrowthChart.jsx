"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function UserGrowthChart({
  data,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[400px]">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-semibold">
          User Activity Growth
        </h2>

      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}