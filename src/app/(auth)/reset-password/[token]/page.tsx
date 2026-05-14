"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

export default function page() {

  const params = useParams();
  const router = useRouter();

  const token = params.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {

      setLoading(true);

      const res = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        "Reset password failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your new password
        </p>

        {/* Success */}
        {message && (
          <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm text-center">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Password */}
          <div>
            <label className="text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="border p-3 w-full rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="border p-3 w-full rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
}