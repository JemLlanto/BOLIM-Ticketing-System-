import axios, { AxiosError } from "axios";

export interface reason_type {
  id?: number;
  reason_name: string;
}

export interface create_reason_type {
  reason_name: string;
}

export interface update_reason_type {
  reason_name: string;
  password: string;
  is_admin: number;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data?: reason_type;
}

export interface fetching_reasons_response {
  success: boolean;
  message?: string;
  data?: reason_type[];
}

// Define the error response structure from your API
interface ApiErrorResponse {
  message?: string;
}
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetchUserData(token: string): Promise<UserResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/auth/token-verification`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = response.data;
    // console.log("reason_type data: ", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unexpected error occured, try again later.",
    };
  }
}

export async function fetch_reasons(): Promise<fetching_reasons_response> {
  try {
    const response = await axios.get(`${API_URL}/reason/fetch-reasons`);
    // console.log("Users Fetched: ", response.data);

    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while fetching reasons.",
    };
  }
}

export async function create_deparmtent(
  formData: create_reason_type,
): Promise<UserResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/reason/create-reason`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("creating reason");
    if (response.status === 201) {
      console.log("reason_type Created");

      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while fetching parts.",
    };
  }
}

export async function update_reason(
  id: number,
  formData: create_reason_type,
): Promise<UserResponse> {
  try {
    const response = await axios.put(
      `${API_URL}/reason/update-reason/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("editing reason details");
    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    // Type guard for Axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error(
        "Error creating reason:",
        axiosError.response?.data || axiosError.message,
      );

      // Check if it's a connection error
      if (
        axiosError.code === "ERR_NETWORK" ||
        axiosError.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        return {
          success: false,
          message:
            "Cannot connect to server. Please check if the server is running.",
        };
      }

      return {
        success: false,
        message: axiosError.response?.data?.message || axiosError.message,
      };
    }

    // Handle non-Axios errors
    console.error("Error updating reason:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function remove_reason(
  id: number | undefined,
): Promise<UserResponse> {
  try {
    const response = await axios.delete(
      `${API_URL}/reason/delete-reason/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("deleting reason details");
    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    // Type guard for Axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error(
        "Error creating reason:",
        axiosError.response?.data || axiosError.message,
      );

      // Check if it's a connection error
      if (
        axiosError.code === "ERR_NETWORK" ||
        axiosError.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        return {
          success: false,
          message:
            "Cannot connect to server. Please check if the server is running.",
        };
      }

      return {
        success: false,
        message: axiosError.response?.data?.message || axiosError.message,
      };
    }

    // Handle non-Axios errors
    console.error("Error updating reason:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
