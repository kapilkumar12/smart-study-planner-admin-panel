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
  ClipboardList,
  CalendarDays,
  CheckCircle2,
  Target,
} from "lucide-react";

const page = () => {

  const [plans, setPlans] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  // ================= FETCH PLANS =================
  const fetchPlans = async () => {

    setLoading(true);

    try {

      const res =
        await axiosInstance.get(
          `/admin/plans?page=${page}&limit=10&search=${search}`
        );

      setPlans(res.data.plans);

      setTotalPages(
        res.data.totalPages
      );

    } catch (error) {

      toast.error(
        "Failed to load plans"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchPlans();

  }, [page, search]);

  // ================= DELETE PLAN =================
  const deletePlan = async (
    planId
  ) => {

    const result = await Swal.fire({
      title: "Delete Plan?",
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
          `/study/plan/delete/${planId}`
        );

      toast.success(res.data.message);

      setPlans((prevPlans) =>
        prevPlans.filter(
          (plan) =>
            plan._id !== planId
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
            Study Plans
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all generated study plans
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
            placeholder="Search plans..."
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
          <ClipboardList size={28} />
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Total Plans
          </p>

          <h2 className="text-2xl font-bold">
            {plans.length}
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
                  Tasks
                </th>

                <th className="px-6 py-4">
                  Created
                </th>

                <th className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {!loading &&
                plans.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="
                        text-center py-10
                        text-gray-500
                      "
                    >
                      No plans found 😔
                    </td>
                  </tr>
                )}

              {plans.map(
                (plan, index) => (

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
                            flex items-center justify-center
                            font-semibold
                          "
                        >
                          {plan.user.name.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {plan.user.name}
                          </h3>

                          <p
                            className="
                              text-sm text-gray-500
                            "
                          >
                            {plan.user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* GOAL */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <Target size={16} />

                        <div>
                          <h3 className="font-semibold">
                            {
                              plan.goal
                                .title
                            }
                          </h3>

                          <p
                            className="
                              text-xs text-gray-500
                            "
                          >
                            ID:
                            {" "}
                            {plan._id.slice(
                              -6
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* TASK COUNT */}
                    <td className="px-6 py-4">

                      <div
                        className="
                          inline-flex items-center
                          gap-2 bg-green-100
                          text-green-700
                          px-3 py-1 rounded-full
                          text-sm font-semibold
                        "
                      >
                        <CheckCircle2
                          size={16}
                        />

                        {
                          plan.totalTasks
                        }
                        {" "}
                        Tasks
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={16}
                        />

                        {new Date(
                          plan.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          deletePlan(
                            plan._id
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
          plans.length === 0 && (
            <div
              className="
                text-center text-gray-500
                py-10
              "
            >
              No plans found 😔
            </div>
          )}

        {plans.map((plan, index) => (

          <div
            key={index}
            className="
              bg-white rounded-3xl
              shadow-sm p-5
            "
          >
            {/* USER */}
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
                {plan.user.name.charAt(
                  0
                )}
              </div>

              <div>
                <h3 className="font-semibold">
                  {plan.user.name}
                </h3>

                <p
                  className="
                    text-sm text-gray-500
                  "
                >
                  {plan.user.email}
                </p>
              </div>
            </div>

            {/* GOAL */}
            <div className="mb-4">

              <div
                className="
                  flex items-center gap-2
                  mb-2
                "
              >
                <Target size={18} />

                <h2 className="font-bold text-lg">
                  {
                    plan.goal.title
                  }
                </h2>
              </div>

              <p
                className="
                  text-xs text-gray-500
                "
              >
                ID:
                {" "}
                {plan._id.slice(-6)}
              </p>
            </div>

            {/* DETAILS */}
            <div
              className="
                grid grid-cols-2
                gap-4 mb-5
              "
            >
              {/* TASKS */}
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
                  <CheckCircle2
                    size={16}
                  />

                  Tasks
                </div>

                <h4 className="font-bold">
                  {
                    plan.totalTasks
                  }
                </h4>
              </div>

              {/* DATE */}
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
                  <CalendarDays
                    size={16}
                  />

                  Created
                </div>

                <h4 className="font-bold text-sm">
                  {new Date(
                    plan.createdAt
                  ).toLocaleDateString(
                    "en-GB"
                  )}
                </h4>
              </div>
            </div>

            {/* ACTION */}
            <button
              onClick={() =>
                deletePlan(plan._id)
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

              Delete Plan
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

export default Page;