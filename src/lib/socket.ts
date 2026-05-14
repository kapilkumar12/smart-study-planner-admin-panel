import { io } from "socket.io-client";

const socket = io("https://smart-study-planner-backend-wb14.onrender.com", {
  withCredentials: true,
});

export default socket;