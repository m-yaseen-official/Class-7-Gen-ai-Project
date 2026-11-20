import axios from "axios";

export const http = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export function getApiError(error) {
  const response = error.response?.data;
  return response?.errors?.[0]?.message || response?.message || "Something went wrong. Please try again.";
}
