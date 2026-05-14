import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-study-planner-backend-wb14.onrender.com/api",
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

export default axiosInstance;