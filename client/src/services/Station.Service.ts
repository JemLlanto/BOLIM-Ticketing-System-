import axios, { AxiosError } from "axios";

export interface station_type {
  id?: number;
  station_name: string;
}

export interface create_station_type {
  station_name: string;
}

export interface update_station_type {
  station_name: string;
  password: string;
  is_admin: number;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data?: station_type;
}

export interface fetching_stations_response {
  success: boolean;
  message?: string;
  data?: station_type[];
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
    // console.log("station_type data: ", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unexpected error occured, try again later.",
    };
  }
}

export async function fetch_stations(): Promise<fetching_stations_response> {
  try {
    const response = await axios.get(`${API_URL}/station/fetch-stations`);
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
      message: "Something went wrong while fetching stations.",
    };
  }
}

export async function create_deparmtent(
  formData: create_station_type,
): Promise<UserResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/station/create-station`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("creating station");
    if (response.status === 201) {
      console.log("station_type Created");

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

export async function update_station(
  id: number,
  formData: create_station_type,
): Promise<UserResponse> {
  try {
    const response = await axios.put(
      `${API_URL}/station/update-station/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("editing station details");
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
        "Error creating station:",
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
    console.error("Error updating station:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function remove_station(
  id: number | undefined,
): Promise<UserResponse> {
  try {
    const response = await axios.delete(
      `${API_URL}/station/delete-station/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("deleting station details");
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
        "Error creating station:",
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
    console.error("Error updating station:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
