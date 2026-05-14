"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { otpSchema } from "@/validations/auth.validation";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOtpClient() {
    const [timer, setTimer] = useState(30);
    const [serverError, setServerError] = useState("");
    const [resendLoading, setResendLoading] = useState(false);

    const [email, setEmail] = useState("");

    const params = useSearchParams();

    const router = useRouter();

    useEffect(() => {
        const e = params.get("email");
        if (e) setEmail(e);
    }, [params]);

    // ⏳ Timer countdown
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // 🔁 Resend OTP
    const handleResend = async () => {

        if (!email) return;

        try {
            setResendLoading(true);
            setServerError("");

            await axiosInstance.post("/auth/resend-otp", {
                email
            });

            setTimer(30);
        } catch (err: any) {
            setServerError(err.response?.data?.message || "Resend failed");
        } finally {
            setResendLoading(false);
        }
    };

    // ✅ Verify OTP
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        if (!email) return;
        try {
            setServerError("");

            const res = await axiosInstance.post("/auth/verify-otp", {
                email,
                otp: values.otp,
            });

            if (res.data.success) {
                router.push("/login");
            }

        } catch (err: any) {
            setServerError(err.response?.data?.message || "Invalid OTP");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-2">
                Verify OTP
            </h2>

            <p className="text-center text-sm text-gray-500 mb-4">
                Enter the 6-digit code sent to your email
            </p>

            {/* 🔴 Server Error */}
            {serverError && (
                <div className="bg-red-100 text-red-600 p-2 mb-3 rounded text-sm">
                    {serverError}
                </div>
            )}

            <Formik
                initialValues={{ otp: "" }}
                validationSchema={otpSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">

                        {/* OTP Field */}
                        <div>
                            <Field
                                name="otp"
                                placeholder="Enter OTP"
                                maxLength={6}
                                className="border p-2 w-full rounded text-center tracking-widest text-lg"
                            />
                            <ErrorMessage
                                name="otp"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-black text-white w-full p-2 rounded"
                        >
                            {isSubmitting ? "Verifying..." : "Verify OTP"}
                        </button>

                    </Form>
                )}
            </Formik>

            {/* ⏳ Timer / Resend */}
            <div className="text-center mt-4 text-sm">
                {timer > 0 ? (
                    <p className="text-gray-500">
                        Resend OTP in <span className="font-semibold">{timer}s</span>
                    </p>
                ) : (
                    <button
                        onClick={handleResend}
                        disabled={resendLoading}
                        className="text-blue-500 font-medium"
                    >
                        {resendLoading ? "Resending..." : "Resend OTP"}
                    </button>
                )}
            </div>
        </div>
    );
}