import axios from "axios";
import { API_BASE_URL } from "@/config/env";
import { AuthToken, authProvider } from "@/providers/authProvider";

interface ApiResponse {
  status_code: number;
  status: string;
  error?: string;
  success: boolean;
  error_code?: string;
  error_message?: string;
}

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const MAX_REFRESH_TOKEN_RETRY_COUNT = 3; // Define a maximum retry count

let isRefreshing = false;
let globalRefreshTokenPromise: Promise<string | void>;
let isRedirecting = false;

// Request Interceptor for Authentication Token
axiosInstance.interceptors.request.use(
  async (config) => {
    const authTokenJson = localStorage.getItem("_authToken");
    if (authTokenJson) {
      const authToken: AuthToken = JSON.parse(authTokenJson);
      config.headers["Authorization"] = `Bearer ${authToken.access_token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Function to refresh token
async function refreshToken(): Promise<string> {
  const authTokenJson = localStorage.getItem("_authToken");
  if (!authTokenJson) throw new Error("No current authToken");

  const authToken: AuthToken = JSON.parse(authTokenJson);

  try {
    const access_token = await authProvider.refreshToken(
      authToken.refresh_token
    );
    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh token");
  }
}

// Response Interceptor for Handling Errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;
    const errorData: ApiResponse = error.response?.data?.response_status;

    // Initialize retry count if not already set
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // TODO: adjust if necessary if theres is change in BE for status 403, 401, or 500 with token expired from snowflake
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      originalRequest._retryCount < MAX_REFRESH_TOKEN_RETRY_COUNT
    ) {
      if (isRefreshing && globalRefreshTokenPromise) {
        return globalRefreshTokenPromise.then((accessToken) => {
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          return axiosInstance(originalRequest);
        });
      } else {
        originalRequest._retryCount += 1;
        isRefreshing = true;

        globalRefreshTokenPromise = refreshToken()
          .then((accessToken) => {
            axiosInstance.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
          })
          .catch(() => {
            if (
              !isRedirecting &&
              originalRequest._retryCount >= MAX_REFRESH_TOKEN_RETRY_COUNT
            ) {
              isRedirecting = true;
              authProvider.logout(); // Make sure this method handles redirection or cleanup
              window.location.href = "/login";
            }

            return error;
          })
          .finally(() => {
            isRefreshing = false;
          });

        return globalRefreshTokenPromise.then((accessToken) => {
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          return axiosInstance(originalRequest);
        });
      }
    }

    return errorData || error;
  }
);

export { axiosInstance };
