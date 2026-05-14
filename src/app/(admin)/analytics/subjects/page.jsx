"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

import SubjectOverviewCards from "./components/SubjectOverviewCards";
import SubjectPerformanceChart from "./components/SubjectPerformanceChart";
import WeakSubjectsTable from "./components/WeakSubjectsTable";
import SubjectProgressTable from "./components/SubjectProgressTable";

export default function page() {

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH SUBJECT ANALYTICS
  // =========================

  const fetchSubjects = async () => {

    try {

      const res =
        await axiosInstance.get(
          "/admin/subjects"
        );

      console.log(
        "Subjects Analytics:",
        res.data
      );

      setSubjects(
        res.data.subjects || []
      );

    } catch (error) {

      console.log(
        "Subject analytics error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
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
          Subject Analytics
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor subject performance,
          completion and weak areas.
        </p>

      </div>

      {/* ========================= */}
      {/* OVERVIEW */}
      {/* ========================= */}

      <SubjectOverviewCards
        subjects={subjects}
      />

      {/* ========================= */}
      {/* CHART */}
      {/* ========================= */}

      <div className="mt-8">

        <SubjectPerformanceChart
          subjects={subjects}
        />

      </div>

      {/* ========================= */}
      {/* TABLES */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <WeakSubjectsTable
          subjects={subjects}
        />

        <SubjectProgressTable
          subjects={subjects}
        />

      </div>

    </div>
  );
}