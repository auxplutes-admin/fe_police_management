import axios from "axios";
import { API_BASE_URL, SESSION_COOKIE_NAME } from "@/constant";



export const API_CLIENT = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

API_CLIENT.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = localStorage.getItem(SESSION_COOKIE_NAME) ?? "";
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const officerLogin = async (payload: {
  email: string,
  password: string,
}) => {
  const response = await API_CLIENT.post(
    "police-officers/login",
    payload
  )
  return response.data;
}

export const createPoliceOfficer = async (payload: {
  studentId: string,
  email: string,
  password: string,
}) => {
  const response = await API_CLIENT.post(
    "police-officers/create-officer",
    payload
  )
  return response.data;
}

export const getOfficerProfile = async () => {
  const response = await API_CLIENT.get("police-officers/get-officer-profile")
  return response.data.data;
}


