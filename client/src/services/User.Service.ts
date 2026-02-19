import axios, { AxiosError } from "axios";

export interface user_type {
  id: number;
  user_name: string;
  is_admin: number;
}

export interface create_user_type {
  user_name: string;
  password: string;
}

export interface update_user_type {
  user_name: string;
  password: string;
  is_admin: number;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data?: user_type;
}

export interface fetching_users_response {
  success: boolean;
  message?: string;
  data?: user_type[];
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
    // console.log("user_type data: ", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unexpected error occured, try again later.",
    };
  }
}

export async function fetch_users(): Promise<fetching_users_response> {
  try {
    const response = await axios.get(`${API_URL}/users/fetch-users`);
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
      message: "Something went wrong while fetching users.",
    };
  }
}

export async function createUser(
  formData: create_user_type,
): Promise<UserResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/users/create-user`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("creating user");
    if (response.status === 201) {
      console.log("user_type Created");

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

export async function update_user(
  id: number,
  formData: create_user_type,
): Promise<UserResponse> {
  try {
    const response = await axios.put(
      `${API_URL}/users/update-user/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("editing user details");
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
        "Error creating user:",
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
    console.error("Error updating user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function remove_user(
  id: number | undefined,
): Promise<UserResponse> {
  try {
    const response = await axios.delete(`${API_URL}/users/delete-user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("deleting user details");
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
        "Error creating user:",
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
    console.error("Error updating user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
