import axios from "axios";
import { env } from "../../env";
export const api = axios.create({
  baseURL: env.VITE_PUBLIC_API_BASE_URL + "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token || ""}`;
  return config;
});

api.interceptors.request.use((req) => {
  return req;
});
api.interceptors.response.use(
  (res) => {
    // if (res) {
    //   if (res.status === 401) {
    //     toast.error("not authorized");
    //   }
    //   if (res.status === 403) {
    //     toast.error("access forbidden");
    //   }
    // }
    return res;
  },
  (error) => {
    // const { res } = error;
    // if (res.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.reload();
    // }

    throw error;
  }
);
