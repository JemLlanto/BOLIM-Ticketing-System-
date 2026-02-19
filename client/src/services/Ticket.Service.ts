import axios, { AxiosError } from "axios";

export interface Ticket {
  id?: number;
  user_id: number;
  user: string;
  department: string;
  station: string;
  reason: string;
  other_reason: string;
  description?: string;
  status: string;
  remarks?: string;
  it_personel?: string;
  createdAt?: Date;
}

export interface adding_ticket_type {
  user: string;
  department: string;
  station: string;
  reason: string;
  other_reason: string;
  description?: string;
  status: string;
}

export interface update_ticket_status_type {
  id: number | undefined;
  remarks: string;
  new_status: string;
  it_personel: string;
}

export interface ticket_response {
  success: boolean;
  message?: string;
  data?: Ticket;
}

export interface fetching_parts_response {
  success: boolean;
  message?: string;
  data?: Ticket[];
}

// Define the error response structure from your API
interface ApiErrorResponse {
  message?: string;
}
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetch_tickets(): Promise<fetching_parts_response> {
  try {
    const response = await axios.get(`${API_URL}/tickets/fetch-tickets`);

    if (response.status === 200) {
      // console.log("Tickets Fetched: ", response.data);
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

// FOR FETCHING PENDING AND ONGOING TICKETS
export async function fetch_pending_ongoing_tickets(
  user_id?: number | null,
): Promise<fetching_parts_response> {
  try {
    const response = await axios.get(
      `${API_URL}/tickets/fetch-pending-ongoing-tickets`,
      {
        params: {
          user_id: user_id,
        },
      },
    );

    if (response.status === 200) {
      // console.log("Tickets Fetched: ", response.data);
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

// FOR FETCHING TICKETS BY DATE
export async function fetch_tickets_by_date(
  start_date: Date,
  end_date: Date,
  user_id?: number | null,
): Promise<fetching_parts_response> {
  try {
    const response = await axios.get(
      `${API_URL}/tickets/fetch-tickets-by-date`,
      {
        params: {
          start_date: start_date.toISOString(),
          end_date: end_date.toISOString(),
          user_id: user_id,
        },
      },
    );

    if (response.status === 200) {
      // console.log("Tickets Fetched: ", response.data);
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

export async function create_ticket(
  formData: adding_ticket_type,
): Promise<ticket_response> {
  try {
    const response = await axios.post(
      `${API_URL}/tickets/create-ticket`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log("creating user");
    if (response.status === 201) {
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

export async function update_status(
  formData: update_ticket_status_type,
): Promise<ticket_response> {
  try {
    const response = await axios.put(
      `${API_URL}/tickets/update-status`,
      formData,
    );
    // console.log("editing user details");
    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return {
      success: false,
      message: "Something went wrong while updating status.",
    };
  }
}

export async function editPart(
  id: number,
  formData: FormData | adding_ticket_type,
): Promise<ticket_response> {
  try {
    const response = await axios.put(
      `${API_URL}/parts/update-part/${id}`,
      formData,
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

export async function removePart(id: number): Promise<ticket_response> {
  try {
    const response = await axios.delete(`${API_URL}/parts/delete-part/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
