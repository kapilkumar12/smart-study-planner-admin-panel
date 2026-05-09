"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import {
  Users,
  Activity,
  ClipboardList,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

type DashboardData = {
  users: {
    totalUsers: number;
    activeUsers: number;
  };

  plans: {
    totalPlans: number;
  };

  tasks: {
    totalTasks: number;
    completedTasks: number;
    overallProgress: number;
  };

  today?: {
    total: number;
    completed: number;
    pending: number;
  };

  recentUsers?: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  }[];
};

export default function DashboardPage() {
  const [data, setData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axiosInstance.get(
        "/dashboard/admin"
      );

      setData(res.data);

    } catch (error) {
      console.log(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =========================
  // LOADING UI
  // =========================

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white h-32 rounded-2xl animate-pulse"
            />
          ))}

        </div>
      </div>
    );
  }

  // =========================
  // DASHBOARD CARDS
  // =========================

  const cards = [
    {
      title: "Total Users",
      value: data?.users.totalUsers || 0,
      icon: Users,
      gradient:
        "from-blue-500 to-indigo-500",
    },

    {
      title: "Active Users",
      value: data?.users.activeUsers || 0,
      icon: Activity,
      gradient:
        "from-green-500 to-emerald-500",
    },

    {
      title: "Total Plans",
      value: data?.plans.totalPlans || 0,
      icon: ClipboardList,
      gradient:
        "from-orange-500 to-amber-500",
    },

    {
      title: "Total Tasks",
      value: data?.tasks.totalTasks || 0,
      icon: CheckCircle2,
      gradient:
        "from-pink-500 to-rose-500",
    },

    {
      title: "Completion Rate",
      value: `${data?.tasks.overallProgress || 0}%`,
      icon: TrendingUp,
      gradient:
        "from-purple-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* ========================= */}
      {/* PAGE HEADER */}
      {/* ========================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back 👋 Here's your platform overview.
        </p>

      </div>

      {/* ========================= */}
      {/* STATS CARDS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-200 p-5 hover:shadow-xl transition-all duration-300"
            >

              {/* Glow Background */}
              <div
                className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-2xl`}
              />

              {/* Top */}
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-gray-800">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`bg-gradient-to-br ${card.gradient} p-3 rounded-2xl text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* ========================= */}
      {/* SECOND SECTION */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        {/* TODAY ACTIVITY */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold">
              Today's Activity
            </h2>

            <span className="text-sm text-gray-400">
              Live
            </span>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Total Tasks
              </span>

              <span className="font-semibold">
                {data?.today?.total || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Completed
              </span>

              <span className="font-semibold text-green-600">
                {data?.today?.completed || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Pending
              </span>

              <span className="font-semibold text-red-500">
                {data?.today?.pending || 0}
              </span>
            </div>

          </div>

        </div>

        {/* RECENT USERS */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 xl:col-span-2">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-xl font-semibold">
              Recent Users
            </h2>

            <button className="text-sm text-blue-500 hover:underline">
              View All
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[500px]">

              <thead>

                <tr className="text-left border-b text-gray-500 text-sm">

                  <th className="pb-3">
                    User
                  </th>

                  <th className="pb-3">
                    Email
                  </th>

                  <th className="pb-3">
                    Joined
                  </th>

                </tr>

              </thead>

              <tbody>

                {data?.recentUsers?.map(
                  (user) => (
                    <tr
                      key={user._id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >

                      <td className="py-4 font-medium text-gray-700">
                        {user.name}
                      </td>

                      <td
                        className="py-4 text-gray-500 max-w-[180px] truncate"
                        title={user.email}
                      >
                        {user.email}
                      </td>

                      <td className="py-4 text-gray-500">
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}