import { AlertTriangle } from "lucide-react";

export default function PendingTasksCard({
  total,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">

      <div>

        <p className="text-gray-500">
          Pending Tasks Today
        </p>

        <h2 className="text-4xl font-bold mt-2 text-red-500">
          {total}
        </h2>

      </div>

      <div className="bg-red-500 text-white p-4 rounded-2xl shadow-lg">

        <AlertTriangle size={30} />

      </div>

    </div>
  );
}