"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {

      const res = await axiosInstance.post(
        "/auth/forgot-password",
        { email, frontendUrl: window.location.origin }
      );

      setMessage(res.data.message);

    } catch (error: any) {

      setMessage(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-[400px]">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter email"
            className="border p-3 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="bg-black text-white w-full p-3 rounded"
          >
            Send Reset Link
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}