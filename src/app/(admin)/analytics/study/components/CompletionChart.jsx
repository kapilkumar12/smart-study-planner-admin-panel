"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CompletionChart({
  data,
}) {

  const chartData = [
    {
      name: "Completed",
      value:
        data?.completedTasks || 0,
    },

    {
      name: "Pending",
      value:
        data?.pendingTasks || 0,
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[350px]">

      <h2 className="text-xl font-semibold mb-5">
        Completion Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={110}
            label
          >

            <Cell />

            <Cell />

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}