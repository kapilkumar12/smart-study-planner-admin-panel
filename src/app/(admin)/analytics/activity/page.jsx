"use client";

import { useEffect, useState } from "react";

import axiosInstance from "@/lib/axiosInstance";

import ActivityOverviewCards from "./components/ActivityOverviewCards";

import WeeklyActivityChart from "./components/WeeklyActivityChart";

import CompletionTrendChart from "./components/CompletionTrendChart";

import RecentActivityTable from "./components/RecentActivityTable";

export default function ActivityAnalyticsPage() {

  const [activityData, setActivityData] =
    useState([]);

  const [usageData, setUsageData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH DATA
  // =========================

  const fetchActivityAnalytics =
    async () => {

      try {

        const [
          activityRes,
          usageRes,
        ] = await Promise.all([

          axiosInstance.get(
            "/admin/daily-activity"
          ),

          axiosInstance.get(
            "/analytics/usages"
          ),
        ]);

        setActivityData(
          activityRes.data.activity || []
        );

        setUsageData(
          usageRes.data.usages || []
        );

      } catch (error) {

        console.log(
          "Activity analytics error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchActivityAnalytics();
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
          Activity Analytics
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor activity, usage
          and productivity trends.
        </p>

      </div>

      {/* ========================= */}
      {/* OVERVIEW CARDS */}
      {/* ========================= */}

      <ActivityOverviewCards
        activity={activityData}
        usages={usageData}
      />

      {/* ========================= */}
      {/* CHARTS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <WeeklyActivityChart
          data={activityData}
        />

        <CompletionTrendChart
          data={usageData}
        />

      </div>

      {/* ========================= */}
      {/* RECENT ACTIVITY */}
      {/* ========================= */}

      <div className="mt-8">

        <RecentActivityTable
          usages={usageData}
        />

      </div>

    </div>
  );
}