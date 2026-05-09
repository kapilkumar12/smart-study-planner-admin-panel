"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axiosInstance from "@/lib/axiosInstance";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  Trash2,
  Shield,
  ShieldCheck,
  Search,
  Users,
} from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const page = () => {

  const [users, setUsers] = useState<User[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {

    setLoading(true);

    try {

      const res =
        await axiosInstance.get(
          `/users?page=${page}&limit=10`
        );

      setUsers(res.data.users);

      setTotalPages(res.data.totalPages);

    } catch (error) {

      toast.error("Failed to load users");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchUsers();

  }, [page]);

  // ================= UPDATE ROLE =================
  const updateUserRole = async (
    userId: string
  ) => {

    const result = await Swal.fire({
      title: "Update User Role?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Update",
    });

    if (!result.isConfirmed) return;

    try {

      const res =
        await axiosInstance.put(
          `/users/toggle-role/${userId}`
        );

      const updatedUser =
        res.data.user;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                role: updatedUser.role,
              }
            : user
        )
      );

      toast.success("Role updated");

    } catch (error) {

      toast.error("Update failed");

    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (
    userId: string
  ) => {

    const result = await Swal.fire({
      title: "Delete User?",
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
          `/users/delete/${userId}`
        );

      toast.success(res.data.message);

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user._id !== userId
        )
      );

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );

    }
  };

  // ================= SEARCH FILTER =================
  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

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
            Users Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all registered users
          </p>
        </div>

        {/* Right */}
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
            placeholder="Search users..."
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
          <Users size={28} />
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Total Users
          </p>

          <h2 className="text-2xl font-bold">
            {users.length}
          </h2>
        </div>
      </div>

      {/* ================= USERS TABLE ================= */}
      <div
        className="
          bg-white rounded-3xl
          shadow-sm overflow-hidden
        "
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left">

                <th className="px-6 py-4 text-sm font-semibold">
                  User
                </th>

                <th className="px-6 py-4 text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 text-sm font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {!loading &&
                filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="
                        text-center py-10
                        text-gray-500
                      "
                    >
                      No users found 😔
                    </td>
                  </tr>
                )}

              {filteredUsers.map(
                (user, index) => (

                  <tr
                    key={user._id}
                    className="
                      border-t hover:bg-gray-50
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
                          {user.name.charAt(0)}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {user.name}
                          </h3>

                          <p
                            className="
                              text-xs text-gray-500
                            "
                          >
                            ID:
                            {" "}
                            {user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">

                      <span
                        className={`
                          px-3 py-1 rounded-full
                          text-xs font-semibold

                          ${
                            user.role === "admin"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        {/* Role Button */}
                        <button
                          onClick={() =>
                            updateUserRole(
                              user._id
                            )
                          }
                          className="
                            flex items-center gap-2
                            bg-black text-white
                            px-4 py-2 rounded-xl
                            text-sm hover:bg-gray-800
                            transition
                          "
                        >
                          {user.role ===
                          "admin" ? (
                            <Shield size={16} />
                          ) : (
                            <ShieldCheck size={16} />
                          )}

                          {user.role ===
                          "admin"
                            ? "Make User"
                            : "Make Admin"}
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() =>
                            deleteUser(
                              user._id
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
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden p-4 space-y-4">

          {!loading &&
            filteredUsers.length === 0 && (
              <div
                className="
                  text-center text-gray-500
                  py-10
                "
              >
                No users found 😔
              </div>
            )}

          {filteredUsers.map((user) => (

            <div
              key={user._id}
              className="
                border rounded-2xl
                p-4
              "
            >
              {/* Top */}
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
                  {user.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {user.name}
                  </h3>

                  <p
                    className="
                      text-sm text-gray-500
                    "
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="mb-4">

                <span
                  className={`
                    px-3 py-1 rounded-full
                    text-xs font-semibold

                    ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {user.role}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">

                <button
                  onClick={() =>
                    updateUserRole(user._id)
                  }
                  className="
                    flex-1 bg-black text-white
                    py-2 rounded-xl
                    text-sm
                  "
                >
                  {user.role === "admin"
                    ? "Make User"
                    : "Make Admin"}
                </button>

                <button
                  onClick={() =>
                    deleteUser(user._id)
                  }
                  className="
                    flex-1 bg-red-500 text-white
                    py-2 rounded-xl
                    text-sm
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
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
          disabled={page === totalPages}
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