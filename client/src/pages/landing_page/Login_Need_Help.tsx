import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { createUser, type create_user_type } from "../../services/User.Service";
import Swal from "sweetalert2";
import { login, type login_type } from "../../services/Auth.Service";
import { Eye, EyeClosed } from "lucide-react";

type Props = {
  set_login: Dispatch<SetStateAction<boolean>>;
};

export const Login_Need_Help = ({ set_login }: Props) => {
  const [form_data, set_form_data] = useState<login_type | create_user_type>({
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();
  const [to_register, set_to_register] = useState(false);
  const [show_password, set_show_password] = useState(false);

  const hanle_login = async () => {
    const response = await login(form_data);

    if (response.success) {
      set_login(true);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Successfully.",
        confirmButtonColor: "#3085d6",
      });
      if (response.token) {
        sessionStorage.setItem("token", response.token);
      }
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: response.message || "Unable to login.",
        confirmButtonColor: "#d33",
      });
    }
  };
  const hanle_register = async () => {
    try {
      const response = await createUser(form_data);

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "User Created.",
          confirmButtonColor: "#3085d6",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: response.message || "Unable to create user.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handle_change = async (field: string, value: string | number) => {
    set_form_data((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="h-full w-full flex flex-col justify-center text-center gap-4">
      <h3>
        {to_register
          ? "Register and solve your problem."
          : "Let's solve your problem."}
      </h3>
      <TextField
        id="Username-basic"
        label="Username"
        variant="outlined"
        type="text"
        value={form_data.user_name}
        name="user_name"
        placeholder="Username"
        onChange={(e) => handle_change("user_name", e.target.value)}
      />
      <div className="relative flex flex-col ">
        <div
          className="absolute right-5 translate-y-[60%] cursor-pointer z-10"
          onClick={() => set_show_password((prev) => !prev)}
        >
          {show_password ? <Eye /> : <EyeClosed />}
        </div>
        <TextField
          id="Password-basic"
          label="Password"
          variant="outlined"
          type={show_password ? "text" : "password"}
          value={form_data.password}
          name="password"
          placeholder="Password"
          onChange={(e) => handle_change("password", e.target.value)}
        />
      </div>

      <Button
        text={
          <>
            <p>{to_register ? "Register User" : "Login"}</p>
          </>
        }
        on_click={to_register ? hanle_register : hanle_login}
      />
      <p
        className="hover:text-neutral-600 transition duration-300 ease-in-out"
        onClick={() => set_to_register((prev) => !prev)}
      >
        {to_register ? "Login Here." : "Register here."}
      </p>
    </div>
  );
};
