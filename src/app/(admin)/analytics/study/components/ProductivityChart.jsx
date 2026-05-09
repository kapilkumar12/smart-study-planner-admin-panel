"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ProductivityChart({
  data,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[350px]">

      <h2 className="text-xl font-semibold mb-5">
        Daily Productivity
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="count"
            strokeWidth={3}
            fillOpacity={0.2}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}