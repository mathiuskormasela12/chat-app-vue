// ========== HTTP Service
// import all modules
import axios from "axios";
import jwtDecode from "jwt-decode";

const { VITE_APP_API_URL } = import.meta.env;

const accessToken = window.localStorage.getItem("accessToken");
const refreshToken = window.localStorage.getItem("refreshToken");

const http = () => {
  const instances = axios.create({
    baseURL: VITE_APP_API_URL,
  });

  instances.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.authorization = accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instances.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;

      if (err.response) {
        // Access Token was expired
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const { data } = await instances.post("/users/access-token", {
              refreshToken,
            });
            localStorage.setItem("accessToken", data.results.accessToken);
            localStorage.setItem("refreshToken", data.results.refreshToken);

            return instances(originalConfig);
          } catch (_error) {
            const userData = jwtDecode(accessToken);
            try {
              await instances.put(
                `/users/exit/${userData.id}/${userData.roomId}`,
                {
                  refreshToken,
                }
              );
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");

              return instances(originalConfig);
            } catch (_err) {
              if (_err.response && _err.response.data) {
                return Promise.reject(_err.response.data);
              }
              return Promise.reject(_err);
            }
          }
        }
        if (err.response.status === 400 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }
  );
  return instances;
};

export default http;
