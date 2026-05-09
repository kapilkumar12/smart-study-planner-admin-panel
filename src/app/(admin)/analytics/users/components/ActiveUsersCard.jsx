import { Activity } from "lucide-react";

export default function ActiveUsersCard({
  activeUsers,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500">
            Active Users
          </p>

          <h2 className="text-4xl font-bold mt-2 text-gray-800">
            {activeUsers}
          </h2>

        </div>

        <div className="bg-green-500 text-white p-4 rounded-2xl shadow-lg">

          <Activity size={28} />

        </div>

      </div>

    </div>
  );
}