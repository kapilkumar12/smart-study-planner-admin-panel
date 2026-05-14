"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Flame, Trophy, Medal } from "lucide-react";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/streak/leaderboard"
      );

      setLeaderboard(res.data.leaderboard || []);
    } catch (error) {
      console.log("Leaderboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-white animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🔥 Streak Leaderboard
        </h1>
        <p className="text-gray-500 mt-1">
          Top performing users by consistency
        </p>
      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="text-left p-4">Rank</th>
              <th className="text-left p-4">User</th>
              <th className="text-center p-4">Current Streak</th>
              <th className="text-center p-4">Longest Streak</th>
              <th className="text-center p-4">Badge</th>
            </tr>
          </thead>

          <tbody>

            {leaderboard.map((user, index) => {

              const rank = index + 1;

              let badge = "❄️ Beginner";

              if (user.currentStreak >= 30) badge = "🔥 Legend";
              else if (user.currentStreak >= 15) badge = "⚡ Pro";
              else if (user.currentStreak >= 7) badge = "🚀 Active";

              return (
                <tr
                  key={user.userId}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >

                  {/* RANK */}
                  <td className="p-4 font-bold text-gray-700">
                    {rank <= 3 ? (
                      <span className="flex items-center gap-2">
                        {rank === 1 && <Trophy className="text-yellow-500" />}
                        {rank === 2 && <Medal className="text-gray-400" />}
                        {rank === 3 && <Medal className="text-orange-400" />}
                        #{rank}
                      </span>
                    ) : (
                      `#${rank}`
                    )}
                  </td>

                  {/* USER */}
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </td>

                  {/* CURRENT STREAK */}
                  <td className="p-4 text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-orange-500">
                      <Flame size={16} />
                      {user.currentStreak}
                    </span>
                  </td>

                  {/* LONGEST STREAK */}
                  <td className="p-4 text-center font-semibold text-gray-700">
                    {user.longestStreak}
                  </td>

                  {/* BADGE */}
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                      {badge}
                    </span>
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>
    </div>
  );
}