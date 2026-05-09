"use client";

import { useEffect, useState } from "react";

import axiosInstance from "@/lib/axiosInstance";

import UsageOverviewCards from "./components/UsageOverviewCards";

import FeatureUsageChart from "./components/FeatureUsageChart";

import EventDistributionChart from "./components/EventDistributionChart";

import DailyUsageChart from "./components/DailyUsageChart";

import UsageLogsTable from "./components/UsageLogsTable";

export default function UsageAnalyticsPage() {

  const [usages, setUsages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH USAGE DATA
  // =========================

  const fetchUsageAnalytics =
    async () => {

      try {

        const res =
          await axiosInstance.get(
            "/admin/usages"
          );

        setUsages(
          res.data.usages || []
        );

        console.log("USAGES API RESPONSE:", res.data.usages);

      } catch (error) {

        console.log(
          "Usage analytics error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsageAnalytics();
  }, []);

  if (loading) {

    return (
      <div className="p-6">

        <div className="grid md:grid-cols-4 gap-5">

          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white rounded-2xl animate-pulse"
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
          Usage Analytics
        </h1>

        <p className="text-gray-500 mt-1">
          Analyze platform usage,
          AI activity and feature engagement.
        </p>

      </div>

      {/* ========================= */}
      {/* OVERVIEW */}
      {/* ========================= */}

      <UsageOverviewCards
        usages={usages}
      />

      {/* ========================= */}
      {/* CHARTS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <FeatureUsageChart
          usages={usages}
        />

        <EventDistributionChart
          usages={usages}
        />

      </div>

      {/* ========================= */}
      {/* DAILY TREND */}
      {/* ========================= */}

      <div className="mt-8">

        <DailyUsageChart
          usages={usages}
        />

      </div>

      {/* ========================= */}
      {/* LOGS */}
      {/* ========================= */}

      <div className="mt-8">

        <UsageLogsTable
          usages={usages}
        />

      </div>

    </div>
  );
}