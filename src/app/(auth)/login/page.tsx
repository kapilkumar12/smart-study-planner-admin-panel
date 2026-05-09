"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/validations/auth.validation";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setServerError("");

      const res = await axiosInstance.post("/auth/login", values);

      if (res.data.success) {
        localStorage.setItem("accessToken", res.data.accessToken);
        router.push("/dashboard"); // ✅ correct
      }

    } catch (err: any) {
      setServerError(err.response?.data?.message || "Login failed");
      console.log("err", err)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[380px]">

        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to your account
        </p>

        {serverError && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm text-center">
            {serverError}
          </div>
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border p-2 w-full rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">Password</label>

                <Field
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="border p-2 w-full rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

            </Form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 font-medium">
            Register
          </Link>
        </p>
        <p className="text-center text-sm mt-1"><Link
          href="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </Link></p>

      </div>
    </div>
  );
}