"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SubjectPerformanceChart({
  subjects,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-[420px]">

      <h2 className="text-xl font-semibold mb-5">
        Subject Performance
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart data={subjects}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="subject" />

          <Tooltip />

          <Bar
            dataKey="completionRate"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}