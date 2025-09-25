import axios from "axios";
import { store } from "../store/store.ts";
import { deleteAuth } from "../store/slices/authSlice.ts";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10 * 60 * 10,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      store.dispatch(deleteAuth());
    }
    return Promise.reject(error);
  },
);
