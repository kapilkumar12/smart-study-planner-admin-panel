import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://smart-study-planner-backend-wb14.onrender.com/api",
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {

    // localStorage browser me hi available hota hai
    if (typeof window !== "undefined") {

      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {

    // token expired / invalid
    if (error.response?.status === 401) {

      if (typeof window !== "undefined") {

        localStorage.removeItem("accessToken");

        // redirect login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;