"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "@/validations/auth.validation";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [serverError, setServerError] = useState("");

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            setServerError("");

            const res = await axiosInstance.post("/auth/signup", {
                ...values,
                role: "admin",
            });

            // ✅ OTP Flow (correct)
            if (res.data.message?.toLowerCase().includes("otp")) {
                window.location.href = `/verify-otp?email=${values.email}`;
            }

        } catch (err: any) {
            setServerError(err.response?.data?.message || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[380px]">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-2">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Sign up to continue
                </p>

                {/* Server Error */}
                {serverError && (
                    <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm text-center">
                        {serverError}
                    </div>
                )}

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">

                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium">Full Name</label>
                                <Field
                                    name="name"
                                    placeholder="Enter your name"
                                    className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    className="border p-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                {isSubmitting ? "Creating..." : "Create Account"}
                            </button>

                        </Form>
                    )}
                </Formik>

                {/* Footer */}
                <p className="text-center text-sm mt-5 text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 font-medium">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}