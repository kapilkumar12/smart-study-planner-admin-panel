"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WeeklyActivityChart({
  data,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[400px]">

      <h2 className="text-xl font-semibold mb-5">
        Weekly Activity
      </h2>

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