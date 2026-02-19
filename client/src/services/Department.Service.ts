import axios, { AxiosError } from "axios";

export interface department_type {
  id?: number;
  department_name: string;
}

export interface create_department_type {
  department_name: string;
}

export interface update_department_type {
  department_name: string;
  password: string;
  is_admin: number;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data?: department_type;
}

export interface fetching_departments_response {
  success: boolean;
  message?: string;
  data?: department_type[];
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
    // console.log("department_type data: ", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unexpected error occured, try again later.",
    };
  }
}

export async function fetch_departments(): Promise<fetching_departments_response> {
  try {
    const response = await axios.get(
      `${API_URL}/departments/fetch-departments`,
    );
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
      message: "Something went wrong while fetching departments.",
    };
  }
}

export async function create_deparmtent(
  formData: create_department_type,
): Promise<UserResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/departments/create-department`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("creating department");
    if (response.status === 201) {
      console.log("department_type Created");

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

export async function update_department(
  id: number,
  formData: create_department_type,
): Promise<UserResponse> {
  try {
    const response = await axios.put(
      `${API_URL}/departments/update-department/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("editing department details");
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
        "Error creating department:",
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
    console.error("Error updating department:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function remove_department(
  id: number | undefined,
): Promise<UserResponse> {
  try {
    const response = await axios.delete(
      `${API_URL}/departments/delete-department/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("deleting department details");
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
        "Error creating department:",
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
    console.error("Error updating department:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
