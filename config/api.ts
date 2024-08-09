import axios from "axios";

function createApi(server: string = "main") {
  let baseURL: string | undefined;
  if (server === "main") {
    baseURL = process.env.NEXT_PUBLIC_API_URL;
  } else {
    baseURL = process.env.NEXT_PUBLIC_NOTIFICATION_API_URL;
  }

  const isServer = typeof window === "undefined";

  const api = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    if (isServer) {
      const { cookies } = await import("next/headers"),
        token = cookies().get("token")?.value;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      if (response && response.data) return response.data;
      return response;
    },
    (error) => {
      if (error.response) return error.response;
      return error;
    }
  );

  return api;
}

const api = createApi();
const notificationApi = createApi("notification");

export { api, notificationApi };
export default api;
