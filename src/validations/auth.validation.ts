import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().min(3).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
 password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[0-9]/, "At least one number")
    .matches(/[^a-zA-Z0-9]/, "At least one special character")
    .required("Password is required"),
});


export const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});