"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

export default function EventDistributionChart({
  usages,
}) {

  const eventMap = {};

  usages.forEach((u) => {

    eventMap[u.event] =
      (eventMap[u.event] || 0) + 1;
  });

  const chartData =
    Object.entries(eventMap).map(
      ([event, value]) => ({
        name: event,
        value,
      })
    );

  const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f97316",
    "#ec4899",
    "#14b8a6",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[420px]">

      <h2 className="text-xl font-semibold mb-5">
        Event Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={120}
            label
          >

            {chartData.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}