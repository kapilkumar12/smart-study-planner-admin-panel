"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axiosInstance from "@/lib/axiosInstance";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  Search,
  Trash2,
  Target,
  BookOpen,
  Clock3,
  CalendarDays,
} from "lucide-react";

const page = () => {

  const [goals, setGoals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  // ================= FETCH GOALS =================
  const fetchGoals = async () => {

    setLoading(true);

    try {

      const res =
        await axiosInstance.get(
          `/admin/goals?page=${page}&limit=10&search=${search}`
        );

      setGoals(res.data.goals);

      setTotalPages(
        res.data.totalPages
      );

    } catch (error) {

      toast.error(
        "Failed to load goals"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchGoals();

  }, [page, search]);

  // ================= DELETE GOAL =================
  const deleteGoal = async (id) => {

    const result = await Swal.fire({
      title: "Delete Goal?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {

      const res =
        await axiosInstance.delete(
          `/goals/delete/${id}`
        );

      toast.success(res.data.message);

      setGoals((prevGoals) =>
        prevGoals.filter(
          (goal) => goal._id !== id
        )
      );

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Delete failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* ================= HEADER ================= */}
      <div
        className="
          flex flex-col md:flex-row
          md:items-center md:justify-between
          gap-4 mb-6
        "
      >
        {/* Left */}
        <div>

          <h1
            className="
              text-2xl md:text-3xl
              font-bold text-gray-800
            "
          >
            Goals Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage user study goals
          </p>
        </div>

        {/* Search */}
        <div
          className="
            flex items-center gap-2
            bg-white px-4 py-3
            rounded-2xl shadow-sm
            w-full md:w-[320px]
          "
        >
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search goals..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full bg-transparent
              outline-none text-sm
            "
          />
        </div>
      </div>

      {/* ================= STATS CARD ================= */}
      <div
        className="
          bg-white rounded-3xl
          p-5 shadow-sm mb-6
          flex items-center gap-4
        "
      >
        <div
          className="
            w-14 h-14 rounded-2xl
            bg-black text-white
            flex items-center justify-center
          "
        >
          <Target size={28} />
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Total Goals
          </p>

          <h2 className="text-2xl font-bold">
            {goals.length}
          </h2>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div
        className="
          hidden lg:block
          bg-white rounded-3xl
          shadow-sm overflow-hidden
        "
      >
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left">

                <th className="px-6 py-4">
                  User
                </th>

                <th className="px-6 py-4">
                  Goal
                </th>

                <th className="px-6 py-4">
                  Exam
                </th>

                <th className="px-6 py-4">
                  Subjects
                </th>

                <th className="px-6 py-4">
                  Hours
                </th>

                <th className="px-6 py-4">
                  Duration
                </th>

                <th className="px-6 py-4">
                  Start Date
                </th>

                <th className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {!loading &&
                goals.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="
                        text-center py-10
                        text-gray-500
                      "
                    >
                      No goals found 😔
                    </td>
                  </tr>
                )}

              {goals.map(
                (goal, index) => (

                  <tr
                    key={index}
                    className="
                      border-t
                      hover:bg-gray-50
                      transition
                    "
                  >
                    {/* USER */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-11 h-11 rounded-full
                            bg-black text-white
                            flex items-center
                            justify-center
                            font-semibold
                          "
                        >
                          {goal.user.name.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {goal.user.name}
                          </h3>

                          <p
                            className="
                              text-sm text-gray-500
                            "
                          >
                            {goal.user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* GOAL */}
                    <td className="px-6 py-4">

                      <div>
                        <h3 className="font-semibold">
                          {goal.title}
                        </h3>

                        <p
                          className="
                            text-xs text-gray-500
                          "
                        >
                          ID:
                          {" "}
                          {goal._id.slice(-6)}
                        </p>
                      </div>
                    </td>

                    {/* EXAM */}
                    <td className="px-6 py-4">
                      <span
                        className="
                          px-3 py-1 rounded-full
                          bg-blue-100
                          text-blue-700
                          text-xs font-semibold
                        "
                      >
                        {goal.examType}
                      </span>
                    </td>

                    {/* SUBJECTS */}
                    <td className="px-6 py-4">

                      <div className="flex flex-wrap gap-2">

                        {goal.subjects.map(
                          (
                            subject,
                            subIndex
                          ) => (

                            <span
                              key={subIndex}
                              className="
                                bg-gray-100
                                text-gray-700
                                px-2 py-1
                                rounded-lg text-xs
                              "
                            >
                              {subject}
                            </span>
                          )
                        )}
                      </div>
                    </td>

                    {/* HOURS */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <Clock3 size={16} />

                        {goal.dailyStudyHours}h
                      </div>
                    </td>

                    {/* DURATION */}
                    <td className="px-6 py-4">
                      {goal.durationDays} Days
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={16}
                        />

                        {new Date(
                          goal.startDate
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          deleteGoal(
                            goal._id
                          )
                        }
                        className="
                          flex items-center gap-2
                          bg-red-500 text-white
                          px-4 py-2 rounded-xl
                          text-sm hover:bg-red-600
                          transition
                        "
                      >
                        <Trash2 size={16} />

                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="lg:hidden space-y-4">

        {!loading &&
          goals.length === 0 && (
            <div
              className="
                text-center text-gray-500
                py-10
              "
            >
              No goals found 😔
            </div>
          )}

        {goals.map((goal, index) => (

          <div
            key={index}
            className="
              bg-white rounded-3xl
              shadow-sm p-5
            "
          >
            {/* User */}
            <div
              className="
                flex items-center gap-3
                mb-4
              "
            >
              <div
                className="
                  w-12 h-12 rounded-full
                  bg-black text-white
                  flex items-center justify-center
                  font-semibold
                "
              >
                {goal.user.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold">
                  {goal.user.name}
                </h3>

                <p
                  className="
                    text-sm text-gray-500
                  "
                >
                  {goal.user.email}
                </p>
              </div>
            </div>

            {/* Goal Title */}
            <div className="mb-4">

              <h2 className="font-bold text-lg">
                {goal.title}
              </h2>

              <span
                className="
                  inline-block mt-2
                  bg-blue-100 text-blue-700
                  px-3 py-1 rounded-full
                  text-xs font-semibold
                "
              >
                {goal.examType}
              </span>
            </div>

            {/* Subjects */}
            <div className="mb-4">

              <div className="flex flex-wrap gap-2">

                {goal.subjects.map(
                  (subject, subIndex) => (

                    <span
                      key={subIndex}
                      className="
                        bg-gray-100
                        text-gray-700
                        px-2 py-1 rounded-lg
                        text-xs
                      "
                    >
                      {subject}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Details */}
            <div
              className="
                grid grid-cols-2
                gap-4 mb-5
              "
            >
              <div
                className="
                  bg-gray-50 rounded-2xl
                  p-3
                "
              >
                <div
                  className="
                    flex items-center gap-2
                    text-gray-500 text-sm
                    mb-1
                  "
                >
                  <Clock3 size={16} />

                  Hours
                </div>

                <h4 className="font-bold">
                  {goal.dailyStudyHours}h
                </h4>
              </div>

              <div
                className="
                  bg-gray-50 rounded-2xl
                  p-3
                "
              >
                <div
                  className="
                    flex items-center gap-2
                    text-gray-500 text-sm
                    mb-1
                  "
                >
                  <BookOpen size={16} />

                  Duration
                </div>

                <h4 className="font-bold">
                  {goal.durationDays}
                  {" "}
                  Days
                </h4>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() =>
                deleteGoal(goal._id)
              }
              className="
                w-full bg-red-500 text-white
                py-3 rounded-2xl
                hover:bg-red-600
                transition
                flex items-center
                justify-center gap-2
              "
            >
              <Trash2 size={18} />

              Delete Goal
            </button>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div
        className="
          flex items-center justify-center
          gap-3 mt-6
        "
      >
        <button
          onClick={() =>
            setPage(page - 1)
          }
          disabled={page === 1}
          className="
            px-4 py-2 rounded-xl
            bg-white shadow-sm
            disabled:opacity-50
          "
        >
          Prev
        </button>

        <div
          className="
            px-5 py-2 rounded-xl
            bg-black text-white
          "
        >
          {page} / {totalPages}
        </div>

        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(
                prev + 1,
                totalPages
              )
            )
          }
          disabled={
            page === totalPages
          }
          className="
            px-4 py-2 rounded-xl
            bg-white shadow-sm
            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default page;