"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

import UsageOverviewCards from "./usages/components/UsageOverviewCards";
import DailyUsageChart from "./usages/components/DailyUsageChart";

import ActiveUsersCard from "./users/components/ActiveUsersCard";
import TopUsersTable from "./users/components/TopUsersTable";
import UserGrowthChart from "./users/components/UserGrowthChart";

import SubjectChart from "./subjects/components/SubjectPerformanceChart";

export default function AnalyticsOverviewPage() {
  const [loading, setLoading] = useState(true);

  const [usageData, setUsageData] = useState([]);
  const [usageSummary, setUsageSummary] = useState({});
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [subjectAnalytics, setSubjectAnalytics] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [usageRes, userRes, subjectRes] =
        await Promise.all([
          axiosInstance.get("/admin/usages"),
          axiosInstance.get("/analytics/admin"),
          axiosInstance.get("/analytics/subjects"),
        ]);

      // ✅ FIXED
      setUsageData(usageRes.data.usages || []);
      setUsageSummary(usageRes.data.summary || {});

      setUserAnalytics(userRes.data || {});
      setSubjectAnalytics(subjectRes.data || {});

    } catch (error) {
      console.log("Analytics error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading Analytics Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      <div>
        <h1 className="text-3xl font-bold">📊 Analytics Overview</h1>
      </div>

      {/* ✅ FIX: pass summary */}
      <UsageOverviewCards
        usages={usageData}
        summary={usageSummary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          <DailyUsageChart usages={usageData} />

          <UserGrowthChart data={userAnalytics?.growth || []} />

        </div>

        <div className="space-y-6">

          <ActiveUsersCard
            activeUsers={usageSummary.activeUsers || 0}
          />

          <SubjectChart
            subjects={subjectAnalytics?.subjects || []}
          />

        </div>
      </div>

      <TopUsersTable users={userAnalytics?.topUsers || []} />

    </div>
  );
}