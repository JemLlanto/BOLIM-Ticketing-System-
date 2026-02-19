import axios from "axios";

export interface login_type {
  user_name: string;
  password: string;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data?: login_type;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function login(formData: login_type): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    if (data.success && data.token) {
      // console.log("Login success! Token: ", data.token);
      sessionStorage.setItem("token", data.token);
      // sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while fetching parts.",
    };
  }
}

export function logout(): void {
  sessionStorage.removeItem("token");
}
