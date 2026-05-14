"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axiosInstance from "@/lib/axiosInstance";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  Bell,
  Search,
  Trash2,
  Mail,
  CalendarDays,
  CheckCircle2,
  Circle,
} from "lucide-react";

const page = () => {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  // ================= FETCH NOTIFICATIONS =================
  const fetchNotifications = async () => {

    setLoading(true);

    try {

      const res =
        await axiosInstance.get(
          `/admin/notifications?page=${page}&limit=10&search=${search}`
        );

      setNotifications(
        res.data.notifications
      );

      setTotalPages(
        res.data.totalPages
      );

    } catch (error) {

      toast.error(
        "Failed to load notifications"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchNotifications();

  }, [page, search]);

  // ================= DELETE =================
  const deleteNotification =
    async (notifId) => {

      const result =
        await Swal.fire({
          title:
            "Delete Notification?",
          text:
            "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor:
            "#dc2626",
          confirmButtonText:
            "Delete",
        });

      if (!result.isConfirmed)
        return;

      try {

        const res =
          await axiosInstance.delete(
            `/notifications/delete/${notifId}`
          );

        toast.success(
          res.data.message
        );

        setNotifications(
          (prevNotifications) =>
            prevNotifications.filter(
              (notification) =>
                notification._id !==
                notifId
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
            Notifications
          </h1>

          <p className="text-gray-500 mt-1">
            Manage user notifications
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
            placeholder="Search notifications..."
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
          <Bell size={28} />
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Total Notifications
          </p>

          <h2 className="text-2xl font-bold">
            {notifications.length}
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
                  Notification
                </th>

                <th className="px-6 py-4">
                  Type
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {!loading &&
                notifications.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="
                        text-center py-10
                        text-gray-500
                      "
                    >
                      No notifications found 😔
                    </td>
                  </tr>
                )}

              {notifications.map(
                (
                  notification,
                  index
                ) => (

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
                          {notification.user.name.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {
                              notification
                                .user
                                .name
                            }
                          </h3>

                          <p
                            className="
                              text-sm text-gray-500
                            "
                          >
                            {
                              notification
                                .user
                                .email
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* NOTIFICATION */}
                    <td className="px-6 py-4">

                      <div>
                        <h3 className="font-semibold">
                          {
                            notification.title
                          }
                        </h3>

                        <p
                          className="
                            text-sm text-gray-500
                            mt-1
                          "
                        >
                          {
                            notification.message
                          }
                        </p>

                        <p
                          className="
                            text-xs text-gray-400
                            mt-1
                          "
                        >
                          ID:
                          {" "}
                          {notification._id.slice(
                            -6
                          )}
                        </p>
                      </div>
                    </td>

                    {/* TYPE */}
                    <td className="px-6 py-4">

                      <span
                        className="
                          px-3 py-1 rounded-full
                          bg-blue-100
                          text-blue-700
                          text-xs font-semibold
                        "
                      >
                        {
                          notification.type
                        }
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">

                      {notification.isRead ? (
                        <div
                          className="
                            inline-flex items-center
                            gap-2
                            bg-green-100
                            text-green-700
                            px-3 py-1 rounded-full
                            text-xs font-semibold
                          "
                        >
                          <CheckCircle2
                            size={14}
                          />

                          Read
                        </div>
                      ) : (
                        <div
                          className="
                            inline-flex items-center
                            gap-2
                            bg-yellow-100
                            text-yellow-700
                            px-3 py-1 rounded-full
                            text-xs font-semibold
                          "
                        >
                          <Circle
                            size={12}
                          />

                          Unread
                        </div>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={16}
                        />

                        {new Date(
                          notification.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          deleteNotification(
                            notification._id
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
          notifications.length ===
            0 && (
            <div
              className="
                text-center text-gray-500
                py-10
              "
            >
              No notifications found 😔
            </div>
          )}

        {notifications.map(
          (notification, index) => (

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
                  {notification.user.name.charAt(
                    0
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {
                      notification.user
                        .name
                    }
                  </h3>

                  <p
                    className="
                      text-sm text-gray-500
                    "
                  >
                    {
                      notification.user
                        .email
                    }
                  </p>
                </div>
              </div>

              {/* TITLE */}
              <div className="mb-4">

                <div
                  className="
                    flex items-center gap-2
                    mb-2
                  "
                >
                  <Mail size={18} />

                  <h2 className="font-bold text-lg">
                    {
                      notification.title
                    }
                  </h2>
                </div>

                <p
                  className="
                    text-gray-600 text-sm
                  "
                >
                  {
                    notification.message
                  }
                </p>
              </div>

              {/* DETAILS */}
              <div
                className="
                  grid grid-cols-2
                  gap-4 mb-5
                "
              >
                {/* TYPE */}
                <div
                  className="
                    bg-gray-50 rounded-2xl
                    p-3
                  "
                >
                  <div
                    className="
                      text-gray-500 text-sm
                      mb-1
                    "
                  >
                    Type
                  </div>

                  <h4 className="font-bold">
                    {
                      notification.type
                    }
                  </h4>
                </div>

                {/* STATUS */}
                <div
                  className="
                    bg-gray-50 rounded-2xl
                    p-3
                  "
                >
                  <div
                    className="
                      text-gray-500 text-sm
                      mb-1
                    "
                  >
                    Status
                  </div>

                  <h4
                    className={`
                      font-bold text-sm

                      ${
                        notification.isRead
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    `}
                  >
                    {notification.isRead
                      ? "Read"
                      : "Unread"}
                  </h4>
                </div>
              </div>

              {/* DATE */}
              <div
                className="
                  flex items-center gap-2
                  text-sm text-gray-500
                  mb-5
                "
              >
                <CalendarDays
                  size={16}
                />

                {new Date(
                  notification.createdAt
                ).toLocaleDateString(
                  "en-GB"
                )}
              </div>

              {/* ACTION */}
              <button
                onClick={() =>
                  deleteNotification(
                    notification._id
                  )
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

                Delete Notification
              </button>
            </div>
          )
        )}
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