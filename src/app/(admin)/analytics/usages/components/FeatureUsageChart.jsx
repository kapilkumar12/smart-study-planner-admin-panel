"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function FeatureUsageChart({
  usages,
}) {

  const eventMap = {};

  usages.forEach((u) => {

    eventMap[u.event] =
      (eventMap[u.event] || 0) + 1;
  });

  const chartData =
    Object.entries(eventMap).map(
      ([event, count]) => ({
        event,
        count,
      })
    );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[420px]">

      <h2 className="text-xl font-semibold mb-5">
        Feature Usage
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="event" />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}