import axios from "axios";

function createApi(server: string = "main") {
  let baseURL: string | undefined;
  switch (server) {
    case "main":
      baseURL = process.env.NEXT_PUBLIC_API_URL;
      break;
    case "notification":
      baseURL = process.env.NEXT_PUBLIC_NOTIFICATION_API_URL;
      break;
    case "chat":
      baseURL = process.env.NEXT_PUBLIC_CHAT_API_URL;
      break;
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
      return Promise.reject(error);
    }
  );

  return api;
}

const api = createApi();
const notificationApi = createApi("notification");
const chatApi = createApi("chat");

export { api, chatApi, notificationApi };
export default api;
