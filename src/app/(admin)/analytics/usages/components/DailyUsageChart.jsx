"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DailyUsageChart({
  usages,
}) {

  const usageMap = {};

  usages.forEach((u) => {

    const date =
      new Date(
        u.createdAt
      ).toLocaleDateString();

    usageMap[date] =
      (usageMap[date] || 0) + 1;
  });

  const chartData =
    Object.entries(usageMap).map(
      ([date, count]) => ({
        date,
        count,
      })
    );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[420px]">

      <h2 className="text-xl font-semibold mb-5">
        Daily Usage Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="count"
            fillOpacity={0.2}
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}