"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

import ActiveUsersCard from "./components/ActiveUsersCard";
import TopUsersTable from "./components/TopUsersTable";
import UserGrowthChart from "./components/UserGrowthChart";

export default function UsersAnalyticsPage() {

  const [topUsers, setTopUsers] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {

    try {

      // =========================
      // API CALLS
      // =========================

      const [
        topUsersRes,
        activityRes,
        dashboardRes,
      ] = await Promise.all([

        axiosInstance.get(
          "/admin/top-users"
        ),

        axiosInstance.get(
          "/admin/daily-activity"
        ),

        axiosInstance.get(
          "/dashboard/admin"
        ),
      ]);

      // =========================
      // SET STATES
      // =========================

      setTopUsers(
        topUsersRes.data.users || []
      );

      setGrowthData(
        activityRes.data.activity || []
      );

      setActiveUsers(
        dashboardRes.data.users
          ?.activeUsers || 0
      );

    } catch (error) {

      console.log(
        "Users analytics error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-5">

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-white animate-pulse"
            />
          ))}

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* ========================= */}
      {/* PAGE HEADER */}
      {/* ========================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Users Analytics
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor user engagement,
          growth and top performers.
        </p>

      </div>

      {/* ========================= */}
      {/* ACTIVE USERS CARD */}
      {/* ========================= */}

      <div className="mb-6">

        <ActiveUsersCard
          activeUsers={activeUsers}
        />

      </div>

      {/* ========================= */}
      {/* CHART + TABLE */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* USER GROWTH CHART */}

        <div className="xl:col-span-2">

          <UserGrowthChart
            data={growthData}
          />

        </div>

        {/* TOP USERS TABLE */}

        <div>

          <TopUsersTable
            users={topUsers}
          />

        </div>

      </div>

    </div>
  );
}