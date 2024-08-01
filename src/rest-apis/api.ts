import axios, { AxiosInstance, AxiosResponse } from 'axios';



const baseURL = process.env.REACT_APP_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus(status) {
    return (
      (status >= 200 && status < 300) ||
      status === 401 ||
      status === 422 ||
      status === 404 ||
      status === 403 ||
      status === 400 ||
      (status >= 500 && status < 600)
    );
  },
});

export interface ApiResponse<T> {
  status: boolean;
  data?: T;
  unauthenticated?: boolean;
  message?: string;
  errorMessage?: string;
}

async function get<T>(url: string, options?: { baseURL?: string; params?: Record<string, unknown> }): Promise<ApiResponse<T>> {
  if (options?.baseURL) {
    instance.defaults.baseURL = options.baseURL;
  }

  try {
    const response: AxiosResponse<T> = await instance.get(url, { params: options?.params });
    
    if (response.status === 200) {
      return { status: true, data: response.data };
    }
    if (response.status === 204) {
      return { status: true, data: undefined };
    }
    if (response.status === 401) {
      return { status: false, unauthenticated: true };
    }
    if (response.status === 403) {
      return { status: false };
    }
    if (response.status === 404 || response.status === 400) {
      return { status: false, message: response.statusText };
    }
    return { status: false, message: "Something went wrong!" };
  } catch (error: unknown) {
    return {
      status: false,
      message: error instanceof Error ? error?.message : "Something went wrong!",
    };
  }
}

export { baseURL, get };
