import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://small-creativity-backend.onrender.com", // Ensure this matches your backend URL
});

export default apiClient;
