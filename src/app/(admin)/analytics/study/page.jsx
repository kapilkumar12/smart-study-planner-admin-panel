"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

import StudyOverviewCards from "./components/StudyOverviewCards";
import CompletionChart from "./components/CompletionChart";
import ProductivityChart from "./components/ProductivityChart";
import PendingTasksCard from "./components/PendingTasksCard";

export default function page() {

  const [completionData, setCompletionData] =
    useState(null);

  const [dailyActivity, setDailyActivity] =
    useState([]);

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH ANALYTICS
  // =========================

  const fetchAnalytics = async () => {

    try {

      const [
        completionRes,
        activityRes,
        dashboardRes,
      ] = await Promise.all([

        axiosInstance.get(
          "/admin/completion"
        ),

        axiosInstance.get(
          "/admin/daily-activity"
        ),

        axiosInstance.get(
          "/dashboard/admin"
        ),
      ]);

      setCompletionData(
        completionRes.data
      );

      setDailyActivity(
        activityRes.data.activity || []
      );

      setDashboardData(
        dashboardRes.data
      );

    } catch (error) {

      console.log(
        "Study analytics error:",
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

        <div className="grid md:grid-cols-4 gap-5">

          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white h-32 rounded-2xl animate-pulse"
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
          Study Analytics
        </h1>

        <p className="text-gray-500 mt-1">
          Track study performance,
          productivity and completion.
        </p>

      </div>

      {/* ========================= */}
      {/* OVERVIEW CARDS */}
      {/* ========================= */}

      <StudyOverviewCards
        tasks={dashboardData?.tasks}
         plans={dashboardData?.plans}
      />

      {/* ========================= */}
      {/* CHARTS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        {/* COMPLETION CHART */}

        <div>

          <CompletionChart
            data={completionData}
          />

        </div>

        {/* PRODUCTIVITY CHART */}

        <div className="xl:col-span-2">

          <ProductivityChart
            data={dailyActivity}
          />

        </div>

      </div>

      {/* ========================= */}
      {/* PENDING TASKS */}
      {/* ========================= */}

      <div className="mt-8">

        <PendingTasksCard
          total={
            dashboardData?.today
              ?.pending || 0
          }
        />

      </div>

    </div>
  );
}